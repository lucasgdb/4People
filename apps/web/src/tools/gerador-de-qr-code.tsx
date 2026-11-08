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

type ErrorCorrection = z.infer<typeof schema>['level']
type EncodedCode = { render: typeof renderSVG; content: string; level: ErrorCorrection }

const isHexColor = (value: string) => hexColor.safeParse(value).success

const svgToDataUrl = (svg: string) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`

function download(href: string, fileName: string) {
	Object.assign(document.createElement('a'), { href, download: fileName }).click()
}

/** Renders the SVG to a canvas at a print-friendly size and downloads it as PNG. */
function downloadPng(svg: string, size = 1024) {
	const image = new Image()
	image.onload = () => {
		const canvas = Object.assign(document.createElement('canvas'), { width: size, height: size })
		canvas.getContext('2d')?.drawImage(image, 0, 0, size, size)
		download(canvas.toDataURL('image/png'), 'qrcode.png')
	}
	image.src = svgToDataUrl(svg)
}

/** Warns when phone cameras may fail to read the code: low contrast or inverted colors. */
function colorWarning(dark: string, light: string): string | null {
	if (!isHexColor(dark) || !isHexColor(light)) return null
	const darkRgb = parseColor(dark)
	const lightRgb = parseColor(light)
	const contrast = contrastRatio(darkRgb, lightRgb)
	if (contrast < MIN_QR_CONTRAST) {
		const formattedContrast = contrast.toFixed(1).replace('.', ',')
		return `Pouco contraste (${formattedContrast}:1): câmeras podem não ler o código. Use módulos bem mais escuros que o fundo.`
	}
	const darkSum = darkRgb.r + darkRgb.g + darkRgb.b
	const lightSum = lightRgb.r + lightRgb.g + lightRgb.b
	if (darkSum > lightSum) {
		return 'Módulos mais claros que o fundo: alguns leitores não leem QR Codes invertidos.'
	}
	return null
}

/**
 * QR Code for a link or text, made in the browser and downloadable as SVG or PNG. Nothing is made
 * until the first "Gerar QR Code"; after that, content and error correction re-encode it as you
 * type, and the colors only repaint it.
 */
export default function QrCodeGenerator() {
	const [encoded, setEncoded] = useState<EncodedCode | null>(null)
	const form = useToolForm({
		schema,
		defaultValues: { content: '', level: 'M', dark: DEFAULT_DARK, light: DEFAULT_LIGHT },
		onSubmit: async ({ content, level }) => {
			// The encoder loads with the first code, not with the page.
			const { renderSVG: render } = await import('uqr')
			setEncoded({ render, content, level })
		},
	})
	const dark = useStore(form.store, (state) => state.values.dark)
	const light = useStore(form.store, (state) => state.values.light)
	const warning = colorWarning(dark, light)
	const moduleColor = isHexColor(dark) ? dark : DEFAULT_DARK
	const backgroundColor = isHexColor(light) ? light : DEFAULT_LIGHT
	const svg = useMemo(() => {
		if (!encoded) return null
		return encoded.render(encoded.content, {
			ecc: encoded.level,
			border: 2,
			blackColor: moduleColor,
			whiteColor: backgroundColor,
		})
	}, [encoded, moduleColor, backgroundColor])
	const svgUrl = svg ? svgToDataUrl(svg) : ''

	// Invalid values (e.g. emptied text) show their error and keep the last code.
	const regenerate = () => {
		if (encoded && schema.safeParse(form.state.values).success) form.handleSubmit()
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
					<form.AppField
						name="content"
						listeners={{ onChange: regenerate, onChangeDebounceMs: 300 }}
					>
						{(field) => (
							<field.TextareaField
								label="Texto ou link"
								rows={4}
								placeholder="Ex: https://4people.dev"
							/>
						)}
					</form.AppField>
					<form.AppField name="level" listeners={{ onChange: regenerate }}>
						{(field) => (
							<field.RadioField
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
								{(field) => <field.ColorField label="Módulos (quadradinhos)" />}
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
							<form.AppField name="light">
								{(field) => <field.ColorField label="Fundo" />}
							</form.AppField>
						</div>
						{warning && (
							<p
								role="status"
								className="rounded-control bg-warning-soft text-warning-ink px-4 py-3 text-sm"
							>
								{warning}
							</p>
						)}
					</fieldset>
				</FormCard>
				<ResultCard
					title="Baixe e use"
					empty={!svg}
					emptyText="Digite o texto ou o link e clique em “Gerar QR Code”."
				>
					{svg && (
						<div className="flex flex-col items-center gap-4">
							{/* biome-ignore lint/performance/noImgElement: a client-made data: URL; next/image has nothing to optimize */}
							<img
								src={svgUrl}
								alt="QR Code gerado"
								width={256}
								height={256}
								className="rounded-control border-border size-64 border"
							/>
							<div className="flex flex-wrap justify-center gap-2">
								<Button
									variant="secondary"
									size="sm"
									onClick={() => download(svgUrl, 'qrcode.svg')}
								>
									<Download /> Baixar SVG
								</Button>
								<Button variant="secondary" size="sm" onClick={() => downloadPng(svg)}>
									<Download /> Baixar PNG
								</Button>
							</div>
						</div>
					)}
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
