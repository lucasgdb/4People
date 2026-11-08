import { cn } from '@4people/ui'
import Link from 'next/link'

/** The 4People mark: a plain, rounded "4" on the blue of the interface. Same drawing as the favicon. */
export function BrandMark({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 64 64" aria-hidden="true" className={cn('size-7 shrink-0', className)}>
			<rect width="64" height="64" rx="18" fill="var(--color-brand)" />
			<path
				d="M38.5 14 17.5 38.5h29M38.5 14v36"
				fill="none"
				stroke="var(--color-brand-fg)"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="7.5"
			/>
		</svg>
	)
}

export function Wordmark({ className, size = 'md' }: { className?: string; size?: 'md' | 'lg' }) {
	return (
		<Link
			href="/"
			aria-label="4People (beta), página inicial"
			className={cn(
				'rounded-control focus-visible:ring-ring inline-flex items-center gap-2.5 outline-none focus-visible:ring-4',
				className,
			)}
		>
			<BrandMark className={size === 'lg' ? 'size-9' : 'size-8'} />
			<span
				translate="no"
				className={cn(
					'text-fg leading-none font-extrabold tracking-[-0.02em]',
					size === 'lg' ? 'text-[1.375rem]' : 'text-lg',
				)}
			>
				4People
			</span>
			{/* Still being tested: said on every page, next to the name. */}
			<span
				title="Versão beta: ainda em testes"
				className="border-accent/30 bg-accent-soft text-accent-soft-fg inline-flex h-[1.125rem] translate-y-[0.5px] items-center rounded-full border px-1.5 text-[0.625rem] leading-none font-bold uppercase"
			>
				Beta
			</span>
		</Link>
	)
}
