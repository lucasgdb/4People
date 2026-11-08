'use client'

import { Alert, Badge, DataList } from '@4people/ui'
import { useStore } from '@tanstack/react-form'
import { CircleX } from 'lucide-react'
import { useDeferredValue, useId, useMemo } from 'react'
import { useAppForm } from '@/components/form/form'
import {
	compressIPv6,
	expandIPv6,
	ipv6ReverseName,
	ipv6ReverseZone,
	ipv6Subnet,
	ipv6Type,
	parseIPv6WithPrefix,
	scientificBigInt,
	splitIPv6,
} from '@/lib/algorithms/network'
import { formatBigInt } from '@/lib/format'
import { CopyRows } from './_shared/copy-rows'
import { FormCard, ResultCard, ToolLayout } from './_shared/tool-layout'

const DEFAULTS = { address: '2001:db8:abcd:12::1/48', prefix: '', splitPrefix: '64' }
const SHOWN = 16

const SCOPE_TONE = { private: 'success', public: 'primary', special: 'neutral' } as const

type Split = { prefix: number; count: bigint; subnets: bigint[] }
type Calculation =
	| { ok: false; error: string }
	| {
			ok: true
			subnet: ReturnType<typeof ipv6Subnet>
			split: Split | null
			splitError: string | null
	  }

function calculate(values: typeof DEFAULTS): Calculation | null {
	if (!values.address.trim()) return null
	let parsed: { value: bigint; prefix: number }
	try {
		parsed = parseIPv6WithPrefix(values.address, values.prefix)
	} catch (error) {
		return { ok: false, error: (error as Error).message }
	}
	const subnet = ipv6Subnet(parsed.value, parsed.prefix)
	const raw = values.splitPrefix.trim().replace(/^\//, '')
	if (!raw) return { ok: true, subnet, split: null, splitError: null }
	try {
		if (!/^\d{1,3}$/.test(raw)) throw new Error('O novo prefixo é um número, como 64.')
		const newPrefix = Number(raw)
		return {
			ok: true,
			subnet,
			split: { prefix: newPrefix, ...splitIPv6(parsed.value, parsed.prefix, newPrefix, SHOWN) },
			splitError: null,
		}
	} catch (error) {
		return { ok: true, subnet, split: null, splitError: (error as Error).message }
	}
}

/** IPv6 prefix math with exact 128-bit counts: network, range, forms, type, reverse DNS and subnets. */
export default function CalculadoraDeSubRedeIpv6() {
	const form = useAppForm({ defaultValues: DEFAULTS })
	const values = useDeferredValue(useStore(form.store, (state) => state.values))
	const result = useMemo(() => calculate(values), [values])
	const splitTitle = useId()

	const rows =
		result?.ok === true
			? [
					{
						label: 'Rede (CIDR)',
						value: `${compressIPv6(result.subnet.network)}/${result.subnet.prefix}`,
					},
					{ label: 'Primeiro endereço', value: compressIPv6(result.subnet.network) },
					{ label: 'Último endereço', value: compressIPv6(result.subnet.last) },
					{ label: 'Endereço compactado (RFC 5952)', value: compressIPv6(result.subnet.value) },
					{ label: 'Endereço expandido', value: expandIPv6(result.subnet.value) },
					{ label: 'Rede expandida', value: expandIPv6(result.subnet.network) },
					{ label: 'DNS reverso do endereço (PTR)', value: ipv6ReverseName(result.subnet.value) },
					{
						label: 'Zona reversa do prefixo',
						value: ipv6ReverseZone(result.subnet.network, result.subnet.prefix),
					},
				]
			: []

	return (
		<div className="flex flex-col gap-5">
			<ToolLayout>
				<FormCard
					onSubmit={() => undefined}
					actions={<p className="text-fg-muted text-[0.8125rem]">Atualiza enquanto você digita.</p>}
				>
					<form.AppField name="address">
						{(field) => (
							<field.TextField
								label="Endereço IPv6"
								description="Pode incluir o prefixo, como 2001:db8::1/64."
								placeholder="Ex.: 2001:db8:abcd:12::1/48"
								inputClassName="font-mono"
							/>
						)}
					</form.AppField>
					<form.AppField name="prefix">
						{(field) => (
							<field.TextField
								label="Prefixo"
								description="Só é usado se o endereço não tiver /prefixo."
								placeholder="Ex.: /64"
								inputMode="numeric"
								inputClassName="font-mono"
							/>
						)}
					</form.AppField>
					<form.AppField name="splitPrefix">
						{(field) => (
							<field.TextField
								label="Dividir em sub-redes de"
								description="Novo prefixo, maior que o atual. Deixe vazio para não dividir."
								placeholder="Ex.: /64"
								inputMode="numeric"
								inputClassName="font-mono"
							/>
						)}
					</form.AppField>
				</FormCard>
				<ResultCard
					empty={!result}
					emptyText="Digite um IPv6 com prefixo e o resultado aparece aqui."
					copyText={
						rows.length ? rows.map((row) => `${row.label}: ${row.value}`).join('\n') : undefined
					}
					onClear={() => form.reset({ address: '', prefix: '', splitPrefix: '' })}
				>
					{result?.ok === false ? (
						<Alert tone="danger">
							<CircleX />
							{result.error}
						</Alert>
					) : result?.ok ? (
						<>
							<TypeBadges value={result.subnet.value} />
							<DataList
								columns={1}
								items={[
									{
										label: 'Total de endereços',
										value: (
											<span translate="no" className="text-base break-all">
												{formatBigInt(result.subnet.total)}
											</span>
										),
										hint: `2^${128 - result.subnet.prefix}${
											result.subnet.total >= 1_000_000n
												? ` ≈ ${scientificBigInt(result.subnet.total)}`
												: ''
										}`,
									},
								]}
							/>
							<CopyRows code rows={rows} />
						</>
					) : null}
				</ResultCard>
			</ToolLayout>
			{result?.ok && (result.split || result.splitError) ? (
				<section
					aria-labelledby={splitTitle}
					className="rounded-panel border-border bg-surface flex flex-col gap-4 border p-6 sm:p-7"
				>
					<h2 id={splitTitle} className="text-fg text-lg font-bold">
						Sub-redes
					</h2>
					<div aria-live="polite" className="flex flex-col gap-4">
						{result.splitError ? (
							<Alert tone="danger">
								<CircleX />
								{result.splitError}
							</Alert>
						) : result.split ? (
							<>
								<p className="text-fg-muted text-[0.9375rem]">
									A /{result.subnet.prefix} tem{' '}
									<strong className="text-fg tabular">{formatBigInt(result.split.count)}</strong>{' '}
									sub-redes /{result.split.prefix}
									{result.split.count > BigInt(result.split.subnets.length)
										? `; estas são as primeiras ${result.split.subnets.length}.`
										: '.'}
								</p>
								<ol
									translate="no"
									className="rounded-control bg-surface-muted grid gap-x-6 gap-y-1.5 px-5 py-4 font-mono text-[0.875rem] sm:grid-cols-2"
								>
									{result.split.subnets.map((network, index) => (
										<li key={network.toString()} className="flex gap-3 break-all">
											<span className="text-fg-muted tabular w-6 shrink-0 text-right">
												{index + 1}
											</span>
											<span className="text-fg">
												{compressIPv6(network)}/{result.split?.prefix}
											</span>
										</li>
									))}
								</ol>
							</>
						) : null}
					</div>
				</section>
			) : null}
		</div>
	)
}

function TypeBadges({ value }: { value: bigint }) {
	const type = ipv6Type(value)
	return (
		<div className="flex flex-wrap items-center gap-2">
			<Badge tone={SCOPE_TONE[type.scope]}>{type.label}</Badge>
			{type.range ? (
				<span translate="no" className="text-fg-muted font-mono text-[0.8125rem]">
					{type.range}
				</span>
			) : null}
		</div>
	)
}
