'use client'

import { Alert, DataList } from '@4people/ui'
import { useMutation } from '@tanstack/react-query'
import { CircleX, LoaderCircle } from 'lucide-react'
import { z } from 'zod'
import { useToolForm } from '@/components/form/use-tool-form'
import { MASKS } from '@/lib/masks'
import { FormCard, ResultCard, ToolLayout } from './_shared/tool-layout'

const addressSchema = z.object({
	cep: z.string(),
	state: z.string(),
	city: z.string(),
	neighborhood: z.string().nullish(),
	street: z.string().nullish(),
})

type Address = z.infer<typeof addressSchema>

async function fetchCep(cep: string): Promise<Address> {
	const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`)
	if (response.status === 404)
		throw new Error(
			'CEP não encontrado. Confira os 8 dígitos ou procure o CEP no site dos Correios.',
		)
	if (!response.ok) throw new Error('Não foi possível consultar o CEP agora. Tente novamente.')
	return addressSchema.parse(await response.json())
}

const cepFormSchema = z.object({
	cep: z
		.string()
		.trim()
		.transform((cep) => cep.replace(/\D/g, ''))
		.pipe(z.string().length(8, 'O CEP deve ter 8 dígitos.')),
})

function formatCep(cep: string): string {
	return cep.replace(/^(\d{5})(\d{3})$/, '$1-$2')
}

function addressText(address: Address): string {
	return [
		`CEP: ${address.cep}`,
		address.street && `Rua: ${address.street}`,
		address.neighborhood && `Bairro: ${address.neighborhood}`,
		`Cidade: ${address.city}`,
		`Estado: ${address.state}`,
	]
		.filter(Boolean)
		.join('\n')
}

/** Address of a CEP from BrasilAPI (Correios and other public sources). */
export default function SearchCep() {
	const lookup = useMutation({ mutationKey: ['cep'], mutationFn: fetchCep })
	const form = useToolForm({
		schema: cepFormSchema,
		defaultValues: { cep: '' },
		onSubmit: async ({ cep }) => {
			// The error is shown from the mutation state, so the rejection is not rethrown.
			await lookup.mutateAsync(cep).catch(() => undefined)
		},
	})

	const address = lookup.data

	return (
		<ToolLayout>
			<FormCard
				onSubmit={() => form.handleSubmit()}
				actions={
					<form.AppForm>
						<form.SubmitButton>
							{lookup.isPending ? <LoaderCircle className="animate-spin" /> : null}
							Buscar CEP
						</form.SubmitButton>
					</form.AppForm>
				}
			>
				<form.AppField name="cep">
					{(field) => (
						<field.TextField
							label="CEP"
							placeholder="Ex: 01310-200"
							mask={MASKS.cep}
							autoComplete="postal-code"
							enterKeyHint="search"
						/>
					)}
				</form.AppField>
			</FormCard>
			<ResultCard
				empty={!address && !lookup.isError}
				emptyText={lookup.isPending ? 'Buscando…' : 'Digite um CEP para consultar o endereço.'}
				copyText={address ? addressText(address) : ''}
				downloadName="cep.txt"
				onClear={() => {
					lookup.reset()
					form.reset()
				}}
			>
				{lookup.isError ? (
					<Alert tone="danger">
						<CircleX />
						{lookup.error.message}
					</Alert>
				) : address ? (
					<DataList
						items={[
							{ label: 'CEP', value: formatCep(address.cep) },
							{ label: 'Estado', value: address.state },
							{ label: 'Cidade', value: address.city },
							{ label: 'Bairro', value: address.neighborhood || '—' },
							{ label: 'Rua', value: address.street || '—' },
						]}
					/>
				) : null}
			</ResultCard>
		</ToolLayout>
	)
}
