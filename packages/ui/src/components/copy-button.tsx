'use client'

import { useState } from 'react'
import { cn } from '../lib/cn.ts'
import { Button, type ButtonProps } from './button.tsx'
import { toast } from './toast.tsx'

export type CopyButtonProps = Omit<ButtonProps, 'onClick' | 'children'> & {
	value: string
	label?: string
	/**
	 * Only the icon is shown; the label (and "Copiado") stays for screen readers. `"mobile"` does
	 * that below the sm breakpoint only, so a value in a row keeps the width on phones.
	 */
	iconOnly?: boolean | 'mobile'
}

export function CopyButton({
	value,
	label = 'Copiar',
	variant = 'secondary',
	size,
	iconOnly = false,
	className,
	...props
}: CopyButtonProps) {
	const [copied, setCopied] = useState(false)

	async function copy() {
		if (!value) {
			toast.error('Nada para copiar.')
			return
		}
		try {
			await navigator.clipboard.writeText(value)
			setCopied(true)
			toast.success('Copiado para a área de transferência.')
			setTimeout(() => setCopied(false), 1600)
		} catch {
			toast.error('Não foi possível copiar.')
		}
	}

	return (
		<Button
			variant={variant}
			size={size ?? (iconOnly === true ? 'icon-sm' : 'sm')}
			onClick={copy}
			className={cn(iconOnly === 'mobile' && 'max-sm:size-10 max-sm:px-0', className as string)}
			{...props}
		>
			{copied ? (
				<svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
					<path
						d="M3.5 8.5 6.5 11.5 12.5 4.5"
						stroke="currentColor"
						strokeWidth="1.75"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			) : (
				<svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
					<rect
						x="5.5"
						y="5.5"
						width="8"
						height="8"
						rx="1.5"
						stroke="currentColor"
						strokeWidth="1.5"
					/>
					<path
						d="M10.5 3.5v-.25A1.25 1.25 0 0 0 9.25 2h-5.5A1.25 1.25 0 0 0 2.5 3.25v5.5A1.25 1.25 0 0 0 3.75 10H4"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinecap="round"
					/>
				</svg>
			)}
			{iconOnly === 'mobile' ? (
				<span className="max-sm:sr-only">{copied ? 'Copiado' : label}</span>
			) : iconOnly ? (
				<span className="sr-only">{copied ? 'Copiado' : label}</span>
			) : copied ? (
				'Copiado'
			) : (
				label
			)}
		</Button>
	)
}
