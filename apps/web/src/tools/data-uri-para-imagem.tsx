'use client'

import { Alert, Button, DataList } from '@4people/ui'
import { CircleX, Download } from 'lucide-react'
import { useDeferredValue, useEffect, useMemo, useState } from 'react'
import { useAppForm } from '@/components/form/form'
import { type DataUri, extensionForMime, formatBytes, parseDataUri } from '@/lib/algorithms/convert'
import { formatNumber } from '@/lib/format'
import { FormCard, ResultCard, ToolLayout } from './_shared/tool-layout'

const EXAMPLE =
	'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNhNjIwMjMiIHN0cm9rZS13aWR0aD0iMiI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iOSIvPjwvc3ZnPg=='

type Dimensions = { width: number; height: number }
type Preview = { url: string; size?: Dimensions; broken?: boolean }
type ParsedInput = { ok: true; data: DataUri } | { ok: false; error: string }

function downloadBytes(bytes: Uint8Array, mime: string, fileName: string) {
	const url = URL.createObjectURL(new Blob([bytes as BlobPart], { type: mime }))
	const anchor = Object.assign(document.createElement('a'), { href: url, download: fileName })
	anchor.click()
	URL.revokeObjectURL(url)
}

function parseInput(input: string): ParsedInput | null {
	if (!input.trim()) return null
	try {
		return { ok: true, data: parseDataUri(input) }
	} catch (error) {
		return { ok: false, error: (error as Error).message }
	}
}

const isImage = (dataUri: DataUri) => dataUri.mime.startsWith('image/')

/**
 * Loads an image data URI through a Blob URL (lighter than putting a huge data URI in <img>) and
 * reports its natural size, or that the browser could not decode it.
 */
function useImagePreview(dataUri: DataUri | null): Preview | null {
	const [preview, setPreview] = useState<Preview | null>(null)

	useEffect(() => {
		if (!dataUri || !isImage(dataUri)) {
			setPreview(null)
			return
		}
		const url = URL.createObjectURL(new Blob([dataUri.bytes as BlobPart], { type: dataUri.mime }))
		let isCurrent = true
		const image = new Image()
		image.onload = () => {
			if (!isCurrent) return
			const size = image.naturalWidth
				? { width: image.naturalWidth, height: image.naturalHeight }
				: undefined
			setPreview({ url, size })
		}
		image.onerror = () => {
			if (isCurrent) setPreview({ url, broken: true })
		}
		image.src = url
		return () => {
			isCurrent = false
			URL.revokeObjectURL(url)
		}
	}, [dataUri])

	return preview
}

/** Data URI → validated file: MIME, size, dimensions, preview and download with the right extension. */
export default function DataUriParaImagem() {
	const form = useAppForm({ defaultValues: { input: '' } })
	return (
		<ToolLayout>
			<FormCard
				onSubmit={() => undefined}
				actions={
					<>
						<Button
							variant="secondary"
							size="sm"
							onClick={() => form.setFieldValue('input', EXAMPLE)}
						>
							Usar exemplo
						</Button>
						<p className="text-fg-muted text-[0.8125rem]">Atualiza enquanto você cola.</p>
					</>
				}
			>
				<form.AppField name="input">
					{(field) => (
						<field.TextareaField
							label="Data URI"
							description='Também aceita url("data:…") copiado do CSS.'
							rows={10}
							placeholder="Ex.: data:image/png;base64,iVBORw0KGgo…"
						/>
					)}
				</form.AppField>
			</FormCard>
			<form.Subscribe selector={(state) => state.values.input}>
				{(input) => <DecodedFile input={input} onClear={() => form.reset({ input: '' })} />}
			</form.Subscribe>
		</ToolLayout>
	)
}

function DecodedFile({ input, onClear }: { input: string; onClear: () => void }) {
	const deferredInput = useDeferredValue(input)
	const parsed = useMemo(() => parseInput(deferredInput), [deferredInput])
	const dataUri = parsed?.ok ? parsed.data : null
	const preview = useImagePreview(dataUri)

	return (
		<ResultCard
			title="Arquivo"
			empty={!input.trim()}
			emptyText="Cole um data URI e a imagem aparece aqui."
			onClear={onClear}
		>
			{dataUri && <FileDetails dataUri={dataUri} preview={preview} />}
			{parsed && !parsed.ok && (
				<Alert tone="danger">
					<CircleX />
					{parsed.error}
				</Alert>
			)}
		</ResultCard>
	)
}

function formatDimensions(size: Dimensions | undefined) {
	if (!size) return '—'
	return `${formatNumber(size.width)} × ${formatNumber(size.height)} px`
}

function FileDetails({ dataUri, preview }: { dataUri: DataUri; preview: Preview | null }) {
	const extension = extensionForMime(dataUri.mime)
	const showsImage = isImage(dataUri)
	return (
		<>
			{showsImage && preview && !preview.broken && (
				<div className="rounded-control bg-surface-muted flex max-h-80 items-center justify-center overflow-hidden p-4">
					{/* biome-ignore lint/performance/noImgElement: a local blob preview, not an optimizable asset */}
					<img
						src={preview.url}
						alt="Prévia da imagem do data URI"
						width={preview.size?.width}
						height={preview.size?.height}
						className="h-auto max-h-72 w-auto max-w-full object-contain"
					/>
				</div>
			)}
			{showsImage && preview?.broken && (
				<Alert tone="danger">
					<CircleX />O navegador não conseguiu abrir esta imagem: os dados podem estar corrompidos
					ou o tipo MIME pode estar errado.
				</Alert>
			)}
			<DataList
				columns={2}
				items={[
					{
						label: 'Tipo MIME',
						value: (
							<span className="font-mono text-base" translate="no">
								{dataUri.mime}
							</span>
						),
						hint: dataUri.params.join('; ') || undefined,
					},
					{ label: 'Tamanho', value: formatBytes(dataUri.bytes.length) },
					{ label: 'Dimensões', value: formatDimensions(preview?.size) },
					{ label: 'Codificação', value: dataUri.base64 ? 'Base64' : 'Texto (URL)' },
				]}
			/>
			<div>
				<Button
					variant="primary"
					size="sm"
					onClick={() => downloadBytes(dataUri.bytes, dataUri.mime, `arquivo.${extension}`)}
				>
					<Download /> Baixar arquivo .{extension}
				</Button>
			</div>
		</>
	)
}
