'use client'

import { generatePIS } from '@/lib/algorithms/documents'
import { DocumentGenerator } from './_shared/document-generator'

export default function PisGenerator() {
	return (
		<DocumentGenerator
			label="PIS"
			plural="PIS"
			filename="pis.txt"
			generate={() => generatePIS()}
			examples={{ punctuated: '000.00000.00-0', digits: '00000000000' }}
		/>
	)
}
