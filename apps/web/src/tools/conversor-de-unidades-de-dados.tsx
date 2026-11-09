'use client'

import { Alert } from '@4people/ui'
import { useStore } from '@tanstack/react-form'
import { CircleX } from 'lucide-react'
import { useAppForm } from '@/components/form/form'
import {
	convertAll,
	DATA_UNITS,
	type DataUnit,
	formatSignificant,
	parseNumber,
	RATE_UNITS,
} from '@/lib/algorithms/capacity'
import { CopyRows } from './_shared/copy-rows'
import { FormCard, ResultCard, ToolLayout } from './_shared/tool-layout'

type Kind = 'size' | 'rate'

const KINDS = [
	{ value: 'size', label: 'Tamanho', hint: 'bit, byte, MB, GiB…' },
	{ value: 'rate', label: 'Taxa de transferência', hint: 'Mbps, MB/s, MiB/s…' },
] as const

function toOptions(units: readonly DataUnit[]) {
	return units.map((unit) => ({ value: unit.id, label: `${unit.symbol} (${unit.name})` }))
}

const SIZE_OPTIONS = toOptions(DATA_UNITS)
const RATE_OPTIONS = toOptions(RATE_UNITS)

const SYSTEM_GROUPS = [
	{ system: 'bit', title: 'Em bits (base 1000)' },
	{ system: 'decimal', title: 'Bytes decimais, SI (base 1000)' },
	{ system: 'binary', title: 'Bytes binários, IEC (base 1024)' },
] as const

const DEFAULTS = { kind: 'size' as Kind, value: '1', sizeUnit: 'GB', rateUnit: 'Mbps' }

type Conversion = { unit: DataUnit; value: number }

function formatConversion(conversion: Conversion): string {
	return `${formatSignificant(conversion.value)} ${conversion.unit.symbol}`
}

/** Bits and bytes in every decimal and binary unit at once, plus transfer rates. */
export default function ConversorDeUnidadesDeDados() {
	const form = useAppForm({ defaultValues: DEFAULTS })
	const values = useStore(form.store, (state) => state.values)
	const isSize = values.kind === 'size'
	const units = isSize ? DATA_UNITS : RATE_UNITS
	const unitId = isSize ? values.sizeUnit : values.rateUnit
	const amount = parseNumber(values.value)
	const isValidAmount = amount !== null && amount >= 0
	const isInvalid = values.value.trim() !== '' && !isValidAmount
	const conversions = isValidAmount ? convertAll(amount, unitId, units) : []

	return (
		<ToolLayout>
			<FormCard
				onSubmit={() => undefined}
				actions={<p className="text-fg-muted text-[0.8125rem]">Atualiza enquanto você digita.</p>}
			>
				<form.AppField name="kind">
					{(field) => <field.RadioField label="Converter" options={KINDS} />}
				</form.AppField>
				<div className="grid grid-cols-[1fr_13rem] gap-4">
					<form.AppField name="value">
						{(field) => <field.NumberField label="Valor" placeholder="Ex.: 1,5" min={0} />}
					</form.AppField>
					{isSize ? (
						<form.AppField name="sizeUnit">
							{(field) => <field.SelectField label="Unidade" options={SIZE_OPTIONS} />}
						</form.AppField>
					) : (
						<form.AppField name="rateUnit">
							{(field) => <field.SelectField label="Unidade" options={RATE_OPTIONS} />}
						</form.AppField>
					)}
				</div>
				<div className="rounded-control bg-surface-muted text-fg-muted flex flex-col gap-2 px-6 py-4 text-[0.875rem] leading-relaxed">
					<p>
						<strong className="text-fg">1000 ou 1024?</strong> No SI, quilo, mega e giga são
						potências de 1000: 1 kB = 1.000 bytes e 1 GB = 1.000.000.000 bytes. É assim que
						fabricantes de discos, provedores e o macOS contam.
					</p>
					<p>
						Os prefixos binários da IEC usam 1024: 1 KiB = 1.024 bytes e 1 GiB = 1.073.741.824
						bytes. O Windows calcula assim, mas escreve “GB”; por isso um disco de 1 TB aparece com
						uns 931 “GB”.
					</p>
					<p>
						Um byte tem 8 bits. Velocidades de internet vêm em bits (Mbps): divida por 8 para ter
						bytes por segundo.
					</p>
				</div>
			</FormCard>
			<ResultCard
				title="Conversões"
				empty={conversions.length === 0 && !isInvalid}
				emptyText="Digite um valor e ele aparece em todas as unidades."
				copyText={conversions.length ? conversions.map(formatConversion).join('\n') : undefined}
				onClear={() => form.setFieldValue('value', '')}
			>
				{isInvalid ? (
					<Alert tone="danger">
						<CircleX />
						Digite um número positivo, como 1,5 ou 1024.
					</Alert>
				) : (
					SYSTEM_GROUPS.map((group) => {
						const groupConversions = conversions.filter(
							(conversion) => conversion.unit.system === group.system,
						)
						if (groupConversions.length === 0) return null
						return (
							<div key={group.system} className="flex flex-col gap-2">
								<h3 className="text-fg text-sm font-semibold">{group.title}</h3>
								<CopyRows
									rows={groupConversions.map((conversion) => ({
										label: conversion.unit.name,
										value: formatConversion(conversion),
									}))}
								/>
							</div>
						)
					})
				)}
			</ResultCard>
		</ToolLayout>
	)
}
