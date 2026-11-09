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
	type Conversion,
	type CsvDelimiter,
	csvToSql,
	runConversion,
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

type CsvConversion = Conversion & { columns?: { name: string; type: string }[] }

function describeRows(rowCount: number, delimiter: CsvDelimiter) {
	const rows = `${rowCount} ${rowCount === 1 ? 'linha' : 'linhas'}`
	return `${rows} · separador: ${DELIMITER_NAMES[delimiter]}`
}

function convertCsv({ input, batchSize, ...options }: Values): CsvConversion {
	let columns: CsvConversion['columns']
	const conversion = runConversion(() => {
		const result = csvToSql(input, { ...options, batchSize: Number(batchSize) || 100 })
		columns = result.columns
		return {
			output: result.sql,
			info: describeRows(result.rows, result.delimiter),
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
					{(field) => (
						<field.TextareaField
							label="CSV"
							rows={10}
							placeholder={'Ex.: id,nome\n1,Ana\n2,Bruno'}
						/>
					)}
				</form.AppField>
				<div className="grid gap-6 sm:grid-cols-2">
					<form.AppField name="tableName">
						{(field) => <field.TextField label="Nome da tabela" placeholder="Ex.: clientes" />}
					</form.AppField>
					<form.AppField name="dialect">
						{(field) => <field.SelectField label="Banco de dados" options={DIALECTS} />}
					</form.AppField>
					<form.AppField name="delimiter">
						{(field) => <field.SelectField label="Separador" options={DELIMITERS} />}
					</form.AppField>
					<form.AppField name="batchSize">
						{(field) => (
							<field.NumberField
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
					{(field) => (
						<field.CheckboxField
							label="A primeira linha é o cabeçalho"
							description="Os nomes das colunas vêm dela. Sem cabeçalho: coluna_1, coluna_2…"
						/>
					)}
				</form.AppField>
				<form.AppField name="createTable">
					{(field) => (
						<field.CheckboxField
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
	const result = useLiveConversion(values, convertCsv)
	return (
		<ConversionResult
			title="SQL"
			source={values.input}
			result={result}
			downloadName={`${values.tableName.trim() || 'tabela'}.sql`}
			onClear={onClear}
			emptyText="Cole um CSV e o SQL aparece aqui."
		>
			{result?.columns?.length ? <ColumnTypes columns={result.columns} /> : null}
		</ConversionResult>
	)
}

function ColumnTypes({ columns }: { columns: { name: string; type: string }[] }) {
	return (
		<TableCard label="Colunas e tipos inferidos" maxHeight="20rem">
			<Table>
				<TableHeader>
					<tr>
						<TableHead>Coluna</TableHead>
						<TableHead>Tipo</TableHead>
					</tr>
				</TableHeader>
				<TableBody>
					{columns.map((column) => (
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
	)
}
