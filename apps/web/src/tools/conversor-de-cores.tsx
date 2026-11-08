'use client'

import { Alert, Badge } from '@4people/ui'
import { CircleX } from 'lucide-react'
import { useDeferredValue, useMemo } from 'react'
import { useAppForm } from '@/components/form/form'
import { contrastRatio, formatColor, parseColor, type Rgb } from '@/lib/algorithms/color'
import { formatNumber } from '@/lib/format'
import { CopyRows } from './_shared/copy-rows'
import { FormCard, ResultCard, ToolLayout } from './_shared/tool-layout'

const WHITE: Rgb = { r: 255, g: 255, b: 255, alpha: 1 }
const BLACK: Rgb = { r: 0, g: 0, b: 0, alpha: 1 }

/** WCAG 2 level for normal text: AAA ≥ 7, AA ≥ 4.5, AA large text ≥ 3. */
const level = (ratio: number) =>
	ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : ratio >= 3 ? 'AA grande' : 'Falha'

function Conversion({ input, onClear }: { input: string; onClear: () => void }) {
	const deferred = useDeferredValue(input)
	const result = useMemo(() => {
		try {
			const rgb = parseColor(deferred)
			return { ok: true as const, rgb, formats: formatColor(rgb) }
		} catch (error) {
			return { ok: false as const, error: (error as Error).message }
		}
	}, [deferred])

	return (
		<ResultCard
			title="Formatos"
			empty={!input.trim()}
			emptyText="Digite uma cor ou escolha no seletor."
			onClear={onClear}
		>
			{result.ok ? (
				<>
					<div className="flex items-stretch gap-3">
						<div
							className="rounded-panel border-border size-20 shrink-0 border"
							style={{ background: result.formats.rgb }}
							aria-hidden="true"
						/>
						{/* The swatches show the contrast visually (decorative); the verdict is plain text in ink. */}
						<ul className="grid min-w-0 flex-1 grid-cols-2 gap-2 text-sm">
							{(
								[
									['Texto branco', WHITE, '#fff'],
									['Texto preto', BLACK, '#000'],
								] as const
							).map(([label, ink, css]) => {
								const ratio = contrastRatio(result.rgb, ink)
								return (
									<li
										key={label}
										className="rounded-control border-border flex min-w-0 items-center gap-3 border px-3 py-2"
									>
										<span
											aria-hidden="true"
											className="flex size-9 shrink-0 flex-col items-start justify-center gap-1 rounded-[6px] px-2"
											style={{ background: result.formats.rgb }}
										>
											{/* Two "lines of text" in the ink colour: shows the contrast without being text. */}
											<span className="h-1 w-5 rounded-full" style={{ background: css }} />
											<span className="h-1 w-3.5 rounded-full" style={{ background: css }} />
										</span>
										<span className="flex min-w-0 flex-col">
											<span className="text-fg font-medium">{label}</span>
											<span className="text-fg-muted tabular flex flex-wrap items-center gap-x-2 gap-y-1">
												{formatNumber(ratio, 2)}:1
												<Badge tone={ratio >= 4.5 ? 'success' : 'danger'}>{level(ratio)}</Badge>
											</span>
										</span>
									</li>
								)
							})}
						</ul>
					</div>
					<CopyRows
						code
						rows={[
							{ label: 'HEX', value: result.formats.hex },
							{ label: 'RGB', value: result.formats.rgb },
							{ label: 'HSL', value: result.formats.hsl },
							{ label: 'OKLCH', value: result.formats.oklch },
							{ label: 'CMYK (aproximado)', value: result.formats.cmyk },
						]}
					/>
				</>
			) : (
				<Alert tone="danger">
					<CircleX />
					{result.error}
				</Alert>
			)}
		</ResultCard>
	)
}

/** HEX, RGB, HSL, OKLCH and CMYK of any color, with WCAG contrast against white and black. */
export default function ColorConverter() {
	const form = useAppForm({ defaultValues: { color: '#a62023' } })
	return (
		<ToolLayout>
			<FormCard
				onSubmit={() => undefined}
				actions={<p className="text-fg-muted text-[0.8125rem]">Atualiza enquanto você digita.</p>}
			>
				<form.AppField name="color">
					{(f) => (
						<div className="flex items-end gap-3">
							<f.TextField
								label="Cor"
								placeholder="Ex: #a62023, rgb(166 32 35), hsl(359 68% 39%)"
								className="flex-1"
							/>
							<label className="flex shrink-0 cursor-pointer flex-col gap-2 text-sm font-medium">
								<span className="sr-only">Escolher cor no seletor</span>
								<input
									type="color"
									value={/^#[0-9a-f]{6}$/i.test(f.state.value) ? f.state.value : '#000000'}
									onChange={(event) => f.handleChange(event.target.value)}
									className="rounded-control border-border-strong bg-surface h-11 w-14 cursor-pointer border p-1 sm:h-10"
								/>
							</label>
						</div>
					)}
				</form.AppField>
			</FormCard>
			<form.Subscribe selector={(state) => state.values.color}>
				{(color) => <Conversion input={color} onClear={() => form.reset({ color: '' })} />}
			</form.Subscribe>
		</ToolLayout>
	)
}
