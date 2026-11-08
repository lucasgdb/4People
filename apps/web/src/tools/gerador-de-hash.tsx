'use client'

import { useState } from 'react'
import { z } from 'zod'
import { useToolForm } from '@/components/form/use-tool-form'
import { crc32, HASH_ALGORITHMS, hashText, md5 } from '@/lib/algorithms/crypto'
import { type CopyRow, CopyRows } from './_shared/copy-rows'
import { FormCard, ResultCard, ToolLayout } from './_shared/tool-layout'

const schema = z.object({ text: z.string().min(1, 'Digite o texto para calcular o hash.') })

/** MD5, SHA-1/256/384/512 (Web Crypto) and CRC32 of a UTF-8 text, all at once. */
export default function HashGenerator() {
	const [rows, setRows] = useState<CopyRow[] | null>(null)
	const form = useToolForm({
		schema,
		defaultValues: { text: '' },
		onSubmit: async ({ text }) => {
			const digests = await Promise.all(
				HASH_ALGORITHMS.map((algorithm) => hashText(text, algorithm)),
			)
			setRows([
				{ label: 'MD5 (só para checksum)', value: md5(text) },
				...HASH_ALGORITHMS.map((algorithm, index) => ({
					label: algorithm,
					value: digests[index] ?? '',
				})),
				{ label: 'CRC32', value: crc32(text) },
			])
		},
	})

	return (
		<ToolLayout>
			<FormCard
				onSubmit={() => form.handleSubmit()}
				actions={
					<form.AppForm>
						<form.SubmitButton>Calcular hash</form.SubmitButton>
					</form.AppForm>
				}
			>
				<form.AppField name="text">
					{(field) => (
						<field.TextareaField label="Texto" rows={6} placeholder="Ex: minha mensagem" />
					)}
				</form.AppField>
			</FormCard>
			<ResultCard
				empty={!rows}
				emptyText="O hash de cada algoritmo aparece aqui, em hexadecimal."
				onClear={() => {
					setRows(null)
					form.reset()
				}}
			>
				{rows ? <CopyRows rows={rows} code /> : null}
			</ResultCard>
		</ToolLayout>
	)
}
