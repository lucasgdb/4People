'use client'

import { Button, CopyButton } from '@4people/ui'
import { ArrowRight, CircleCheck, RefreshCw } from 'lucide-react'
import type { Route } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import { ToolIcon } from '@/components/tool-icons'
import { generateCPF } from '@/lib/algorithms/documents'

const HREF = '/computacao/geradores/gerador-de-cpf'

/**
 * The real tool in miniature. The server draws a new valid CPF for every request, so each F5 shows
 * a new number already in the HTML, with no swap after loading; "Gerar outro" draws in the browser.
 * The two check digits carry the hero's soft marker and the note under the number names them.
 */
export function LiveCpf({ initial }: { initial: string }) {
	const [cpf, setCpf] = useState(initial)
	// Counts draws: re-keys the number so it animates in, and turns the refresh icon half a turn.
	const [draws, setDraws] = useState(0)
	const [base, check] = cpf.includes('-') ? cpf.split('-') : [cpf, '']

	function drawAnother() {
		setCpf(generateCPF())
		setDraws((count) => count + 1)
	}

	return (
		<section
			aria-labelledby="cpf-ao-vivo"
			className="rounded-panel border-border bg-surface shadow-float relative isolate flex flex-col gap-5 overflow-hidden border p-6 sm:p-7"
		>
			{/* A soft blue glow in the top corner, behind everything. */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -top-24 -right-20 -z-10 size-64 rounded-full bg-[radial-gradient(closest-side,var(--color-accent-soft),transparent)]"
			/>
			<div className="flex items-start justify-between gap-3">
				<div className="flex items-center gap-3">
					<span
						aria-hidden="true"
						className="bg-accent text-accent-fg grid size-11 shrink-0 place-items-center rounded-[14px] shadow-[0_6px_16px_-6px_var(--color-accent)]"
					>
						<ToolIcon slug="gerador-de-cpf" size={22} />
					</span>
					<div className="flex flex-col">
						<h2 id="cpf-ao-vivo" className="text-fg font-bold">
							Gerador de CPF
						</h2>
						<p className="text-fg-subtle text-sm">Novo a cada visita</p>
					</div>
				</div>
				<Link
					href={HREF as Route}
					className="group text-accent-soft-fg hover:bg-accent-soft -mr-2 flex min-h-11 items-center gap-1 rounded-full px-3 text-sm font-semibold transition-colors duration-(--ds-motion-fast)"
				>
					Abrir <span className="sr-only">o gerador de CPF</span>
					<ArrowRight
						className="size-4 transition-transform duration-(--ds-motion-fast) group-hover:translate-x-0.5"
						aria-hidden="true"
					/>
				</Link>
			</div>

			<div className="rounded-control border-border bg-surface-muted flex flex-col gap-3 border px-5 pt-5 pb-4">
				<output
					aria-live="polite"
					className="text-fg tabular block text-[clamp(1.75rem,7vw,2.5rem)] leading-none font-extrabold tracking-[-0.01em]"
				>
					<span
						key={draws}
						className={draws > 0 ? 'animate-value-in inline-block' : 'inline-block'}
					>
						{base}
						{check && (
							<>
								<span className="text-fg-subtle">-</span>
								<span className="text-accent rounded-[4px] bg-[linear-gradient(transparent_62%,var(--color-accent-soft)_62%)] px-0.5">
									{check}
								</span>
							</>
						)}
					</span>
				</output>
				<p className="text-success-ink flex items-center gap-1.5 text-sm font-medium">
					<CircleCheck aria-hidden="true" className="size-4 shrink-0" />
					<span>
						Dígitos verificadores <span className="text-accent font-semibold">{check}</span> válidos
					</span>
				</p>
			</div>

			<div className="grid grid-cols-2 gap-2">
				<Button size="sm" variant="secondary" onClick={drawAnother}>
					<RefreshCw
						aria-hidden="true"
						className="transition-transform duration-(--ds-motion) ease-(--ease-out)"
						style={{ rotate: `${draws * 180}deg` }}
					/>
					Gerar outro
				</Button>
				<CopyButton value={cpf} variant="primary" />
			</div>
		</section>
	)
}
