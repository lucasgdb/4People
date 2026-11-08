'use client'

import { Input as BaseInput } from '@base-ui/react/input'
import type { ComponentProps } from 'react'
import { cn } from '../lib/cn.ts'
import { controlClass } from '../lib/control.ts'

export type InputProps = ComponentProps<typeof BaseInput>

export function Input({ className, ...props }: InputProps) {
	return <BaseInput className={cn(controlClass, 'h-12', className as string)} {...props} />
}
