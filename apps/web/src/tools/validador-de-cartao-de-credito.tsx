'use client'

import { CARD_BRANDS, validateCard } from '@/lib/algorithms/documents'
import { MASKS } from '@/lib/masks'
import { DocumentValidator } from './_shared/document-validator'

const validate = (value: string) => {
	const { brand, ...result } = validateCard(value)
	return {
		...result,
		detail: brand ? `Bandeira: ${CARD_BRANDS[brand].name}.` : 'Bandeira não identificada.',
	}
}

/** Luhn check plus brand and length rules. Validates the format only; it never checks a real account. */
export default function CardValidator() {
	return (
		<DocumentValidator
			label="cartão"
			placeholder="Ex: 4111 1111 1111 1111"
			digits={[13, 19] as const}
			mask={MASKS.card}
			validate={validate}
		/>
	)
}
