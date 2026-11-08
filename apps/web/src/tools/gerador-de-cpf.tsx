'use client'

import { generateCPF } from '@/lib/algorithms/documents'
import { DocumentGenerator } from './_shared/document-generator'
import { STATE_OPTIONS } from './_shared/states'

/** The 9th CPF digit is the fiscal region, so the state of issue can be chosen. */
export default function CpfGenerator() {
	return (
		<DocumentGenerator
			label="CPF"
			plural="CPFs"
			filename="cpf.txt"
			generate={({ state }) => generateCPF({ state })}
			examples={{ punctuated: '000.000.000-00', digits: '00000000000' }}
			states={{
				label: 'Estado de emissão',
				description: 'O 9º dígito do CPF mostra a região onde ele foi emitido.',
				options: STATE_OPTIONS,
			}}
		/>
	)
}
