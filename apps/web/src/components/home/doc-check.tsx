'use client'

import { cn, Input } from '@4people/ui'
import { CircleCheck, CircleX } from 'lucide-react'
import { useAppForm } from '@/components/form/form'
import { validateCNPJ, validateCPF } from '@/lib/algorithms/documents'
import { onlyDigits } from '@/lib/algorithms/random'

/** `tone` is the verdict the example gives: its dot is that colour before you even try it. */
const EXAMPLES = [
	{ value: '11.222.333/0001-81', hint: 'CNPJ válido', tone: 'bg-success' },
	{ value: '123.456.789-00', hint: 'CPF inválido', tone: 'bg-danger' },
	{ value: '111.111.111-11', hint: 'Dígitos repetidos', tone: 'bg-warning-ink' },
] as const

type Verdict =
	| { kind: 'CPF' | 'CNPJ'; valid: boolean; formatted: string; detail: string }
	| { kind: 'incomplete'; digits: number }

function check(value: string): Verdict {
	const digits = onlyDigits(value)
	if (digits.length === 11) {
		const { valid, formatted, region } = validateCPF(digits)
		return {
			kind: 'CPF',
			valid,
			formatted,
			detail: valid ? `Região fiscal: ${region}.` : 'Os dígitos verificadores não conferem.',
		}
	}
	if (digits.length === 14) {
		const { valid, formatted } = validateCNPJ(digits)
		return {
			kind: 'CNPJ',
			valid,
			formatted,
			detail: valid
				? 'Matriz ou filial com dígitos verificadores corretos.'
				: 'Os dígitos verificadores não conferem.',
		}
	}
	return { kind: 'incomplete', digits: digits.length }
}

/**
 * Paste a CPF or CNPJ and see the verdict on every keystroke; nothing leaves the browser. The label
 * is the section heading on the home page (`<label htmlFor="doc">`).
 */
export function DocCheck() {
	const form = useAppForm({ defaultValues: { doc: '529.982.247-25' } })

	return (
		<form.Field name="doc">
			{(field) => {
				const verdict = check(field.state.value)
				const done = verdict.kind !== 'incomplete'
				// The type the digits so far point to: a CPF up to 11, a CNPJ beyond. Its badge sits in the
				// field from sm up; on phones the field keeps the room for the number.
				const kind = done ? verdict.kind : verdict.digits > 11 ? 'CNPJ' : 'CPF'
				const target = kind === 'CNPJ' ? 14 : 11
				return (
					<div className="flex flex-col gap-5">
						<div className="relative">
							<span
								aria-hidden="true"
								className={cn(
									'rounded-chip pointer-events-none absolute top-1/2 left-3 hidden -translate-y-1/2 px-2 py-1 text-xs font-bold tracking-wider transition-colors duration-(--ds-motion) sm:block',
									!done && 'bg-surface-sunken text-fg-muted',
									done && verdict.valid && 'bg-success-soft text-success-ink',
									done && !verdict.valid && 'bg-danger-soft text-danger-ink',
								)}
							>
								{kind}
							</span>
							{/* The DS input carries the verdict: aria-invalid / data-success tint border, hover and focus ring. */}
							<Input
								id="doc"
								name="doc"
								inputMode="numeric"
								autoComplete="off"
								spellCheck={false}
								aria-describedby="doc-verdict"
								aria-invalid={done && !verdict.valid ? true : undefined}
								data-success={done && verdict.valid ? '' : undefined}
								value={field.state.value}
								onChange={(event) => field.handleChange(event.target.value)}
								className="h-16 min-w-0 pr-12 pl-4 font-mono text-xl tabular-nums shadow-[inset_0_1px_2px_rgb(23_32_51/0.06)] sm:pr-14 sm:pl-[4.75rem] sm:text-[1.75rem]"
								placeholder="529.982.247-25"
							/>
							{done ? (
								<span
									aria-hidden="true"
									key={`${verdict.kind}-${verdict.valid}`}
									className="animate-value-in pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 sm:right-4"
								>
									{verdict.valid ? (
										<CircleCheck className="text-success size-6" />
									) : (
										<CircleX className="text-danger size-6" />
									)}
								</span>
							) : null}
						</div>
						<div id="doc-verdict" aria-live="polite">
							{verdict.kind === 'incomplete' ? (
								<div className="rounded-control bg-surface-muted flex flex-col gap-3 px-5 py-4">
									<p className="text-fg-muted text-[1.0625rem]">
										{verdict.digits === 0
											? 'Digite os 11 dígitos de um CPF ou os 14 de um CNPJ.'
											: `${verdict.digits} de ${target} dígitos de um ${kind}.`}
									</p>
									<span
										aria-hidden="true"
										className="bg-surface-sunken h-1.5 overflow-hidden rounded-full"
									>
										<span
											className="bg-accent block h-full rounded-full transition-[width] duration-(--ds-motion) ease-(--ease-out)"
											style={{ width: `${(Math.min(verdict.digits, target) / target) * 100}%` }}
										/>
									</span>
								</div>
							) : (
								<div
									className={cn(
										'rounded-control flex items-start gap-3 border px-5 py-4',
										verdict.valid
											? 'border-success/20 bg-success-soft text-success-ink'
											: 'border-danger/20 bg-danger-soft text-danger-ink',
									)}
								>
									{verdict.valid ? (
										<CircleCheck aria-hidden="true" className="text-success mt-1 size-5 shrink-0" />
									) : (
										<CircleX aria-hidden="true" className="text-danger mt-1 size-5 shrink-0" />
									)}
									<p className="text-[1.0625rem]">
										<strong className="font-bold">
											{verdict.kind} {verdict.valid ? 'válido' : 'inválido'}.
										</strong>{' '}
										{verdict.detail}
									</p>
								</div>
							)}
						</div>
						<div className="flex flex-col gap-2.5">
							<span
								id="doc-exemplos"
								className="text-fg-subtle text-xs font-semibold tracking-wider uppercase"
							>
								Ou experimente um destes
							</span>
							<ul aria-labelledby="doc-exemplos" className="grid gap-2 sm:grid-cols-3">
								{EXAMPLES.map((example) => {
									const current = field.state.value === example.value
									return (
										<li key={example.value} className="flex">
											<button
												type="button"
												aria-pressed={current}
												onClick={() => field.handleChange(example.value)}
												className="rounded-control border-border bg-surface hover:border-accent/35 hover:shadow-float focus-visible:ring-ring aria-pressed:border-accent aria-pressed:bg-accent-soft/40 flex w-full cursor-pointer flex-col items-start gap-1 border px-4 py-3 text-left shadow-[0_1px_2px_rgb(23_32_51/0.04)] transition-[translate,border-color,box-shadow,background-color] duration-(--ds-motion) ease-(--ease-out) outline-none hover:-translate-y-0.5 focus-visible:ring-4"
											>
												<span className="text-fg-muted flex items-center gap-1.5 text-[0.8125rem] font-medium">
													<span
														aria-hidden="true"
														className={cn('size-2 rounded-full', example.tone)}
													/>
													{example.hint}
												</span>
												<span translate="no" className="text-fg tabular font-mono text-sm">
													{example.value}
												</span>
											</button>
										</li>
									)
								})}
							</ul>
						</div>
					</div>
				)
			}}
		</form.Field>
	)
}
