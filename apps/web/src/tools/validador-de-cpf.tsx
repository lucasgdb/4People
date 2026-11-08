'use client'

import { validateCPF } from '@/lib/algorithms/documents'
import { MASKS } from '@/lib/masks'
import { DocumentValidator } from './_shared/document-validator'

const validate = (value: string) => {
	const { region, ...result } = validateCPF(value)
	return { ...result, detail: region ? `Região fiscal: ${region}.` : null }
}

export default function CpfValidator() {
	return (
		<DocumentValidator
			label="CPF"
			placeholder="Ex: 529.982.247-25"
			digits={11}
			mask={MASKS.cpf}
			validate={validate}
		/>
	)
}
