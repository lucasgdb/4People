'use client'

import { cn } from '@4people/ui'
import { CircleCheck, CircleX } from 'lucide-react'
import { useAppForm } from '@/components/form/form'
import { validateCNPJ, validateCPF } from '@/lib/algorithms/documents'
import { onlyDigits } from '@/lib/algorithms/random'

const EXAMPLES = [
	{ value: '11.222.333/0001-81', hint: 'CNPJ válido' },
	{ value: '123.456.789-00', hint: 'CPF inválido' },
	{ value: '111.111.111-11', hint: 'Dígitos repetidos' },
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
				return (
					<div className="flex flex-col gap-5">
						<input
							id="doc"
							name="doc"
							inputMode="numeric"
							autoComplete="off"
							spellCheck={false}
							aria-describedby="doc-verdict"
							value={field.state.value}
							onChange={(event) => field.handleChange(event.target.value)}
							className="rounded-control border-border-strong bg-surface text-fg placeholder:text-fg-subtle hover:border-accent/55 hover:ring-accent/10 focus-visible:border-accent focus-visible:ring-ring h-16 w-full min-w-0 border px-5 font-mono text-2xl tabular-nums transition-[border-color,box-shadow,background-color] duration-(--ds-motion) ease-(--ease-out) outline-none hover:ring-[3px] focus-visible:ring-4 focus-visible:outline-none sm:text-[1.75rem]"
							placeholder="Ex.: 529.982.247-25"
						/>
						<div id="doc-verdict" aria-live="polite">
							{verdict.kind === 'incomplete' ? (
								<p className="rounded-control bg-surface-muted text-fg-muted px-5 py-4 text-[1.0625rem]">
									{verdict.digits === 0
										? 'Digite os 11 dígitos de um CPF ou os 14 de um CNPJ.'
										: `${verdict.digits} dígitos até agora. Um CPF tem 11 e um CNPJ tem 14.`}
								</p>
							) : (
								<div
									className={cn(
										'rounded-control flex items-start gap-3 px-5 py-4',
										verdict.valid
											? 'bg-success-soft text-success-ink'
											: 'bg-danger-soft text-danger-ink',
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
						<div className="flex flex-col gap-2">
							<span id="doc-exemplos" className="text-fg-muted text-sm">
								Ou experimente um destes:
							</span>
							<ul aria-labelledby="doc-exemplos" className="grid gap-2 sm:grid-cols-3">
								{EXAMPLES.map((example) => (
									<li key={example.value} className="flex">
										<button
											type="button"
											onClick={() => field.handleChange(example.value)}
											className="rounded-control border-border bg-surface hover:border-accent/45 hover:ring-accent-soft focus-visible:ring-ring flex w-full cursor-pointer flex-col items-start gap-0.5 border px-4 py-2.5 text-left transition-[border-color,box-shadow,background-color] duration-(--ds-motion) duration-(--ds-motion) ease-(--ease-out) outline-none hover:ring-4 focus-visible:ring-4"
										>
											<span className="text-fg-muted text-[0.8125rem]">{example.hint}</span>
											<span translate="no" className="text-fg tabular font-mono text-sm">
												{example.value}
											</span>
										</button>
									</li>
								))}
							</ul>
						</div>
					</div>
				)
			}}
		</form.Field>
	)
}
