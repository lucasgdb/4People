'use client'

import { Button, buttonVariants } from '@4people/ui'
import { useStore } from '@tanstack/react-form'
import { ArrowLeftRight, Download, ExternalLink } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { renderSVG } from 'uqr'
import { z } from 'zod'
import { useToolForm } from '@/components/form/use-tool-form'
import { contrastRatio, parseColor } from '@/lib/algorithms/color'
import { FormCard, ResultCard, ToolLayout } from './_shared/tool-layout'

/** How much of the code can be damaged or covered and still be read. */
const LEVELS = [
	{ value: 'L', label: 'Baixa', hint: '7%' },
	{ value: 'M', label: 'Média', hint: '15%' },
	{ value: 'Q', label: 'Alta', hint: '25%' },
	{ value: 'H', label: 'Máxima', hint: '30%' },
] as const

/** Below this, phone cameras start failing to read the code. */
const MIN_QR_CONTRAST = 4

/** The full generator (PIX, Wi-Fi, WhatsApp, logo, frame…), a separate project by the same author. */
const FULL_GENERATOR_URL = 'https://gerador-de-qrcode.lucasbittencourt.dev/'

const hexColor = z.string().regex(/^#[0-9a-f]{6}$/i, 'Use uma cor HEX, como #172033.')
const DEFAULT_DARK = '#172033'
const DEFAULT_LIGHT = '#ffffff'

const schema = z.object({
	content: z
		.string()
		.min(1, 'Digite o texto ou o link do QR Code.')
		.max(2000, 'Use até 2.000 caracteres.'),
	level: z.enum(['L', 'M', 'Q', 'H']),
	dark: hexColor,
	light: hexColor,
})

function download(href: string, name: string) {
	Object.assign(document.createElement('a'), { href, download: name }).click()
}

/** Renders the SVG to a canvas at a print-friendly size and downloads it as PNG. */
function downloadPng(svg: string, size = 1024) {
	const image = new Image()
	image.onload = () => {
		const canvas = Object.assign(document.createElement('canvas'), { width: size, height: size })
		canvas.getContext('2d')?.drawImage(image, 0, 0, size, size)
		download(canvas.toDataURL('image/png'), 'qrcode.png')
	}
	image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

/**
 * QR Code for a link or text, made in the browser and downloadable as SVG or PNG. Kept simple on
 * purpose; the card below points to the full generator for PIX, Wi-Fi, logo and frames.
 * Needs content, so nothing is made on arrival. Once there is a code, it follows the form: the
 * content (after a short pause in typing) and the error correction encode it again, and the colours
 * only repaint the code on screen.
 */
export default function QrCodeGenerator() {
	const [code, setCode] = useState<{
		render: typeof renderSVG
		content: string
		level: 'L' | 'M' | 'Q' | 'H'
	} | null>(null)
	const form = useToolForm({
		schema,
		defaultValues: { content: '', level: 'M', dark: DEFAULT_DARK, light: DEFAULT_LIGHT },
		onSubmit: async ({ content, level }) => {
			// The encoder loads with the first code, not with the page.
			const { renderSVG: render } = await import('uqr')
			setCode({ render, content, level })
		},
	})
	const dark = useStore(form.store, (state) => state.values.dark)
	const light = useStore(form.store, (state) => state.values.light)
	const darkRgb = hexColor.safeParse(dark).success ? parseColor(dark) : null
	const lightRgb = hexColor.safeParse(light).success ? parseColor(light) : null
	const contrast = darkRgb && lightRgb ? contrastRatio(darkRgb, lightRgb) : 21
	const lowContrast = contrast < MIN_QR_CONTRAST
	const invertedColors =
		darkRgb && lightRgb
			? darkRgb.r + darkRgb.g + darkRgb.b > lightRgb.r + lightRgb.g + lightRgb.b
			: false
	const blackColor = hexColor.safeParse(dark).success ? dark : DEFAULT_DARK
	const whiteColor = hexColor.safeParse(light).success ? light : DEFAULT_LIGHT
	const svg = useMemo(
		() =>
			code
				? code.render(code.content, { ecc: code.level, border: 2, blackColor, whiteColor })
				: null,
		[code, blackColor, whiteColor],
	)
	const src = svg ? `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}` : ''

	// Before the first code there is nothing to update: the form waits for "Gerar QR Code". After it,
	// only valid values re-encode (an emptied text shows its error and keeps the last code).
	const update = () => {
		if (code && schema.safeParse(form.state.values).success) form.handleSubmit()
	}

	return (
		<div className="flex flex-col gap-4">
			<ToolLayout>
				<FormCard
					onSubmit={() => form.handleSubmit()}
					actions={
						<form.AppForm>
							<form.SubmitButton>Gerar QR Code</form.SubmitButton>
						</form.AppForm>
					}
				>
					<form.AppField name="content" listeners={{ onChange: update, onChangeDebounceMs: 300 }}>
						{(f) => (
							<f.TextareaField
								label="Texto ou link"
								rows={4}
								placeholder="Ex: https://4people.dev"
							/>
						)}
					</form.AppField>
					<form.AppField name="level" listeners={{ onChange: update }}>
						{(f) => (
							<f.RadioField
								label="Correção de erros"
								description="Quanto do código pode estar sujo, rasgado ou coberto (por um logo, por exemplo) e ainda ser lido. Mais correção deixa o desenho mais denso."
								options={LEVELS}
							/>
						)}
					</form.AppField>
					<fieldset className="flex flex-col gap-3">
						<legend className="text-fg mb-2 text-sm font-medium">Cores</legend>
						<div className="grid items-end gap-3 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
							<form.AppField name="dark">
								{(f) => <f.ColorField label="Módulos (quadradinhos)" />}
							</form.AppField>
							<Button
								variant="ghost"
								size="icon"
								aria-label="Trocar as cores de lugar"
								className="mb-0.5 justify-self-center"
								onClick={() => {
									form.setFieldValue('dark', light)
									form.setFieldValue('light', dark)
								}}
							>
								<ArrowLeftRight />
							</Button>
							<form.AppField name="light">{(f) => <f.ColorField label="Fundo" />}</form.AppField>
						</div>
						{lowContrast ? (
							<p
								role="status"
								className="rounded-control bg-warning-soft text-warning-ink px-4 py-3 text-sm"
							>
								Pouco contraste ({contrast.toFixed(1).replace('.', ',')}:1): câmeras podem não ler o
								código. Use módulos bem mais escuros que o fundo.
							</p>
						) : invertedColors ? (
							<p
								role="status"
								className="rounded-control bg-warning-soft text-warning-ink px-4 py-3 text-sm"
							>
								Módulos mais claros que o fundo: alguns leitores não leem QR Codes invertidos.
							</p>
						) : null}
					</fieldset>
				</FormCard>
				<ResultCard
					title="Baixe e use"
					empty={!svg}
					emptyText="Digite o texto ou o link e clique em “Gerar QR Code”."
				>
					{svg ? (
						<div className="flex flex-col items-center gap-4">
							{/* biome-ignore lint/performance/noImgElement: a client-made data: URL; next/image has nothing to optimize */}
							<img
								src={src}
								alt="QR Code gerado"
								width={256}
								height={256}
								className="rounded-control border-border size-64 border"
							/>
							<div className="flex flex-wrap justify-center gap-2">
								<Button variant="secondary" size="sm" onClick={() => download(src, 'qrcode.svg')}>
									<Download /> Baixar SVG
								</Button>
								<Button variant="secondary" size="sm" onClick={() => downloadPng(svg)}>
									<Download /> Baixar PNG
								</Button>
							</div>
						</div>
					) : null}
				</ResultCard>
			</ToolLayout>
			<aside
				aria-labelledby="qr-completo"
				className="rounded-panel border-border bg-surface flex flex-col gap-4 border p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
			>
				<div className="flex flex-col gap-1">
					<h2 id="qr-completo" className="text-fg text-base font-semibold">
						Precisa de mais opções?
					</h2>
					<p className="text-fg-muted max-w-2xl text-[0.9375rem]">
						O Gerador de QR Code completo cria códigos de PIX, Wi-Fi, WhatsApp, contato e evento,
						com moldura e logo, e baixa em PNG, SVG ou JPEG.
					</p>
				</div>
				<a
					href={FULL_GENERATOR_URL}
					target="_blank"
					rel="noopener"
					className={buttonVariants({ variant: 'secondary', className: 'shrink-0' })}
				>
					Abrir o gerador completo
					<ExternalLink aria-hidden="true" />
					<span className="sr-only">(abre em nova aba)</span>
				</a>
			</aside>
		</div>
	)
}
