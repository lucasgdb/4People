'use client'

import { Alert, CopyButton, cn, DataList } from '@4people/ui'
import { CircleAlert, CircleX, ImageUp } from 'lucide-react'
import { type DragEvent, useState } from 'react'
import { useAppForm } from '@/components/form/form'
import { dataUriSnippets, formatBytes } from '@/lib/algorithms/convert'
import { formatNumber } from '@/lib/format'
import { FormCard, ResultCard, ToolLayout } from './_shared/tool-layout'

type Loaded = {
	name: string
	mime: string
	size: number
	uri: string
	dimensions?: { width: number; height: number }
}

/** Long data URIs are shown cut short (the copy buttons always copy everything). */
const PREVIEW_CHARS = 600
const BIG_FILE = 100 * 1024

function readFile(file: File): Promise<Loaded> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.onerror = () => reject(new Error('Não foi possível ler o arquivo. Tente de novo.'))
		reader.onload = () => {
			const uri = String(reader.result)
			const loaded: Loaded = {
				name: file.name,
				mime: file.type || 'application/octet-stream',
				size: file.size,
				uri,
			}
			if (!file.type.startsWith('image/')) return resolve(loaded)
			const image = new Image()
			image.onload = () =>
				resolve({
					...loaded,
					dimensions: image.naturalWidth
						? { width: image.naturalWidth, height: image.naturalHeight }
						: undefined,
				})
			image.onerror = () => resolve(loaded)
			image.src = uri
		}
		reader.readAsDataURL(file)
	})
}

/** Any file (usually an image) → Base64 data URI, with preview and CSS/HTML/Markdown snippets. */
export default function ImagemParaDataUri() {
	const [loaded, setLoaded] = useState<Loaded | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [dragging, setDragging] = useState(false)
	const form = useAppForm({ defaultValues: { alt: '' } })

	async function open(file: File | undefined) {
		if (!file) return
		setError(null)
		try {
			setLoaded(await readFile(file))
		} catch (err) {
			setError((err as Error).message)
		}
	}

	function onDrop(event: DragEvent<HTMLLabelElement>) {
		event.preventDefault()
		setDragging(false)
		void open(event.dataTransfer.files[0])
	}

	return (
		<ToolLayout>
			<FormCard
				onSubmit={() => undefined}
				actions={
					<p className="text-fg-muted text-[0.8125rem]">
						O arquivo é lido no seu navegador e não é enviado.
					</p>
				}
			>
				<label
					onDragOver={(event) => {
						event.preventDefault()
						setDragging(true)
					}}
					onDragLeave={() => setDragging(false)}
					onDrop={onDrop}
					className={cn(
						'rounded-control border-border-strong bg-surface-muted text-fg-muted focus-within:ring-ring flex min-h-48 cursor-pointer flex-col items-center justify-center gap-3 border border-dashed px-6 py-8 text-center focus-within:ring-4',
						dragging && 'border-accent bg-accent-soft text-accent-soft-fg',
					)}
				>
					<ImageUp aria-hidden="true" className="text-accent size-8" />
					<span className="text-fg font-semibold">Escolha ou arraste um arquivo</span>
					<span className="text-[0.8125rem]">
						PNG, JPG, SVG, WebP, GIF, ícones ou qualquer outro tipo.
					</span>
					<input
						type="file"
						className="sr-only"
						onChange={(event) => {
							void open(event.target.files?.[0])
							event.target.value = ''
						}}
					/>
				</label>
				<form.AppField name="alt">
					{(f) => (
						<f.TextField
							label="Texto alternativo (opcional)"
							description="Usado no <img> e no Markdown."
							placeholder="Ex.: Logotipo da empresa"
						/>
					)}
				</form.AppField>
			</FormCard>
			<form.Subscribe selector={(state) => state.values.alt}>
				{(alt) => (
					<ResultCard
						title="Data URI"
						empty={!loaded && !error}
						emptyText="Escolha um arquivo e o data URI aparece aqui."
						copyText={loaded?.uri}
						downloadName={loaded ? `${loaded.name}.txt` : undefined}
						onClear={() => {
							setLoaded(null)
							setError(null)
						}}
					>
						{error ? (
							<Alert tone="danger">
								<CircleX />
								{error}
							</Alert>
						) : loaded ? (
							<LoadedFile loaded={loaded} alt={alt} />
						) : null}
					</ResultCard>
				)}
			</form.Subscribe>
		</ToolLayout>
	)
}

function LoadedFile({ loaded, alt }: { loaded: Loaded; alt: string }) {
	const snippets = dataUriSnippets(loaded.uri, loaded.dimensions, alt)
	const growth = loaded.size ? (loaded.uri.length / loaded.size - 1) * 100 : 0
	const rows = [
		{ label: 'Data URI', value: snippets.uri },
		{ label: 'CSS (background-image)', value: snippets.css },
		{ label: 'HTML <img>', value: snippets.html },
		{ label: 'Markdown', value: snippets.markdown },
	]
	return (
		<>
			{loaded.mime.startsWith('image/') ? (
				<div className="rounded-control bg-surface-muted flex max-h-72 items-center justify-center overflow-hidden p-4">
					{/* biome-ignore lint/performance/noImgElement: a local data URI preview, not an optimizable asset */}
					<img
						src={loaded.uri}
						alt={alt || `Prévia de ${loaded.name}`}
						width={loaded.dimensions?.width}
						height={loaded.dimensions?.height}
						className="h-auto max-h-64 w-auto max-w-full object-contain"
					/>
				</div>
			) : null}
			<DataList
				columns={2}
				items={[
					{
						label: 'Arquivo',
						value: <span className="text-base break-all">{loaded.name}</span>,
						hint: loaded.mime,
					},
					{
						label: 'Dimensões',
						value: loaded.dimensions
							? `${formatNumber(loaded.dimensions.width)} × ${formatNumber(loaded.dimensions.height)} px`
							: '—',
					},
					{ label: 'Tamanho original', value: formatBytes(loaded.size) },
					{
						label: 'Tamanho do data URI',
						value: formatBytes(loaded.uri.length),
						hint: `${formatNumber(growth, 0)}% maior (Base64)`,
					},
				]}
			/>
			{loaded.size > BIG_FILE ? (
				<Alert tone="warning">
					<CircleAlert />
					Arquivos acima de 100 KB deixam o HTML ou CSS pesado e não entram no cache separado.
					Prefira um arquivo comum para imagens grandes.
				</Alert>
			) : null}
			<ul className="flex flex-col gap-2">
				{rows.map((row) => (
					<li
						key={row.label}
						className="rounded-control bg-surface-muted flex items-center gap-3 py-2.5 pr-2.5 pl-5"
					>
						<div className="flex min-w-0 flex-1 flex-col gap-0.5">
							<span className="text-fg-muted text-[0.8125rem]">{row.label}</span>
							<span className="text-fg line-clamp-3 font-mono text-sm break-all" translate="no">
								{row.value.length > PREVIEW_CHARS
									? `${row.value.slice(0, PREVIEW_CHARS)}…`
									: row.value}
							</span>
						</div>
						<CopyButton
							value={row.value}
							variant="primary"
							label="Copiar"
							aria-label={`Copiar ${row.label}`}
						/>
					</li>
				))}
			</ul>
		</>
	)
}
