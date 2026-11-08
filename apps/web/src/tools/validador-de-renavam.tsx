'use client'

import { validateRENAVAM } from '@/lib/algorithms/documents'
import { MASKS } from '@/lib/masks'
import { DocumentValidator } from './_shared/document-validator'

export default function RenavamValidator() {
	return (
		<DocumentValidator
			label="RENAVAM"
			placeholder="Ex: 40188822797"
			digits={[9, 11] as const}
			mask={MASKS.renavam}
			validate={validateRENAVAM}
		/>
	)
}
