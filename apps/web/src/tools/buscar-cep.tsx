'use client'

import { Alert, DataList } from '@4people/ui'
import { useMutation } from '@tanstack/react-query'
import { CircleX, LoaderCircle } from 'lucide-react'
import { z } from 'zod'
import { useToolForm } from '@/components/form/use-tool-form'
import { MASKS } from '@/lib/masks'
import { FormCard, ResultCard, ToolLayout } from './_shared/tool-layout'

const cepResponse = z.object({
	cep: z.string(),
	state: z.string(),
	city: z.string(),
	neighborhood: z.string().nullish(),
	street: z.string().nullish(),
})

type Address = z.infer<typeof cepResponse>

async function fetchCep(cep: string): Promise<Address> {
	const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`)
	if (response.status === 404)
		throw new Error(
			'CEP não encontrado. Confira os 8 dígitos ou procure o CEP no site dos Correios.',
		)
	if (!response.ok) throw new Error('Não foi possível consultar o CEP agora. Tente novamente.')
	return cepResponse.parse(await response.json())
}

const cepSchema = z.object({
	cep: z
		.string()
		.trim()
		.transform((value) => value.replace(/\D/g, ''))
		.pipe(z.string().length(8, 'O CEP deve ter 8 dígitos.')),
})

/** Address of a CEP from BrasilAPI (Correios and other public sources), via TanStack Query. */
export default function SearchCep() {
	const lookup = useMutation({ mutationKey: ['cep'], mutationFn: fetchCep })
	const form = useToolForm({
		schema: cepSchema,
		defaultValues: { cep: '' },
		onSubmit: ({ cep }) =>
			lookup.mutateAsync(cep).then(
				() => undefined,
				() => undefined,
			),
	})

	const address = lookup.data
	const text = address
		? [
				`CEP: ${address.cep}`,
				address.street && `Rua: ${address.street}`,
				address.neighborhood && `Bairro: ${address.neighborhood}`,
				`Cidade: ${address.city}`,
				`Estado: ${address.state}`,
			]
				.filter(Boolean)
				.join('\n')
		: ''

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
					{(f) => (
						<f.TextField
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
				copyText={text}
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
							{ label: 'CEP', value: address.cep.replace(/^(\d{5})(\d{3})$/, '$1-$2') },
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
