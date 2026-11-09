'use client'

import { Alert, Button, buttonVariants, cn, DataList } from '@4people/ui'
import { CircleX, Download, ShieldCheck, Upload } from 'lucide-react'
import { type ChangeEvent, useDeferredValue, useMemo, useState } from 'react'
import { useAppForm } from '@/components/form/form'
import {
	byteLength,
	ensureSvgNamespace,
	minifySvg,
	type SvgInfo,
	svgDataUrl,
	svgInfo,
	withSvgSize,
} from '@/lib/algorithms/web'
import { formatNumber } from '@/lib/format'
import { FormCard, OutputBlock, ResultCard, ToolLayout } from './_shared/tool-layout'

const SCALES = [1, 2, 4] as const
/** Browsers refuse canvases much larger than this on a side. */
const MAX_CANVAS_SIDE = 16_384
const MAX_FILE_BYTES = 10 * 1024 * 1024

type Rendered =
	| {
			ok: true
			info: SvgInfo
			/** What the user copies: the input, trimmed or minified. */
			output: string
			outputBytes: number
			addedNamespace: boolean
			/** `output` with xmlns ensured, so it renders as a standalone image. */
			renderable: string
			src: string
	  }
	| { ok: false; error: string }

function renderSvg(input: string, minify: boolean): Rendered {
	try {
		const info = svgInfo(input)
		const output = minify ? minifySvg(input) : input.trim()
		const renderable = ensureSvgNamespace(output)
		return {
			ok: true,
			info,
			output,
			outputBytes: byteLength(output),
			addedNamespace: renderable !== output,
			renderable,
			src: svgDataUrl(renderable),
		}
	} catch (error) {
		return { ok: false, error: (error as Error).message }
	}
}

function downloadBlob(blob: Blob, name: string) {
	const url = URL.createObjectURL(blob)
	Object.assign(document.createElement('a'), { href: url, download: name }).click()
	URL.revokeObjectURL(url)
}

/** Draws the SVG (as an image, so scripts never run) on a canvas and saves a PNG. */
function downloadPng(
	svg: string,
	width: number,
	height: number,
	onError: (message: string) => void,
) {
	const pixelWidth = Math.round(width)
	const pixelHeight = Math.round(height)
	if (pixelWidth > MAX_CANVAS_SIDE || pixelHeight > MAX_CANVAS_SIDE) {
		onError(
			`O PNG ficaria com ${pixelWidth}×${pixelHeight} px, maior que o navegador permite. Use uma escala menor.`,
		)
		return
	}
	const image = new Image()
	image.onload = () => {
		const canvas = Object.assign(document.createElement('canvas'), {
			width: pixelWidth,
			height: pixelHeight,
		})
		canvas.getContext('2d')?.drawImage(image, 0, 0, pixelWidth, pixelHeight)
		canvas.toBlob((blob) => {
			if (blob) downloadBlob(blob, 'imagem.png')
			else onError('Não foi possível gerar o PNG neste navegador.')
		}, 'image/png')
	}
	image.onerror = () => onError('O navegador não conseguiu desenhar este SVG para gerar o PNG.')
	image.src = svgDataUrl(withSvgSize(svg, pixelWidth, pixelHeight))
}

/** Safe SVG preview (rendered as <img>, never injected), size info, minify and SVG/PNG download. */
export default function SvgViewer() {
	const form = useAppForm({ defaultValues: { svg: '', minify: false } })
	const [brokenSrc, setBrokenSrc] = useState<string | null>(null)
	const [pngError, setPngError] = useState<string | null>(null)
	const [fileError, setFileError] = useState<string | null>(null)

	async function openFile(event: ChangeEvent<HTMLInputElement>) {
		const file = event.target.files?.[0]
		event.target.value = ''
		if (!file) return
		if (file.size > MAX_FILE_BYTES) {
			setFileError('Arquivo grande demais (mais de 10 MB).')
			return
		}
		setFileError(null)
		form.setFieldValue('svg', await file.text())
	}

	return (
		<ToolLayout>
			<FormCard
				onSubmit={() => undefined}
				actions={<p className="text-fg-muted text-[0.8125rem]">Atualiza enquanto você digita.</p>}
			>
				<div className="flex flex-wrap items-center gap-4">
					<label
						className={cn(
							buttonVariants({ variant: 'secondary' }),
							'has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-4',
						)}
					>
						<Upload aria-hidden="true" /> Abrir arquivo .svg
						<input
							type="file"
							accept=".svg,image/svg+xml"
							className="sr-only"
							onChange={openFile}
						/>
					</label>
					<span className="text-fg-muted text-[0.8125rem]">ou cole o código abaixo</span>
				</div>
				{fileError ? (
					<Alert tone="danger" role="alert">
						<CircleX />
						{fileError}
					</Alert>
				) : null}
				<form.AppField name="svg">
					{(field) => (
						<field.TextareaField
							label="Código SVG"
							rows={12}
							placeholder='Ex.: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">…</svg>'
						/>
					)}
				</form.AppField>
				<form.AppField name="minify">
					{(field) => (
						<field.CheckboxField
							label="Minificar"
							description="Remove comentários, metadados, dados de editor (Inkscape) e espaços entre tags."
						/>
					)}
				</form.AppField>
			</FormCard>
			<form.Subscribe selector={(state) => state.values}>
				{(values) => (
					<Preview
						input={values.svg}
						minify={values.minify}
						brokenSrc={brokenSrc}
						onBroken={setBrokenSrc}
						pngError={pngError}
						onPng={(svg, width, height) => {
							setPngError(null)
							downloadPng(svg, width, height, setPngError)
						}}
						onClear={() => {
							form.reset()
							setPngError(null)
						}}
					/>
				)}
			</form.Subscribe>
		</ToolLayout>
	)
}

function Preview({
	input,
	minify,
	brokenSrc,
	onBroken,
	pngError,
	onPng,
	onClear,
}: {
	input: string
	minify: boolean
	brokenSrc: string | null
	onBroken: (src: string) => void
	pngError: string | null
	onPng: (svg: string, width: number, height: number) => void
	onClear: () => void
}) {
	const deferredInput = useDeferredValue(input)
	const result = useMemo(
		() => (deferredInput.trim() ? renderSvg(deferredInput, minify) : null),
		[deferredInput, minify],
	)

	return (
		<ResultCard
			title="Prévia"
			empty={!input.trim()}
			emptyText="Cole um SVG ou abra um arquivo para ver a prévia."
			copyText={result?.ok ? result.output : undefined}
			onClear={onClear}
		>
			{result?.ok === true && (
				<>
					{brokenSrc === result.src ? (
						<Alert tone="danger">
							<CircleX />O navegador não conseguiu desenhar este SVG. Verifique se o XML está bem
							formado (todas as tags fechadas, atributos entre aspas).
						</Alert>
					) : (
						<div className="rounded-control bg-surface-muted border-border flex min-h-48 items-center justify-center overflow-auto border p-4">
							{/* biome-ignore lint/performance/noImgElement: a client-made data: URL; <img> is what keeps SVG scripts from running */}
							<img
								src={result.src}
								alt="Prévia do SVG"
								className="max-h-[24rem] max-w-full object-contain"
								onError={() => onBroken(result.src)}
							/>
						</div>
					)}
					<DataList
						items={[
							{ label: 'width', value: result.info.width ?? '—' },
							{ label: 'height', value: result.info.height ?? '—' },
							{ label: 'viewBox', value: result.info.viewBox ?? '—' },
							{
								label: 'Tamanho desenhado',
								value: `${formatNumber(result.info.pixelWidth, 1)} × ${formatNumber(result.info.pixelHeight, 1)} px`,
							},
							{
								label: 'Arquivo',
								value: `${formatNumber(result.outputBytes)} bytes`,
								hint:
									result.outputBytes !== result.info.bytes
										? `Original: ${formatNumber(result.info.bytes)} bytes`
										: undefined,
							},
						]}
					/>
					{result.info.hasScript ? (
						<Alert tone="warning">
							<ShieldCheck />
							Este SVG tem &lt;script&gt; ou atributos on…= (como onload). Na prévia ele é mostrado
							como imagem, então nenhum script roda; mas cuidado ao colá-lo direto em uma página.
						</Alert>
					) : null}
					{result.addedNamespace ? (
						<Alert tone="info">
							<ShieldCheck />
							Faltava xmlns="http://www.w3.org/2000/svg" na tag &lt;svg&gt;: foi adicionado na
							prévia e nos downloads, senão o arquivo não abre sozinho.
						</Alert>
					) : null}
					<div className="flex flex-wrap gap-2">
						<Button
							variant="secondary"
							size="sm"
							onClick={() =>
								downloadBlob(new Blob([result.renderable], { type: 'image/svg+xml' }), 'imagem.svg')
							}
						>
							<Download /> Baixar SVG
						</Button>
						{SCALES.map((scale) => {
							const width = result.info.pixelWidth * scale
							const height = result.info.pixelHeight * scale
							return (
								<Button
									key={scale}
									variant="secondary"
									size="sm"
									onClick={() => onPng(result.renderable, width, height)}
									aria-label={`Baixar PNG em ${scale}× (${Math.round(width)} × ${Math.round(height)} px)`}
								>
									<Download /> PNG {scale}×
								</Button>
							)
						})}
					</div>
					{pngError ? (
						<Alert tone="danger">
							<CircleX />
							{pngError}
						</Alert>
					) : null}
					{minify ? (
						<OutputBlock className="max-h-60">
							<span translate="no">{result.output}</span>
						</OutputBlock>
					) : null}
				</>
			)}
			{result?.ok === false && (
				<Alert tone="danger">
					<CircleX />
					{result.error}
				</Alert>
			)}
		</ResultCard>
	)
}
