'use client'

import { Alert } from '@4people/ui'
import { CircleCheck, CircleX } from 'lucide-react'
import { useMemo, useState } from 'react'
import { z } from 'zod'
import { useToolForm } from '@/components/form/use-tool-form'
import type { Mask } from '@/lib/masks'
import { FormCard, ResultCard, ToolLayout } from './tool-layout'

/** `detail` is an extra fact a valid number reveals: the CPF's fiscal region, a card's brand, a voter ID's state. */
export type Validation = { valid: boolean; formatted: string; detail?: string | null }

/** Validates a Brazilian document number as the user types it (masked) or pastes it. */
export function DocumentValidator({
	label,
	placeholder,
	digits,
	mask,
	validate,
}: {
	label: string
	placeholder: string
	/** Exact length, or [min, max] (cards have 13 to 19 digits). */
	digits: number | readonly [number, number]
	mask: Mask
	validate: (value: string) => Validation
}) {
	const [result, setResult] = useState<Validation | null>(null)
	// Built once per document type, not on every render.
	const schema = useMemo(
		() =>
			z.object({
				document: z
					.string()
					.trim()
					.min(1, `Informe o ${label}.`)
					.refine(
						(value) => {
							const length = value.replace(/[^\dXx]/g, '').length
							return typeof digits === 'number'
								? length === digits
								: length >= digits[0] && length <= digits[1]
						},
						typeof digits === 'number'
							? `O ${label} deve ter ${digits} dígitos.`
							: `O ${label} deve ter de ${digits[0]} a ${digits[1]} dígitos.`,
					),
			}),
		[label, digits],
	)
	const form = useToolForm({
		schema,
		defaultValues: { document: '' },
		onSubmit: ({ document }) => setResult(validate(document)),
	})

	// "cartão" reads inside sentences ("Informe o cartão"); a field label or a sentence start needs "Cartão".
	const capitalized = label.charAt(0).toUpperCase() + label.slice(1)

	return (
		<ToolLayout>
			<FormCard
				onSubmit={() => form.handleSubmit()}
				actions={
					<form.AppForm>
						<form.SubmitButton>Validar {label}</form.SubmitButton>
					</form.AppForm>
				}
			>
				<form.AppField name="document">
					{(f) => (
						<f.TextField
							label={capitalized}
							placeholder={placeholder}
							mask={mask}
							enterKeyHint="go"
							description="Digite ou cole; a pontuação entra sozinha."
						/>
					)}
				</form.AppField>
			</FormCard>
			<ResultCard
				empty={!result}
				copyText={result ? `${result.formatted}: ${result.valid ? 'válido' : 'inválido'}` : ''}
				onClear={() => {
					setResult(null)
					form.reset()
				}}
			>
				{result ? (
					<Alert tone={result.valid ? 'success' : 'danger'}>
						{result.valid ? <CircleCheck /> : <CircleX />}
						<div className="flex flex-col gap-1">
							<p className="tabular text-lg font-semibold">{result.formatted}</p>
							<p>{result.valid ? `${capitalized} válido.` : `${capitalized} inválido.`}</p>
							{result.detail ? <p className="text-fg-muted">{result.detail}</p> : null}
						</div>
					</Alert>
				) : null}
			</ResultCard>
		</ToolLayout>
	)
}
