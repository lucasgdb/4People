'use client'

import { Alert, Button, DataList } from '@4people/ui'
import { CircleX, Download } from 'lucide-react'
import { useDeferredValue, useEffect, useMemo, useState } from 'react'
import { useAppForm } from '@/components/form/form'
import { extensionForMime, formatBytes, parseDataUri } from '@/lib/algorithms/convert'
import { formatNumber } from '@/lib/format'
import { FormCard, ResultCard, ToolLayout } from './_shared/tool-layout'

const EXAMPLE =
	'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNhNjIwMjMiIHN0cm9rZS13aWR0aD0iMiI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iOSIvPjwvc3ZnPg=='

type Dimensions = { width: number; height: number }

function download(bytes: Uint8Array, mime: string, name: string) {
	const url = URL.createObjectURL(new Blob([bytes as BlobPart], { type: mime }))
	const anchor = Object.assign(document.createElement('a'), { href: url, download: name })
	anchor.click()
	URL.revokeObjectURL(url)
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
					{(f) => (
						<f.TextareaField
							label="Data URI"
							description='Também aceita url("data:…") copiado do CSS.'
							rows={10}
							placeholder="Ex.: data:image/png;base64,iVBORw0KGgo…"
						/>
					)}
				</form.AppField>
			</FormCard>
			<form.Subscribe selector={(state) => state.values.input}>
				{(input) => <Decoded input={input} onClear={() => form.reset({ input: '' })} />}
			</form.Subscribe>
		</ToolLayout>
	)
}

function Decoded({ input, onClear }: { input: string; onClear: () => void }) {
	const deferred = useDeferredValue(input)
	const parsed = useMemo(() => {
		if (!deferred.trim()) return null
		try {
			const data = parseDataUri(deferred)
			// Blob URL for the preview: lighter than re-rendering a huge data URI in <img>.
			return { ok: true as const, data }
		} catch (error) {
			return { ok: false as const, error: (error as Error).message }
		}
	}, [deferred])
	const [preview, setPreview] = useState<{
		url: string
		size?: Dimensions
		broken?: boolean
	} | null>(null)

	useEffect(() => {
		if (!parsed?.ok || !parsed.data.mime.startsWith('image/')) {
			setPreview(null)
			return
		}
		const url = URL.createObjectURL(
			new Blob([parsed.data.bytes as BlobPart], { type: parsed.data.mime }),
		)
		let alive = true
		const image = new Image()
		image.onload = () => {
			if (alive) {
				setPreview({
					url,
					size: image.naturalWidth
						? { width: image.naturalWidth, height: image.naturalHeight }
						: undefined,
				})
			}
		}
		image.onerror = () => {
			if (alive) setPreview({ url, broken: true })
		}
		image.src = url
		return () => {
			alive = false
			URL.revokeObjectURL(url)
		}
	}, [parsed])

	const extension = parsed?.ok ? extensionForMime(parsed.data.mime) : ''
	const isImage = parsed?.ok && parsed.data.mime.startsWith('image/')

	return (
		<ResultCard
			title="Arquivo"
			empty={!input.trim()}
			emptyText="Cole um data URI e a imagem aparece aqui."
			onClear={onClear}
		>
			{parsed?.ok ? (
				<>
					{isImage && preview && !preview.broken ? (
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
					) : null}
					{isImage && preview?.broken ? (
						<Alert tone="danger">
							<CircleX />O navegador não conseguiu abrir esta imagem: os dados podem estar
							corrompidos ou o tipo MIME pode estar errado.
						</Alert>
					) : null}
					<DataList
						columns={2}
						items={[
							{
								label: 'Tipo MIME',
								value: (
									<span className="font-mono text-base" translate="no">
										{parsed.data.mime}
									</span>
								),
								hint: parsed.data.params.join('; ') || undefined,
							},
							{ label: 'Tamanho', value: formatBytes(parsed.data.bytes.length) },
							{
								label: 'Dimensões',
								value: preview?.size
									? `${formatNumber(preview.size.width)} × ${formatNumber(preview.size.height)} px`
									: '—',
							},
							{ label: 'Codificação', value: parsed.data.base64 ? 'Base64' : 'Texto (URL)' },
						]}
					/>
					<div>
						<Button
							variant="primary"
							size="sm"
							onClick={() => download(parsed.data.bytes, parsed.data.mime, `arquivo.${extension}`)}
						>
							<Download /> Baixar arquivo .{extension}
						</Button>
					</div>
				</>
			) : parsed ? (
				<Alert tone="danger">
					<CircleX />
					{parsed.error}
				</Alert>
			) : null}
		</ResultCard>
	)
}
