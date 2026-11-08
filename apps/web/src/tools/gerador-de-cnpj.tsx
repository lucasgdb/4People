'use client'

import { generateCNPJ } from '@/lib/algorithms/documents'
import { DocumentGenerator } from './_shared/document-generator'

/** Numeric CNPJs, or the alphanumeric format the Receita Federal issues since July 2026. */
export default function CnpjGenerator() {
	return (
		<DocumentGenerator
			label="CNPJ"
			plural="CNPJs"
			filename="cnpj.txt"
			generate={({ variant }) => generateCNPJ({ alphanumeric: variant === 'alphanumeric' })}
			variants={{
				label: 'Tipo de CNPJ',
				options: [
					{ value: 'numeric', label: 'Numérico', hint: '11.222.333/0001-81' },
					{ value: 'alphanumeric', label: 'Alfanumérico', hint: '12.ABC.345/01DE-35' },
				],
			}}
			examples={{
				punctuated: '00.000.000/0001-00',
				digits: '00000000000100',
				plain: 'Sem pontuação',
			}}
		/>
	)
}
