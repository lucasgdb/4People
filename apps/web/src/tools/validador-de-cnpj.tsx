'use client'

import { validateCNPJ } from '@/lib/algorithms/documents'
import { MASKS } from '@/lib/masks'
import { DocumentValidator, type Validation } from './_shared/document-validator'

function validateWithFormat(value: string): Validation {
	const result = validateCNPJ(value)
	if (!result.valid) return result
	const format = result.alphanumeric
		? 'Formato alfanumérico (com letras), válido desde julho de 2026.'
		: 'Formato numérico.'
	return { ...result, detail: format }
}

/** Numeric CNPJs and the alphanumeric format the Receita Federal issues since July 2026. */
export default function CnpjValidator() {
	return (
		<DocumentValidator
			label="CNPJ"
			placeholder="Ex: 11.222.333/0001-81 ou 12.ABC.345/01DE-35"
			digits={14}
			characters="alphanumeric"
			mask={MASKS.cnpj}
			validate={validateWithFormat}
		/>
	)
}
