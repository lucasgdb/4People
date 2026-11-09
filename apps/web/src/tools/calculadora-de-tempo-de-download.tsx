'use client'

import {
	Alert,
	CopyButton,
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
import { useAppForm } from '@/components/form/form'
import {
	DATA_UNITS,
	downloadSeconds,
	findUnit,
	formatBitrate,
	formatBytes,
	formatDuration,
	formatHms,
	parseNumber,
	RATE_UNITS,
} from '@/lib/algorithms/capacity'
import { FormCard, OutputValue, ResultCard, ToolLayout } from './_shared/tool-layout'

const SIZE_UNITS = ['B', 'kB', 'MB', 'GB', 'TB', 'KiB', 'MiB', 'GiB', 'TiB'].map((id) => {
	const unit = findUnit(DATA_UNITS, id)
	return { value: id, label: `${unit.symbol} (${unit.name})` }
})
const SPEED_UNITS = ['kbps', 'Mbps', 'Gbps', 'MBps'].map((id) => ({
	value: id,
	label: findUnit(RATE_UNITS, id).symbol,
}))

const COMMON_SPEEDS = [
	{ label: '10 Mbps', bitsPerSecond: 10e6 },
	{ label: '50 Mbps', bitsPerSecond: 50e6 },
	{ label: '100 Mbps', bitsPerSecond: 100e6 },
	{ label: '300 Mbps', bitsPerSecond: 300e6 },
	{ label: '500 Mbps', bitsPerSecond: 500e6 },
	{ label: '1 Gbps', bitsPerSecond: 1e9 },
	{ label: '10 Gbps', bitsPerSecond: 10e9 },
]

const DEFAULTS = { size: '4,7', sizeUnit: 'GB', speed: '100', speedUnit: 'Mbps', overhead: '10' }

type DownloadResult = {
	bytes: number
	bitsPerSecond: number
	overheadPercent: number
	seconds: number
}
type Outcome = { error: string } | DownloadResult | null

function calculate(values: typeof DEFAULTS): Outcome {
	if (!values.size.trim() || !values.speed.trim()) return null
	const size = parseNumber(values.size)
	const speed = parseNumber(values.speed)
	const overheadPercent = values.overhead.trim() ? parseNumber(values.overhead) : 0
	if (size === null || size < 0)
		return { error: 'O tamanho precisa ser um número positivo, como 4,7.' }
	if (speed === null || speed <= 0)
		return { error: 'A velocidade precisa ser um número maior que zero, como 100.' }
	if (overheadPercent === null || overheadPercent < 0 || overheadPercent >= 100)
		return { error: 'A perda vai de 0% a 99%; deixe 0 para o máximo teórico.' }
	const bytes = (size * findUnit(DATA_UNITS, values.sizeUnit).bits) / 8
	const bitsPerSecond = speed * findUnit(RATE_UNITS, values.speedUnit).bits
	const seconds = downloadSeconds(bytes, bitsPerSecond, overheadPercent)
	return { bytes, bitsPerSecond, overheadPercent, seconds }
}

function effectiveBitsPerSecond(result: DownloadResult): number {
	return result.bitsPerSecond * (1 - result.overheadPercent / 100)
}

/** How long a file takes to download at a given speed, with protocol overhead and common speeds. */
export default function CalculadoraDeTempoDeDownload() {
	const form = useAppForm({ defaultValues: DEFAULTS })
	const values = useStore(form.store, (state) => state.values)
	const outcome = calculate(values)
	const result = outcome && 'seconds' in outcome ? outcome : null

	return (
		<ToolLayout>
			<FormCard
				onSubmit={() => undefined}
				actions={<p className="text-fg-muted text-[0.8125rem]">Atualiza enquanto você digita.</p>}
			>
				<div className="grid grid-cols-[1fr_11rem] gap-4">
					<form.AppField name="size">
						{(field) => (
							<field.NumberField label="Tamanho do arquivo" placeholder="Ex.: 4,7" min={0} />
						)}
					</form.AppField>
					<form.AppField name="sizeUnit">
						{(field) => <field.SelectField label="Unidade" options={SIZE_UNITS} />}
					</form.AppField>
				</div>
				<p className="text-fg-muted -mt-2 text-[0.8125rem] leading-relaxed">
					GB é decimal (1 GB = 1.000.000.000 bytes), como nas lojas e nos provedores. GiB é binário
					(1 GiB = 1.073.741.824 bytes), que é o que o Windows mostra como “GB”.
				</p>
				<div className="grid grid-cols-[1fr_8rem] gap-4">
					<form.AppField name="speed">
						{(field) => (
							<field.NumberField
								label="Velocidade da conexão"
								description="Provedores anunciam em bits (Mbps); 100 Mbps = 12,5 MB/s."
								placeholder="Ex.: 100"
								allowNegative={false}
							/>
						)}
					</form.AppField>
					<form.AppField name="speedUnit">
						{(field) => <field.SelectField label="Unidade" options={SPEED_UNITS} />}
					</form.AppField>
				</div>
				<form.AppField name="overhead">
					{(field) => (
						<field.NumberField
							label="Perda (overhead)"
							description="Cabeçalhos TCP/IP, Wi-Fi e congestionamento. 10% é uma estimativa comum; 0 dá o máximo teórico."
							placeholder="Ex.: 10"
							suffix="%"
							min={0}
							max={99}
						/>
					)}
				</form.AppField>
			</FormCard>
			<ResultCard
				title="Tempo de download"
				empty={!outcome}
				emptyText="Informe o tamanho e a velocidade."
			>
				{outcome && 'error' in outcome ? (
					<Alert tone="danger">
						<CircleX />
						{outcome.error}
					</Alert>
				) : null}
				{result ? <DownloadResultView result={result} /> : null}
			</ResultCard>
		</ToolLayout>
	)
}

function DownloadResultView({ result }: { result: DownloadResult }) {
	const time = formatHms(result.seconds)
	const effectiveSpeed = effectiveBitsPerSecond(result)
	return (
		<>
			<div className="flex flex-col gap-1">
				<span className="text-fg-muted text-[0.8125rem]">Tempo (h:mm:ss)</span>
				<div className="flex items-center gap-4">
					<OutputValue className="flex-1">{time}</OutputValue>
					<CopyButton variant="primary" value={time} aria-label={`Copiar tempo ${time}`} />
				</div>
				<span className="text-fg-muted text-[0.8125rem]">{formatDuration(result.seconds)}</span>
			</div>
			<DataList
				items={[
					{
						label: 'Tamanho',
						value: formatBytes(result.bytes),
						hint: formatBytes(result.bytes, 'binary'),
					},
					{
						label: 'Velocidade efetiva',
						value: formatBitrate(effectiveSpeed),
						hint: `${formatBytes(effectiveSpeed / 8)}/s`,
					},
				]}
			/>
			<h3 className="text-fg text-sm font-semibold">Em velocidades comuns</h3>
			<TableCard label="Tempo de download em velocidades comuns">
				<Table>
					<TableHeader>
						<tr>
							<TableHead>Conexão</TableHead>
							<TableHead numeric>h:mm:ss</TableHead>
							<TableHead numeric>Aproximado</TableHead>
						</tr>
					</TableHeader>
					<TableBody>
						{COMMON_SPEEDS.map((speed) => {
							const seconds = downloadSeconds(
								result.bytes,
								speed.bitsPerSecond,
								result.overheadPercent,
							)
							return (
								<TableRow key={speed.label}>
									<TableHead
										scope="row"
										className="border-rule text-fg tabular h-auto border-t border-b-0 py-4 text-sm font-medium tracking-normal normal-case group-first/row:border-t-0"
									>
										{speed.label}
									</TableHead>
									<TableCell numeric>{formatHms(seconds)}</TableCell>
									<TableCell numeric className="text-fg-muted">
										{formatDuration(seconds)}
									</TableCell>
								</TableRow>
							)
						})}
					</TableBody>
				</Table>
			</TableCard>
		</>
	)
}
