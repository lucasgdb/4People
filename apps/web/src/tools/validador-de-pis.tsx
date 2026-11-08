'use client'

import { validatePIS } from '@/lib/algorithms/documents'
import { MASKS } from '@/lib/masks'
import { DocumentValidator } from './_shared/document-validator'

export default function PisValidator() {
	return (
		<DocumentValidator
			label="PIS"
			placeholder="Ex: 471.18372.04-8"
			digits={11}
			mask={MASKS.pis}
			validate={validatePIS}
		/>
	)
}
