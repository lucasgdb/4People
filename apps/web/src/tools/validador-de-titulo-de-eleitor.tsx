'use client'

import { validateVoterId } from '@/lib/algorithms/documents'
import { MASKS } from '@/lib/masks'
import { DocumentValidator } from './_shared/document-validator'

const validate = (value: string) => {
	const { state, ...result } = validateVoterId(value)
	return { ...result, detail: state ? `Emitido em: ${state}.` : null }
}

/** Voter ID check digits, including the SP/MG rule, and the state encoded in digits 9–10. */
export default function VoterIdValidator() {
	return (
		<DocumentValidator
			label="título de eleitor"
			placeholder="Ex: 5464 0310 0175"
			digits={12}
			mask={MASKS.voterId}
			validate={validate}
		/>
	)
}
