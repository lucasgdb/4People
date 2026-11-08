'use client'

import {
	Table,
	TableBody,
	TableCard,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@4people/ui'
import { useAppForm } from '@/components/form/form'
import {
	attempt,
	type Conversion,
	type CsvDelimiter,
	csvToSql,
	type SqlDialect,
} from '@/lib/algorithms/convert'
import {
	ConversionResult,
	LiveActions,
	OpenFileButton,
	useLiveConversion,
} from './_conversores/live-conversion'
import { FormCard, ToolLayout } from './_shared/tool-layout'

const DIALECTS = [
	{ value: 'mysql', label: 'MySQL / MariaDB' },
	{ value: 'postgresql', label: 'PostgreSQL' },
	{ value: 'sqlite', label: 'SQLite' },
	{ value: 'sqlserver', label: 'SQL Server' },
] as const

const DELIMITERS = [
	{ value: 'auto', label: 'Detectar automaticamente' },
	{ value: ',', label: 'Vírgula (,)' },
	{ value: ';', label: 'Ponto e vírgula (;)' },
	{ value: '\t', label: 'Tab' },
	{ value: '|', label: 'Barra vertical (|)' },
] as const

const DELIMITER_NAMES: Record<CsvDelimiter, string> = {
	',': 'vírgula',
	';': 'ponto e vírgula',
	'\t': 'tab',
	'|': 'barra vertical',
}

const EXAMPLE = `id;nome;email;salario;ativo;admissao
1;Ana Souza;ana@exemplo.com;5300.50;true;15/03/2021
2;"Silva, Bruno";bruno@exemplo.com;4200;false;2022-07-01
3;Carla O'Neil;;6100.75;true;2020-01-20`

type Values = {
	input: string
	tableName: string
	dialect: SqlDialect
	delimiter: 'auto' | CsvDelimiter
	header: boolean
	createTable: boolean
	batchSize: string
}

const DEFAULTS: Values = {
	input: '',
	tableName: 'tabela',
	dialect: 'mysql',
	delimiter: 'auto',
	header: true,
	createTable: true,
	batchSize: '100',
}

type Result = Conversion & { columns?: { name: string; type: string }[] }

function convert({ input, batchSize, ...options }: Values): Result {
	let columns: Result['columns']
	const conversion = attempt(() => {
		const result = csvToSql(input, { ...options, batchSize: Number(batchSize) || 100 })
		columns = result.columns
		return {
			output: result.sql,
			info: `${result.rows} ${result.rows === 1 ? 'linha' : 'linhas'} · separador: ${DELIMITER_NAMES[result.delimiter]}`,
			warnings: result.warnings,
		}
	})
	return { ...conversion, columns }
}

/** CSV → CREATE TABLE with inferred types + batched INSERTs, for MySQL, PostgreSQL, SQLite or SQL Server. */
export default function CsvParaSql() {
	const form = useAppForm({ defaultValues: DEFAULTS })
	return (
		<ToolLayout>
			<FormCard
				onSubmit={() => undefined}
				actions={
					<>
						<OpenFileButton
							accept=".csv,.tsv,.txt,text/csv"
							onText={(text) => form.setFieldValue('input', text)}
						/>
						<LiveActions onExample={() => form.setFieldValue('input', EXAMPLE)} />
					</>
				}
			>
				<form.AppField name="input">
					{(f) => (
						<f.TextareaField label="CSV" rows={10} placeholder={'Ex.: id,nome\n1,Ana\n2,Bruno'} />
					)}
				</form.AppField>
				<div className="grid gap-5 sm:grid-cols-2">
					<form.AppField name="tableName">
						{(f) => <f.TextField label="Nome da tabela" placeholder="Ex.: clientes" />}
					</form.AppField>
					<form.AppField name="dialect">
						{(f) => <f.SelectField label="Banco de dados" options={DIALECTS} />}
					</form.AppField>
					<form.AppField name="delimiter">
						{(f) => <f.SelectField label="Separador" options={DELIMITERS} />}
					</form.AppField>
					<form.AppField name="batchSize">
						{(f) => (
							<f.NumberField
								label="Linhas por INSERT"
								description="No SQL Server, no máximo 1.000."
								placeholder="Ex.: 100"
								integer
								min={1}
							/>
						)}
					</form.AppField>
				</div>
				<form.AppField name="header">
					{(f) => (
						<f.CheckboxField
							label="A primeira linha é o cabeçalho"
							description="Os nomes das colunas vêm dela. Sem cabeçalho: coluna_1, coluna_2…"
						/>
					)}
				</form.AppField>
				<form.AppField name="createTable">
					{(f) => (
						<f.CheckboxField
							label="Gerar CREATE TABLE"
							description="Tipos inferidos: INTEGER, DECIMAL, BOOLEAN, DATE ou VARCHAR(n)."
						/>
					)}
				</form.AppField>
			</FormCard>
			<form.Subscribe selector={(state) => state.values}>
				{(values) => <SqlResult values={values} onClear={() => form.reset(DEFAULTS)} />}
			</form.Subscribe>
		</ToolLayout>
	)
}

function SqlResult({ values, onClear }: { values: Values; onClear: () => void }) {
	const result = useLiveConversion(values, convert)
	return (
		<ConversionResult
			title="SQL"
			source={values.input}
			result={result}
			downloadName={`${values.tableName.trim() || 'tabela'}.sql`}
			onClear={onClear}
			emptyText="Cole um CSV e o SQL aparece aqui."
		>
			{result?.columns?.length ? (
				<TableCard label="Colunas e tipos inferidos" maxHeight="20rem">
					<Table>
						<TableHeader>
							<tr>
								<TableHead>Coluna</TableHead>
								<TableHead>Tipo</TableHead>
							</tr>
						</TableHeader>
						<TableBody>
							{result.columns.map((column) => (
								<TableRow key={column.name}>
									<TableCell translate="no">{column.name}</TableCell>
									<TableCell className="text-fg-muted font-mono text-sm" translate="no">
										{column.type}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableCard>
			) : null}
		</ConversionResult>
	)
}
