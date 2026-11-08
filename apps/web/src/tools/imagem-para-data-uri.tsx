'use client'

import { Alert, CopyButton, cn, DataList } from '@4people/ui'
import { CircleAlert, CircleX, ImageUp } from 'lucide-react'
import { type DragEvent, useState } from 'react'
import { useAppForm } from '@/components/form/form'
import { dataUriSnippets, formatBytes } from '@/lib/algorithms/convert'
import { formatNumber } from '@/lib/format'
import { FormCard, ResultCard, ToolLayout } from './_shared/tool-layout'

type Dimensions = { width: number; height: number }

type LoadedFile = {
	name: string
	mime: string
	size: number
	uri: string
	dimensions?: Dimensions
}

/** Long data URIs are shown cut short; the copy buttons always copy everything. */
const PREVIEW_LENGTH = 600
const LARGE_FILE_BYTES = 100 * 1024

const truncate = (text: string, maxLength: number) =>
	text.length > maxLength ? `${text.slice(0, maxLength)}…` : text

/** Natural size of an image URI, or undefined when it can't be decoded or has no intrinsic size. */
function measureImage(uri: string): Promise<Dimensions | undefined> {
	return new Promise((resolve) => {
		const image = new Image()
		image.onload = () =>
			resolve(
				image.naturalWidth ? { width: image.naturalWidth, height: image.naturalHeight } : undefined,
			)
		image.onerror = () => resolve(undefined)
		image.src = uri
	})
}

function readAsDataUri(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.onerror = () => reject(new Error('Não foi possível ler o arquivo. Tente de novo.'))
		reader.onload = () => resolve(String(reader.result))
		reader.readAsDataURL(file)
	})
}

async function loadFile(file: File): Promise<LoadedFile> {
	const uri = await readAsDataUri(file)
	const loaded: LoadedFile = {
		name: file.name,
		mime: file.type || 'application/octet-stream',
		size: file.size,
		uri,
	}
	if (!file.type.startsWith('image/')) return loaded
	const dimensions = await measureImage(uri)
	return dimensions ? { ...loaded, dimensions } : loaded
}

function formatDimensions(dimensions: Dimensions | undefined) {
	if (!dimensions) return '—'
	return `${formatNumber(dimensions.width)} × ${formatNumber(dimensions.height)} px`
}

/** Any file (usually an image) → Base64 data URI, with preview and CSS/HTML/Markdown snippets. */
export default function ImagemParaDataUri() {
	const [loaded, setLoaded] = useState<LoadedFile | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [dragging, setDragging] = useState(false)
	const form = useAppForm({ defaultValues: { alt: '' } })

	async function openFile(file: File | undefined) {
		if (!file) return
		setError(null)
		try {
			setLoaded(await loadFile(file))
		} catch (readError) {
			setError((readError as Error).message)
		}
	}

	function onDrop(event: DragEvent<HTMLLabelElement>) {
		event.preventDefault()
		setDragging(false)
		void openFile(event.dataTransfer.files[0])
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
							void openFile(event.target.files?.[0])
							event.target.value = ''
						}}
					/>
				</label>
				<form.AppField name="alt">
					{(field) => (
						<field.TextField
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
						{error && (
							<Alert tone="danger">
								<CircleX />
								{error}
							</Alert>
						)}
						{!error && loaded && <LoadedFileDetails loaded={loaded} alt={alt} />}
					</ResultCard>
				)}
			</form.Subscribe>
		</ToolLayout>
	)
}

function LoadedFileDetails({ loaded, alt }: { loaded: LoadedFile; alt: string }) {
	const snippets = dataUriSnippets(loaded.uri, loaded.dimensions, alt)
	const growthPercent = loaded.size ? (loaded.uri.length / loaded.size - 1) * 100 : 0
	const snippetRows = [
		{ label: 'Data URI', value: snippets.uri },
		{ label: 'CSS (background-image)', value: snippets.css },
		{ label: 'HTML <img>', value: snippets.html },
		{ label: 'Markdown', value: snippets.markdown },
	]
	return (
		<>
			{loaded.mime.startsWith('image/') && (
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
			)}
			<DataList
				columns={2}
				items={[
					{
						label: 'Arquivo',
						value: <span className="text-base break-all">{loaded.name}</span>,
						hint: loaded.mime,
					},
					{ label: 'Dimensões', value: formatDimensions(loaded.dimensions) },
					{ label: 'Tamanho original', value: formatBytes(loaded.size) },
					{
						label: 'Tamanho do data URI',
						value: formatBytes(loaded.uri.length),
						hint: `${formatNumber(growthPercent, 0)}% maior (Base64)`,
					},
				]}
			/>
			{loaded.size > LARGE_FILE_BYTES && (
				<Alert tone="warning">
					<CircleAlert />
					Arquivos acima de 100 KB deixam o HTML ou CSS pesado e não entram no cache separado.
					Prefira um arquivo comum para imagens grandes.
				</Alert>
			)}
			<ul className="flex flex-col gap-2">
				{snippetRows.map((row) => (
					<li
						key={row.label}
						className="rounded-control bg-surface-muted flex items-center gap-3 py-2.5 pr-2.5 pl-5"
					>
						<div className="flex min-w-0 flex-1 flex-col gap-0.5">
							<span className="text-fg-muted text-[0.8125rem]">{row.label}</span>
							<span className="text-fg line-clamp-3 font-mono text-sm break-all" translate="no">
								{truncate(row.value, PREVIEW_LENGTH)}
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
