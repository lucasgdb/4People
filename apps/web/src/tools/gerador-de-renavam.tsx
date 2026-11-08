'use client'

import { generateRENAVAM } from '@/lib/algorithms/documents'
import { DocumentGenerator } from './_shared/document-generator'

export default function RenavamGenerator() {
	return (
		<DocumentGenerator
			label="RENAVAM"
			plural="RENAVAMs"
			filename="renavam.txt"
			generate={() => generateRENAVAM()}
		/>
	)
}
