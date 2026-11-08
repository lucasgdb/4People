'use client'

import { validateCNPJ } from '@/lib/algorithms/documents'
import { MASKS } from '@/lib/masks'
import { DocumentValidator } from './_shared/document-validator'

export default function CnpjValidator() {
	return (
		<DocumentValidator
			label="CNPJ"
			placeholder="Ex: 11.222.333/0001-81"
			digits={14}
			mask={MASKS.cnpj}
			validate={validateCNPJ}
		/>
	)
}
