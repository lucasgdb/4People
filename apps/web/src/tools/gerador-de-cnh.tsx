'use client'

import { generateCNH } from '@/lib/algorithms/documents'
import { DocumentGenerator } from './_shared/document-generator'

export default function CnhGenerator() {
	return (
		<DocumentGenerator
			label="CNH"
			plural="CNHs"
			filename="cnh.txt"
			generate={() => generateCNH()}
		/>
	)
}
