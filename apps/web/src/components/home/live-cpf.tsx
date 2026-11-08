'use client'

import { Button, CopyButton } from '@4people/ui'
import { ArrowRight, RefreshCw } from 'lucide-react'
import type { Route } from 'next'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ToolIcon } from '@/components/tool-icons'
import { generateCPF } from '@/lib/algorithms/documents'

const SAMPLE_CPF = '529.982.247-25'
const HREF = '/computacao/geradores/gerador-de-cpf'

/**
 * The real tool in miniature: a new valid CPF on every visit. The server HTML carries a fixed valid
 * sample (shown without JavaScript); the browser replaces it once. The ref keeps it to once even
 * when React runs effects twice (Strict Mode in development), which made F5 generate two numbers.
 */
export function LiveCpf() {
	const [cpf, setCpf] = useState(SAMPLE_CPF)
	const generated = useRef(false)
	useEffect(() => {
		if (generated.current) return
		generated.current = true
		setCpf(generateCPF())
	}, [])

	return (
		<section
			aria-labelledby="cpf-ao-vivo"
			className="rounded-panel border-border bg-surface flex flex-col gap-6 border p-6 sm:p-7"
		>
			<div className="flex items-center justify-between gap-3">
				<h2 id="cpf-ao-vivo" className="text-fg flex items-center gap-3 font-bold">
					<span
						aria-hidden="true"
						className="bg-accent-soft text-accent grid size-10 place-items-center rounded-[12px]"
					>
						<ToolIcon slug="gerador-de-cpf" size={20} />
					</span>
					Gerador de CPF
				</h2>
				<Link
					href={HREF as Route}
					className="text-accent-soft-fg flex min-h-11 items-center gap-1 rounded-full px-2 text-sm font-semibold hover:underline"
				>
					Abrir <span className="sr-only">o gerador de CPF</span>
					<ArrowRight className="size-4" aria-hidden="true" />
				</Link>
			</div>
			<output
				aria-live="polite"
				className="rounded-control bg-surface-muted text-fg tabular px-5 py-5 text-[clamp(1.75rem,7vw,2.5rem)] leading-none font-extrabold tracking-[-0.01em]"
			>
				{cpf}
			</output>
			<div className="flex flex-wrap items-center gap-2">
				<Button size="sm" variant="secondary" onClick={() => setCpf(generateCPF())}>
					<RefreshCw /> Gerar outro
				</Button>
				<CopyButton value={cpf} variant="primary" />
				<span className="text-success ml-auto text-sm font-medium">
					Dígitos verificadores válidos
				</span>
			</div>
		</section>
	)
}
