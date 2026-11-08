'use client'

import { Alert, Badge, ColorArea, CopyButton } from '@4people/ui'
import { CircleX } from 'lucide-react'
import { useDeferredValue, useMemo } from 'react'
import { useAppForm } from '@/components/form/form'
import { contrastRatio, formatColor, parseColor, type Rgb } from '@/lib/algorithms/color'
import { formatNumber } from '@/lib/format'
import { FormCard, ResultCard, ToolLayout } from './_shared/tool-layout'

const WHITE: Rgb = { r: 255, g: 255, b: 255, alpha: 1 }
const BLACK: Rgb = { r: 0, g: 0, b: 0, alpha: 1 }

const FORMATS = [
	['HEX', 'hex'],
	['RGB', 'rgb'],
	['HSL', 'hsl'],
	['OKLCH', 'oklch'],
	['CMYK', 'cmyk'],
] as const

/** WCAG 2 rating for text on this color: AAA ≥ 7, AA ≥ 4.5, large text only ≥ 3. */
function contrastRating(ratio: number) {
	if (ratio >= 7) {
		return { level: 'AAA', tone: 'success', hint: 'Ótimo para qualquer texto' } as const
	}
	if (ratio >= 4.5) return { level: 'AA', tone: 'success', hint: 'Bom para texto normal' } as const
	if (ratio >= 3) {
		return { level: 'AA grande', tone: 'neutral', hint: 'Só para texto grande' } as const
	}
	return { level: 'Falha', tone: 'danger', hint: 'Evite texto nesta cor' } as const
}

function parseColorInput(input: string) {
	try {
		const rgb = parseColor(input)
		return { ok: true as const, rgb, formats: formatColor(rgb) }
	} catch (error) {
		return { ok: false as const, error: (error as Error).message }
	}
}

/** "Aa" drawn in the ink over the color: shows the contrast (decorative; the rating is text). */
function ContrastSample({ background, ink }: { background: string; ink: string }) {
	return (
		<svg
			aria-hidden="true"
			viewBox="0 0 56 56"
			className="border-border size-14 shrink-0 rounded-[14px] border"
			style={{ background }}
		>
			<text
				x="28"
				y="36"
				textAnchor="middle"
				fontSize="22"
				fontWeight="700"
				fill={ink}
				fontFamily="inherit"
			>
				Aa
			</text>
		</svg>
	)
}

function ContrastCard({
	label,
	background,
	ink,
	ratio,
}: {
	label: string
	background: string
	ink: string
	ratio: number
}) {
	const rating = contrastRating(ratio)
	return (
		<div className="rounded-control border-border flex items-center gap-4 border p-3">
			<ContrastSample background={background} ink={ink} />
			<div className="flex min-w-0 flex-col gap-0.5">
				<span className="text-fg-muted text-[0.8125rem]">{label}</span>
				<span className="flex flex-wrap items-center gap-2">
					<span className="text-fg tabular text-lg font-bold">{formatNumber(ratio, 2)}:1</span>
					<Badge tone={rating.tone}>{rating.level}</Badge>
				</span>
				<span className="text-fg-muted text-[0.8125rem]">{rating.hint}</span>
			</div>
		</div>
	)
}

function ColorDetails({ input }: { input: string }) {
	const deferredInput = useDeferredValue(input)
	const parsed = useMemo(() => parseColorInput(deferredInput), [deferredInput])

	if (!input.trim()) {
		return <ResultCard title="Sua cor" empty emptyText="Escolha ou digite uma cor." />
	}
	if (!parsed.ok) {
		return (
			<ResultCard title="Sua cor">
				<Alert tone="danger">
					<CircleX />
					{parsed.error}
				</Alert>
			</ResultCard>
		)
	}

	const { rgb, formats } = parsed
	const contrastOnWhite = contrastRatio(rgb, WHITE)
	const contrastOnBlack = contrastRatio(rgb, BLACK)
	const readableInk = contrastOnWhite >= contrastOnBlack ? '#ffffff' : '#000000'

	return (
		<ResultCard title="Sua cor">
			<div
				className="rounded-panel border-border flex h-36 flex-col justify-end border p-5"
				style={{ background: formats.rgb }}
			>
				<span
					translate="no"
					className="font-mono text-2xl font-bold tracking-wide uppercase"
					style={{ color: readableInk }}
				>
					{formats.hex}
				</span>
			</div>

			<div className="grid gap-3 sm:grid-cols-2">
				<ContrastCard
					label="Texto branco"
					background={formats.rgb}
					ink="#ffffff"
					ratio={contrastOnWhite}
				/>
				<ContrastCard
					label="Texto preto"
					background={formats.rgb}
					ink="#000000"
					ratio={contrastOnBlack}
				/>
			</div>

			<ul
				aria-label="Formatos"
				className="border-border divide-border rounded-control divide-y border"
			>
				{FORMATS.map(([label, key]) => (
					<li key={key} className="flex items-center gap-3 py-1.5 pr-1.5 pl-4">
						<span className="text-fg-muted w-14 shrink-0 text-xs font-semibold tracking-wider">
							{label}
						</span>
						<span
							translate="no"
							className="text-fg min-w-0 flex-1 font-mono text-[0.9375rem] [overflow-wrap:anywhere] select-all"
						>
							{formats[key]}
						</span>
						<CopyButton iconOnly variant="ghost" value={formats[key]} label={`Copiar ${label}`} />
					</li>
				))}
			</ul>
			<p className="text-fg-muted text-[0.8125rem]">
				CMYK é aproximado: a cor impressa depende do perfil da gráfica.
			</p>
		</ResultCard>
	)
}

/** HEX, RGB, HSL, OKLCH and CMYK of any color, with WCAG contrast against white and black. */
export default function ColorConverter() {
	const form = useAppForm({ defaultValues: { color: '#a62023' } })
	return (
		<ToolLayout>
			<FormCard
				title="Escolha a cor"
				onSubmit={() => undefined}
				actions={<p className="text-fg-muted text-[0.8125rem]">Atualiza enquanto você mexe.</p>}
			>
				<form.AppField name="color">
					{(field) => {
						const parsed = parseColorInput(field.state.value)
						// The picker follows a valid typed color (alpha dropped); picking writes its HEX here.
						const pickerHex = parsed.ok ? parsed.formats.hex.slice(0, 7) : '#000000'
						return (
							<>
								<ColorArea value={pickerHex} onValueChange={(next) => field.handleChange(next)} />
								<field.TextField
									label="Ou digite em qualquer formato"
									placeholder="Ex: #a62023, rgb(166 32 35), hsl(359 68% 39%)"
									inputClassName="font-mono"
								/>
							</>
						)
					}}
				</form.AppField>
			</FormCard>
			<form.Subscribe selector={(state) => state.values.color}>
				{(color) => <ColorDetails input={color} />}
			</form.Subscribe>
		</ToolLayout>
	)
}
