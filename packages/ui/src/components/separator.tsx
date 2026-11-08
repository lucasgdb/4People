'use client'

import { Separator as BaseSeparator } from '@base-ui/react/separator'
import type { ComponentProps } from 'react'
import { cn } from '../lib/cn.ts'

export function Separator({ className, ...props }: ComponentProps<typeof BaseSeparator>) {
	return (
		<BaseSeparator
			className={cn(
				'bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch',
				className as string,
			)}
			{...props}
		/>
	)
}
