'use client'

import { generateCNPJ } from '@/lib/algorithms/documents'
import { DocumentGenerator } from './_shared/document-generator'

export default function CnpjGenerator() {
	return (
		<DocumentGenerator
			label="CNPJ"
			plural="CNPJs"
			filename="cnpj.txt"
			generate={() => generateCNPJ()}
			examples={{ punctuated: '00.000.000/0001-00', digits: '00000000000100' }}
		/>
	)
}
