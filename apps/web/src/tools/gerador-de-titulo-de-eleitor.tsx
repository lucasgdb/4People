'use client'

import { generateVoterId, VOTER_UFS } from '@/lib/algorithms/documents'
import { DocumentGenerator } from './_shared/document-generator'

const ABROAD_CODE = '28'

/** Alphabetical by state, "Exterior" last (object keys like "10" come before "01" in JS). */
const STATES = [
	{ value: 'any', label: 'Qualquer estado' },
	...Object.entries(VOTER_UFS)
		.map(([code, uf]) => ({ value: code, label: uf }))
		.sort((first, second) => {
			if (first.value === ABROAD_CODE) return 1
			if (second.value === ABROAD_CODE) return -1
			return first.label.localeCompare(second.label, 'pt-BR')
		}),
]

/** Voter ID with the state code in digits 9–10 and both check digits (SP/MG rule included). */
export default function VoterIdGenerator() {
	return (
		<DocumentGenerator
			label="título"
			plural="títulos"
			filename="titulo-eleitor.txt"
			generate={({ state }) => generateVoterId({ uf: state })}
			examples={{ punctuated: '0000 0000 0000', digits: '000000000000', separators: 'Com espaços' }}
			states={{
				label: 'Estado de emissão',
				description: 'O estado fica nos dígitos 9 e 10 do título.',
				options: STATES,
			}}
		/>
	)
}
