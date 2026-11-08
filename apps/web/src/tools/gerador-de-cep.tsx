'use client'

import { generateCEP } from '@/lib/algorithms/contact'
import { DocumentGenerator } from './_shared/document-generator'
import { STATE_OPTIONS } from './_shared/states'

/** CEPs inside each state's Correios range, so the state of the address can be chosen. */
export default function CepGenerator() {
	return (
		<DocumentGenerator
			label="CEP"
			plural="CEPs"
			filename="cep.txt"
			generate={({ state }) => generateCEP({ state })}
			examples={{ punctuated: '00000-000', digits: '00000000', separators: 'Com hífen' }}
			states={{
				label: 'Estado',
				description: 'Os primeiros dígitos do CEP mostram a região e o estado.',
				options: STATE_OPTIONS,
			}}
			note="Use só para testes. O CEP fica na faixa do estado, mas pode não corresponder a uma rua de verdade."
		/>
	)
}
