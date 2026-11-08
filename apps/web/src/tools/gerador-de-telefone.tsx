'use client'

import { generatePhone, type PhoneType } from '@/lib/algorithms/contact'
import { pick } from '@/lib/algorithms/random'
import { DocumentGenerator } from './_shared/document-generator'
import { STATE_OPTIONS } from './_shared/states'

const PHONE_TYPES: readonly PhoneType[] = ['mobile', 'landline']

/** Mobile or landline numbers with a real DDD of the chosen state. */
export default function PhoneGenerator() {
	return (
		<DocumentGenerator
			label="telefone"
			plural="telefones"
			filename="telefone.txt"
			generate={({ state, variant }) =>
				generatePhone({
					state,
					type: variant === 'mobile' || variant === 'landline' ? variant : pick(PHONE_TYPES),
				})
			}
			examples={{
				punctuated: '(00) 00000-0000',
				digits: '00000000000',
				separators: 'Com máscara',
			}}
			variants={{
				label: 'Tipo',
				options: [
					{ value: 'mobile', label: 'Celular', hint: '(11) 98765-4321' },
					{ value: 'landline', label: 'Fixo', hint: '(11) 3456-7890' },
					{ value: 'both', label: 'Os dois', hint: 'Celular e fixo misturados' },
				],
			}}
			states={{
				label: 'Estado do DDD',
				description: 'O DDD é sorteado entre os códigos de área do estado.',
				options: STATE_OPTIONS,
			}}
			note="Use só para testes. O DDD e o formato são reais, mas o número é sorteado e pode existir."
		/>
	)
}
