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

/** Exact length, or [min, max] (cards have 13 to 19 digits). */
type DigitCount = number | readonly [number, number]

const countDigits = (value: string) => value.replace(/[^\dXx]/g, '').length

function hasDigitCount(value: string, digits: DigitCount): boolean {
	const length = countDigits(value)
	if (typeof digits === 'number') return length === digits
	const [min, max] = digits
	return length >= min && length <= max
}

function digitCountMessage(label: string, digits: DigitCount): string {
	if (typeof digits === 'number') return `O ${label} deve ter ${digits} dígitos.`
	return `O ${label} deve ter de ${digits[0]} a ${digits[1]} dígitos.`
}

function documentSchema(label: string, digits: DigitCount) {
	return z.object({
		document: z
			.string()
			.trim()
			.min(1, `Informe o ${label}.`)
			.refine((value) => hasDigitCount(value, digits), digitCountMessage(label, digits)),
	})
}

/** "cartão" reads inside sentences ("Informe o cartão"); a field label or a sentence start needs "Cartão". */
const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

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
	digits: DigitCount
	mask: Mask
	validate: (value: string) => Validation
}) {
	const [result, setResult] = useState<Validation | null>(null)
	const schema = useMemo(() => documentSchema(label, digits), [label, digits])
	const form = useToolForm({
		schema,
		defaultValues: { document: '' },
		onSubmit: ({ document }) => setResult(validate(document)),
	})

	const capitalizedLabel = capitalize(label)
	const verdict = result?.valid ? 'válido' : 'inválido'

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
					{(field) => (
						<field.TextField
							label={capitalizedLabel}
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
				copyText={result ? `${result.formatted}: ${verdict}` : ''}
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
							<p>{`${capitalizedLabel} ${verdict}.`}</p>
							{result.detail ? <p className="text-fg-muted">{result.detail}</p> : null}
						</div>
					</Alert>
				) : null}
			</ResultCard>
		</ToolLayout>
	)
}
