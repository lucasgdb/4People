'use client'

import { validateCNH } from '@/lib/algorithms/documents'
import { MASKS } from '@/lib/masks'
import { DocumentValidator } from './_shared/document-validator'

export default function CnhValidator() {
	return (
		<DocumentValidator
			label="CNH"
			placeholder="Ex: 61727865535"
			digits={11}
			mask={MASKS.cnh}
			validate={validateCNH}
		/>
	)
}
