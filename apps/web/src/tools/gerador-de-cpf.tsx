'use client'

import { generateCPF } from '@/lib/algorithms/documents'
import { DocumentGenerator } from './_shared/document-generator'

/** The 9th CPF digit is the fiscal region, so the state of issue can be chosen. */
const STATES = [
	['any', 'Qualquer estado'],
	['AC', 'Acre'],
	['AL', 'Alagoas'],
	['AM', 'Amazonas'],
	['AP', 'Amapá'],
	['BA', 'Bahia'],
	['CE', 'Ceará'],
	['DF', 'Distrito Federal'],
	['ES', 'Espírito Santo'],
	['GO', 'Goiás'],
	['MA', 'Maranhão'],
	['MG', 'Minas Gerais'],
	['MS', 'Mato Grosso do Sul'],
	['MT', 'Mato Grosso'],
	['PA', 'Pará'],
	['PB', 'Paraíba'],
	['PE', 'Pernambuco'],
	['PI', 'Piauí'],
	['PR', 'Paraná'],
	['RJ', 'Rio de Janeiro'],
	['RN', 'Rio Grande do Norte'],
	['RO', 'Rondônia'],
	['RR', 'Roraima'],
	['RS', 'Rio Grande do Sul'],
	['SC', 'Santa Catarina'],
	['SE', 'Sergipe'],
	['SP', 'São Paulo'],
	['TO', 'Tocantins'],
].map(([value = '', label = '']) => ({ value, label }))

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
				options: STATES,
			}}
		/>
	)
}
