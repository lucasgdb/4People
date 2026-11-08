'use client'

import {
	Alert,
	Badge,
	DataList,
	Table,
	TableBody,
	TableCard,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@4people/ui'
import { useStore } from '@tanstack/react-form'
import { CircleX } from 'lucide-react'
import { useDeferredValue, useId, useMemo } from 'react'
import { useAppForm } from '@/components/form/form'
import {
	formatIPv4,
	type IPv4Subnet,
	ipv4Class,
	ipv4Subnet,
	ipv4Type,
	parseIPv4WithPrefix,
	prefixForHosts,
	prefixForSubnetCount,
	splitBinary,
	splitIPv4,
} from '@/lib/algorithms/network'
import { formatNumber } from '@/lib/format'
import { CopyRows } from './_shared/copy-rows'
import { FormCard, ResultCard, ToolLayout } from './_shared/tool-layout'

type SplitMode = 'count' | 'hosts'

const SPLIT_OPTIONS = [
	{ value: 'count', label: 'Em N sub-redes', hint: 'Ex.: 4 sub-redes iguais' },
	{ value: 'hosts', label: 'Por hosts em cada sub-rede', hint: 'Reserva rede e broadcast' },
] as const

const DEFAULTS = { ip: '192.168.1.10/24', mask: '', mode: 'count' as SplitMode, amount: '4' }
const MAX_SPLIT_ROWS = 256

const SCOPE_TONE = { private: 'success', public: 'primary', special: 'neutral' } as const
const SCOPE_LABEL = { private: 'Privado', public: 'Público', special: 'Uso especial' } as const

type FormValues = typeof DEFAULTS
type Split = { prefix: number; count: number; subnets: IPv4Subnet[] }
type SplitOutcome = { split: Split | null; splitError: string | null }
type Calculation = { ok: false; error: string } | ({ ok: true; subnet: IPv4Subnet } & SplitOutcome)

function splitSubnet(ip: number, prefix: number, values: FormValues): SplitOutcome {
	const amountText = values.amount.trim()
	if (!amountText) return { split: null, splitError: null }
	const amount = Number(amountText)
	try {
		if (!Number.isInteger(amount)) throw new Error('Use um número inteiro para dividir.')
		const newPrefix =
			values.mode === 'count'
				? prefixForSubnetCount(prefix, amount)
				: prefixForHosts(prefix, amount)
		const split = { prefix: newPrefix, ...splitIPv4(ip, prefix, newPrefix, MAX_SPLIT_ROWS) }
		return { split, splitError: null }
	} catch (error) {
		return { split: null, splitError: (error as Error).message }
	}
}

function calculate(values: FormValues): Calculation | null {
	if (!values.ip.trim()) return null
	let parsed: { ip: number; prefix: number }
	try {
		parsed = parseIPv4WithPrefix(values.ip, values.mask)
	} catch (error) {
		return { ok: false, error: (error as Error).message }
	}
	const subnet = ipv4Subnet(parsed.ip, parsed.prefix)
	return { ok: true, subnet, ...splitSubnet(parsed.ip, parsed.prefix, values) }
}

function summaryText(subnet: IPv4Subnet): string {
	return [
		`Rede: ${formatIPv4(subnet.network)}/${subnet.prefix}`,
		`Máscara: ${formatIPv4(subnet.netmask)}`,
		`Wildcard: ${formatIPv4(subnet.wildcard)}`,
		`Broadcast: ${formatIPv4(subnet.broadcast)}`,
		`Primeiro host: ${formatIPv4(subnet.firstHost)}`,
		`Último host: ${formatIPv4(subnet.lastHost)}`,
		`Hosts utilizáveis: ${formatNumber(subnet.usableHosts)}`,
	].join('\n')
}

function BinaryRow({ label, value, prefix }: { label: string; value: number; prefix: number }) {
	const [networkBits, hostBits] = splitBinary(value, prefix)
	return (
		<li className="flex flex-col gap-0.5">
			<span className="text-fg-muted text-[0.8125rem]">{label}</span>
			<span translate="no" className="font-mono text-[0.875rem] break-all">
				<span className="text-fg font-semibold">{networkBits}</span>
				{networkBits && hostBits ? <span className="text-accent px-1">|</span> : null}
				<span className="text-fg-muted">{hostBits}</span>
			</span>
		</li>
	)
}

/** Subnet math for an IPv4 address: network, broadcast, host range, masks, binary and a split table. */
export default function CalculadoraDeSubRedeIpv4() {
	const form = useAppForm({ defaultValues: DEFAULTS })
	const values = useDeferredValue(useStore(form.store, (state) => state.values))
	const result = useMemo(() => calculate(values), [values])
	const isCountMode = values.mode === 'count'

	return (
		<div className="flex flex-col gap-5">
			<ToolLayout>
				<FormCard
					onSubmit={() => undefined}
					actions={<p className="text-fg-muted text-[0.8125rem]">Atualiza enquanto você digita.</p>}
				>
					<form.AppField name="ip">
						{(field) => (
							<field.TextField
								label="Endereço IPv4"
								description="Pode incluir o prefixo: 192.168.1.10/24 ou 192.168.1.10 255.255.255.0."
								placeholder="Ex.: 192.168.1.10/24"
								inputClassName="font-mono"
							/>
						)}
					</form.AppField>
					<form.AppField name="mask">
						{(field) => (
							<field.TextField
								label="Máscara ou prefixo"
								description="Só é usado se o endereço não tiver /prefixo."
								placeholder="Ex.: /24 ou 255.255.255.0"
								inputClassName="font-mono"
							/>
						)}
					</form.AppField>
					<form.AppField name="mode">
						{(field) => <field.RadioField label="Dividir em sub-redes" options={SPLIT_OPTIONS} />}
					</form.AppField>
					<form.AppField name="amount">
						{(field) => (
							<field.NumberField
								label={isCountMode ? 'Quantidade de sub-redes' : 'Hosts por sub-rede'}
								placeholder={isCountMode ? 'Ex.: 4' : 'Ex.: 50'}
								description="Deixe vazio para não dividir."
								integer
								min={1}
							/>
						)}
					</form.AppField>
				</FormCard>
				<ResultCard
					empty={!result}
					emptyText="Digite um IPv4 com prefixo e o resultado aparece aqui."
					copyText={result?.ok ? summaryText(result.subnet) : undefined}
					onClear={() => form.reset({ ...DEFAULTS, ip: '', amount: '' })}
				>
					{result?.ok === false ? (
						<Alert tone="danger">
							<CircleX />
							{result.error}
						</Alert>
					) : null}
					{result?.ok ? <SubnetResult subnet={result.subnet} /> : null}
				</ResultCard>
			</ToolLayout>
			{result?.ok && (result.split || result.splitError) ? (
				<SplitSection
					split={result.split}
					error={result.splitError}
					prefix={result.subnet.prefix}
				/>
			) : null}
		</div>
	)
}

function pointToPointNote(prefix: number): string | null {
	if (prefix === 31)
		return 'Uma /31 é um enlace ponto a ponto (RFC 3021): os dois endereços são hosts, sem rede nem broadcast.'
	if (prefix === 32) return 'Uma /32 representa um único host.'
	return null
}

function SubnetResult({ subnet }: { subnet: IPv4Subnet }) {
	const type = ipv4Type(subnet.ip)
	const ipClass = ipv4Class(subnet.ip)
	const note = pointToPointNote(subnet.prefix)
	return (
		<>
			<div className="flex flex-wrap items-center gap-2">
				<Badge tone={SCOPE_TONE[type.scope]}>{SCOPE_LABEL[type.scope]}</Badge>
				{type.scope !== 'public' ? <Badge>{type.label}</Badge> : null}
				<Badge>Classe {ipClass}</Badge>
				{type.range ? (
					<span className="text-fg-muted font-mono text-[0.8125rem]" translate="no">
						{type.range}
					</span>
				) : null}
			</div>
			<DataList
				items={[
					{ label: 'Hosts utilizáveis', value: formatNumber(subnet.usableHosts) },
					{ label: 'Total de endereços', value: formatNumber(subnet.totalAddresses) },
				]}
			/>
			<CopyRows
				code
				rows={[
					{ label: 'Rede (CIDR)', value: `${formatIPv4(subnet.network)}/${subnet.prefix}` },
					{ label: 'Máscara', value: formatIPv4(subnet.netmask) },
					{ label: 'Wildcard (máscara invertida)', value: formatIPv4(subnet.wildcard) },
					{ label: 'Primeiro host', value: formatIPv4(subnet.firstHost) },
					{ label: 'Último host', value: formatIPv4(subnet.lastHost) },
					{ label: 'Broadcast', value: formatIPv4(subnet.broadcast) },
				]}
			/>
			{note ? <p className="text-fg-muted text-[0.8125rem]">{note}</p> : null}
			<div className="flex flex-col gap-2">
				<h3 className="text-fg text-sm font-semibold">Em binário</h3>
				<p className="text-fg-muted text-[0.8125rem]">
					Antes da barra, os {subnet.prefix} bits de rede; depois, os {32 - subnet.prefix} bits de
					host.
				</p>
				<ul className="rounded-control bg-surface-muted flex flex-col gap-2 px-5 py-4">
					<BinaryRow label="Endereço" value={subnet.ip} prefix={subnet.prefix} />
					<BinaryRow label="Máscara" value={subnet.netmask} prefix={subnet.prefix} />
					<BinaryRow label="Rede" value={subnet.network} prefix={subnet.prefix} />
					<BinaryRow label="Broadcast" value={subnet.broadcast} prefix={subnet.prefix} />
				</ul>
			</div>
		</>
	)
}

function SplitSection({
	split,
	error,
	prefix,
}: {
	split: Split | null
	error: string | null
	prefix: number
}) {
	const titleId = useId()
	return (
		<section
			aria-labelledby={titleId}
			className="rounded-panel border-border bg-surface flex flex-col gap-4 border p-6 sm:p-7"
		>
			<h2 id={titleId} className="text-fg text-lg font-bold">
				Sub-redes
			</h2>
			<div aria-live="polite" className="flex flex-col gap-4">
				{error ? (
					<Alert tone="danger">
						<CircleX />
						{error}
					</Alert>
				) : null}
				{split ? <SplitTable split={split} prefix={prefix} /> : null}
			</div>
		</section>
	)
}

function SplitTable({ split, prefix }: { split: Split; prefix: number }) {
	const hostsPerSubnet = ipv4Subnet(0, split.prefix).usableHosts
	const isTruncated = split.count > split.subnets.length
	return (
		<TableCard
			label="Tabela de sub-redes"
			maxHeight="32rem"
			toolbar={
				<p className="text-fg-muted text-[0.9375rem]">
					A /{prefix} dividida em{' '}
					<strong className="text-fg tabular">{formatNumber(split.count)}</strong> sub-redes /
					{split.prefix}, com{' '}
					<strong className="text-fg tabular">{formatNumber(hostsPerSubnet)}</strong> hosts
					utilizáveis cada.
					{isTruncated ? ` Mostrando as primeiras ${formatNumber(split.subnets.length)}.` : ''}
				</p>
			}
		>
			<Table>
				<TableHeader>
					<tr>
						<TableHead numeric>#</TableHead>
						<TableHead>Rede</TableHead>
						<TableHead>Primeiro host</TableHead>
						<TableHead>Último host</TableHead>
						<TableHead>Broadcast</TableHead>
					</tr>
				</TableHeader>
				<TableBody translate="no" className="font-mono text-[0.875rem]">
					{split.subnets.map((subnet, index) => (
						<TableRow key={subnet.network}>
							<TableCell numeric className="text-fg-muted">
								{index + 1}
							</TableCell>
							<TableCell className="whitespace-nowrap">
								{formatIPv4(subnet.network)}/{subnet.prefix}
							</TableCell>
							<TableCell className="whitespace-nowrap">{formatIPv4(subnet.firstHost)}</TableCell>
							<TableCell className="whitespace-nowrap">{formatIPv4(subnet.lastHost)}</TableCell>
							<TableCell className="whitespace-nowrap">{formatIPv4(subnet.broadcast)}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableCard>
	)
}
