'use client'

import { Button as BaseButton } from '@base-ui/react/button'
import type { VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { cn } from '../lib/cn.ts'
import { buttonVariants } from './button-variants.ts'

export type ButtonProps = ComponentProps<typeof BaseButton> & VariantProps<typeof buttonVariants>

export function Button({ className, variant, size, type = 'button', ...props }: ButtonProps) {
	return (
		<BaseButton
			type={type}
			className={cn(buttonVariants({ variant, size }), className as string)}
			{...props}
		/>
	)
}
