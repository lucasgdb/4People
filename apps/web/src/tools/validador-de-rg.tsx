'use client'

import { validateRG } from '@/lib/algorithms/documents'
import { MASKS } from '@/lib/masks'
import { DocumentValidator } from './_shared/document-validator'

export default function RgValidator() {
	return (
		<DocumentValidator
			label="RG"
			placeholder="Ex: 24.678.131-4"
			digits={9}
			mask={MASKS.rg}
			validate={validateRG}
		/>
	)
}
