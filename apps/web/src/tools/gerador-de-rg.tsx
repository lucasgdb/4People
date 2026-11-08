'use client'

import { generateRG } from '@/lib/algorithms/documents'
import { DocumentGenerator } from './_shared/document-generator'

export default function RgGenerator() {
	return (
		<DocumentGenerator
			label="RG"
			plural="RGs"
			filename="rg.txt"
			generate={() => generateRG()}
			examples={{ punctuated: '00.000.000-0', digits: '000000000' }}
		/>
	)
}
