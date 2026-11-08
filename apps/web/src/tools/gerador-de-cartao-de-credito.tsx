'use client'

import {
	Alert,
	Button,
	CopyButton,
	cn,
	RadioGroup,
	Table,
	TableBody,
	TableCard,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@4people/ui'
import { useStore } from '@tanstack/react-form'
import { Download, Info, RefreshCw } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { z } from 'zod'
import { useToolForm } from '@/components/form/use-tool-form'
import {
	binError,
	binInfo,
	CARD_BRANDS,
	type CardBrand,
	type CardExportFormat,
	type ExportableCard,
	embossedName,
	exportCards,
	generateCard,
} from '@/lib/algorithms/documents'
import { generateName } from '@/lib/algorithms/names'
import { onlyDigits } from '@/lib/algorithms/random'
import { downloadText } from '@/lib/format'
import { CopyRows } from './_shared/copy-rows'
import { useGenerateOnMount } from './_shared/document-generator'
import { FormCard, ResultCard, ToolLayout } from './_shared/tool-layout'

const BRANDS = Object.entries(CARD_BRANDS).map(([value, brand]) => ({
	value: value as CardBrand,
	label: brand.name,
}))

const EXPIRY_MODES = [
	{ value: 'future', label: 'Válida' },
	{ value: 'expired', label: 'Vencida' },
	{ value: 'custom', label: 'Escolher' },
] as const

const MONTHS = Array.from({ length: 12 }, (_, index) => {
	const value = String(index + 1).padStart(2, '0')
	return { value, label: value }
})
const CURRENT_YEAR = new Date().getFullYear()
const YEARS = Array.from({ length: 16 }, (_, index) => {
	const value = String(CURRENT_YEAR - 5 + index)
	return { value, label: value }
})

type ExportOption = {
	value: CardExportFormat
	label: string
	filename: string
	description: string
}

const EXPORT_OPTIONS: readonly ExportOption[] = [
	{
		value: 'text',
		label: 'Texto',
		filename: 'cartoes.txt',
		description: 'Uma linha por cartão: número, validade e CVV.',
	},
	{
		value: 'pipe',
		label: 'Pipe',
		filename: 'cartoes.txt',
		description:
			'Uma linha por cartão: número|mês|ano|cvv, o formato que muitas ferramentas de teste leem.',
	},
	{
		value: 'csv',
		label: 'CSV',
		filename: 'cartoes.csv',
		description: 'Com cabeçalho, pronto para planilhas e importações.',
	},
	{
		value: 'json',
		label: 'JSON',
		filename: 'cartoes.json',
		description: 'Uma lista de objetos, para fixtures e mocks.',
	},
]
const EXPORT_FORMAT_RADIOS = EXPORT_OPTIONS.map(({ value, label }) => ({ value, label }))

/**
 * Stripe's public test numbers: each simulates an outcome in test mode (any future expiry and any
 * CVV). Source: https://docs.stripe.com/testing
 */
const STRIPE_CARDS = [
	{ number: '4242 4242 4242 4242', brand: 'Visa', outcome: 'Pagamento aprovado' },
	{ number: '5555 5555 5555 4444', brand: 'Mastercard', outcome: 'Pagamento aprovado' },
	{ number: '3782 822463 10005', brand: 'American Express', outcome: 'Pagamento aprovado' },
	{ number: '4000 0025 0000 3155', brand: 'Visa', outcome: 'Pede autenticação 3D Secure' },
	{ number: '4000 0000 0000 0002', brand: 'Visa', outcome: 'Recusado (genérico)' },
	{ number: '4000 0000 0000 9995', brand: 'Visa', outcome: 'Recusado: saldo insuficiente' },
	{ number: '4000 0000 0000 0069', brand: 'Visa', outcome: 'Recusado: cartão vencido' },
] as const

/** Card face colours per brand (decorative; every value is also in the text rows). */
const CARD_FACE_GRADIENTS: Record<CardBrand | 'unknown', string> = {
	visa: 'linear-gradient(135deg, #1a2b6d, #2747c4 60%, #4f6fe0)',
	mastercard: 'linear-gradient(135deg, #1d1d24, #3a2a2a 55%, #c2410c)',
	elo: 'linear-gradient(135deg, #111111, #2b2b2b 60%, #a16207)',
	amex: 'linear-gradient(135deg, #0b5563, #127c8a 60%, #3aa8b5)',
	hipercard: 'linear-gradient(135deg, #7f1d1d, #b91c1c 60%, #e05252)',
	diners: 'linear-gradient(135deg, #1f2937, #374151 60%, #6b7280)',
	discover: 'linear-gradient(135deg, #3b2412, #9a3412 60%, #ea7a2a)',
	jcb: 'linear-gradient(135deg, #064e3b, #047857 60%, #34a77f)',
	unknown: 'linear-gradient(135deg, #334155, #475569 60%, #64748b)',
}

const CHIP_CONTACTS = [0, 1, 2, 3]

const schema = z
	.object({
		brand: z.enum(Object.keys(CARD_BRANDS) as [CardBrand, ...CardBrand[]]),
		bin: z.string(),
		amount: z.number().int().min(1).max(50),
		expiry: z.enum(['future', 'expired', 'custom']),
		month: z.string(),
		year: z.string(),
		cvv: z.string(),
		holder: z.boolean(),
		spaces: z.boolean(),
	})
	.superRefine((values, ctx) => {
		const binMessage = binError(values.bin)
		if (binMessage) ctx.addIssue({ code: 'custom', path: ['bin'], message: binMessage })

		const cvvLength = values.bin.trim()
			? binInfo(onlyDigits(values.bin)).cvv
			: CARD_BRANDS[values.brand].cvv
		if (values.cvv && !new RegExp(`^\\d{${cvvLength}}$`).test(values.cvv)) {
			ctx.addIssue({
				code: 'custom',
				path: ['cvv'],
				message: `O CVV deste cartão tem ${cvvLength} dígitos. Deixe vazio para sortear.`,
			})
		}
	})

type Values = z.infer<typeof schema>

const DEFAULT_VALUES: Values = {
	brand: 'visa',
	bin: '',
	amount: 1,
	expiry: 'future',
	month: '12',
	year: String(CURRENT_YEAR + 2),
	cvv: '',
	holder: true,
	spaces: true,
}

const faceGradient = (brand: CardBrand | null) => CARD_FACE_GRADIENTS[brand ?? 'unknown']

function binDescription(bin: string): string {
	const binDigits = onlyDigits(bin)
	if (!binDigits) return 'Os primeiros dígitos do cartão.'
	const { brand, length } = binInfo(binDigits)
	const brandLabel = brand ? CARD_BRANDS[brand].name : 'Bandeira desconhecida'
	return `${brandLabel} · ${length} dígitos`
}

function generateCards(values: Values): ExportableCard[] {
	const now = new Date()
	return Array.from({ length: values.amount }, () => {
		const card = generateCard(values.brand, now, {
			bin: values.bin.trim(),
			expiry: values.expiry,
			month: Number(values.month),
			year: Number(values.year),
			cvv: values.cvv,
		})
		if (!values.holder) return card
		return { ...card, holder: embossedName(generateName('full', 'any')) }
	})
}

/** Every option except the number's spacing makes a new batch as soon as it changes. */
function useRegenerateOnChange(values: Values, regenerate: () => void) {
	const optionsKey = JSON.stringify({ ...values, spaces: undefined })
	const lastOptionsKey = useRef(optionsKey)
	const latestRegenerate = useRef(regenerate)
	latestRegenerate.current = regenerate
	useEffect(() => {
		if (lastOptionsKey.current === optionsKey) return
		lastOptionsKey.current = optionsKey
		latestRegenerate.current()
	}, [optionsKey])
}

/** The card front: brand, chip, number, holder and expiry, as people picture a card. */
function CardFace({ card }: { card: ExportableCard }) {
	return (
		<div
			aria-hidden="true"
			className="relative isolate flex aspect-[1.586] w-full max-w-sm flex-col justify-between overflow-hidden rounded-[18px] p-5 text-white shadow-[0_12px_32px_-12px_rgb(23_32_51/0.5)] sm:p-6"
			style={{ background: faceGradient(card.brand) }}
		>
			<span className="absolute -top-16 -right-10 -z-10 size-48 rounded-full bg-white/10" />
			<span className="absolute -bottom-20 -left-12 -z-10 size-56 rounded-full bg-white/5" />
			<div className="flex items-start justify-between">
				<span className="grid h-8 w-11 grid-cols-2 gap-px overflow-hidden rounded-md bg-amber-200/90 p-1 shadow-inner">
					{CHIP_CONTACTS.map((contact) => (
						<span key={contact} className="rounded-[2px] border border-amber-600/40" />
					))}
				</span>
				<span className="text-sm font-bold tracking-wide italic">
					{card.brand ? CARD_BRANDS[card.brand].name : 'Cartão'}
				</span>
			</div>
			<span className="font-mono text-[clamp(1rem,5vw,1.375rem)] tracking-[0.08em] whitespace-nowrap tabular-nums">
				{card.number}
			</span>
			<div className="flex items-end justify-between gap-4 text-[0.6875rem] tracking-wider uppercase">
				<span className="flex min-w-0 flex-col gap-0.5">
					<span className="opacity-70">Titular</span>
					<span className="truncate text-sm font-semibold tracking-wide">
						{card.holder ?? 'NOME DO TITULAR'}
					</span>
				</span>
				<span className="flex shrink-0 flex-col gap-0.5 text-right">
					<span className="opacity-70">Validade</span>
					<span className="font-mono text-sm font-semibold">{card.expiry}</span>
				</span>
			</div>
		</div>
	)
}

function SingleCard({ card }: { card: ExportableCard }) {
	const brandLabel = card.brand ? CARD_BRANDS[card.brand].name : 'bandeira desconhecida'
	const rows = [
		{ label: `Número (${brandLabel})`, value: card.number },
		{ label: 'Validade', value: card.expiry },
		{ label: 'CVV', value: card.cvv },
	]
	if (card.holder) rows.push({ label: 'Titular', value: card.holder })

	return (
		<div className="flex flex-col gap-4">
			<CardFace card={card} />
			<CopyRows code rows={rows} />
		</div>
	)
}

function CardList({ cards }: { cards: readonly ExportableCard[] }) {
	return (
		<ul aria-label="Cartões gerados" className="flex flex-col gap-2">
			{cards.map((card, index) => (
				<li
					// biome-ignore lint/suspicious/noArrayIndexKey: random cards can repeat; the position is the identity
					key={index}
					className="rounded-control bg-surface-muted flex items-center gap-3 py-2 pr-2 pl-4"
				>
					<span
						aria-hidden="true"
						className="h-6 w-1.5 shrink-0 rounded-full"
						style={{ background: faceGradient(card.brand) }}
					/>
					<span className="flex min-w-0 flex-1 flex-col">
						<span
							translate="no"
							className="text-fg font-mono text-[0.9375rem] [overflow-wrap:anywhere] tabular-nums"
						>
							{card.number}
						</span>
						<span className="text-fg-muted font-mono text-[0.8125rem] tabular-nums">
							{card.expiry} · CVV {card.cvv}
							{card.holder ? <span className="font-sans"> · {card.holder}</span> : null}
						</span>
					</span>
					<CopyButton
						iconOnly
						value={[card.number, card.expiry, card.cvv].join(' ')}
						label={`Copiar cartão ${index + 1}`}
					/>
				</li>
			))}
		</ul>
	)
}

function ExportPanel({ cards, spaces }: { cards: readonly ExportableCard[]; spaces: boolean }) {
	const [exportFormat, setExportFormat] = useState<CardExportFormat>('text')
	const exportOption =
		EXPORT_OPTIONS.find((option) => option.value === exportFormat) ??
		(EXPORT_OPTIONS[0] as ExportOption)
	const exportedText = exportCards(cards, exportFormat, spaces)
	const fileExtension = exportOption.filename.split('.').pop()?.toUpperCase()

	return (
		<div className="border-border flex flex-col gap-3 border-t pt-4">
			<div className="flex flex-wrap items-center justify-between gap-3">
				<span className="text-fg text-sm font-semibold" id="card-export-label">
					Exportar como
				</span>
				<RadioGroup
					aria-labelledby="card-export-label"
					options={EXPORT_FORMAT_RADIOS}
					value={exportFormat}
					onValueChange={setExportFormat}
				/>
			</div>
			<pre
				// biome-ignore lint/a11y/noNoninteractiveTabindex: a scrollable block must be reachable by keyboard
				tabIndex={0}
				className={cn(
					'rounded-control bg-surface-muted text-fg focus-visible:ring-ring max-h-48 overflow-auto px-4 py-3 font-mono text-[0.8125rem] leading-relaxed outline-none focus-visible:ring-4',
					exportFormat === 'json'
						? 'whitespace-pre'
						: '[overflow-wrap:anywhere] whitespace-pre-wrap',
				)}
			>
				{exportedText}
			</pre>
			<p className="text-fg-muted text-[0.8125rem]">{exportOption.description}</p>
			<div className="flex flex-wrap gap-2">
				<CopyButton
					variant="primary"
					value={exportedText}
					label={cards.length > 1 ? `Copiar os ${cards.length}` : 'Copiar'}
				/>
				<Button
					variant="secondary"
					size="sm"
					onClick={() => downloadText(exportOption.filename, exportedText)}
				>
					<Download /> Baixar {fileExtension}
				</Button>
			</div>
		</div>
	)
}

function StripeTestCards() {
	return (
		<TableCard
			label="Cartões de teste da Stripe"
			className="xl:col-span-2"
			toolbar={
				<div className="flex flex-col gap-0.5">
					<h2 className="text-fg text-base font-semibold">Cartões de teste da Stripe</h2>
					<p className="text-fg-muted text-[0.8125rem]">
						No modo de teste, cada número simula um resultado. Use qualquer validade futura e
						qualquer CVV.{' '}
						<a
							href="https://docs.stripe.com/testing"
							target="_blank"
							rel="noreferrer"
							className="text-accent-soft-fg font-semibold hover:underline"
						>
							Documentação da Stripe
						</a>
					</p>
				</div>
			}
		>
			<Table>
				<caption className="sr-only">Números de teste da Stripe e o resultado de cada um.</caption>
				<TableHeader>
					<tr>
						<TableHead>Número</TableHead>
						<TableHead>Resultado</TableHead>
						<TableHead className="w-12">
							<span className="sr-only">Copiar</span>
						</TableHead>
					</tr>
				</TableHeader>
				<TableBody>
					{STRIPE_CARDS.map((card) => (
						<TableRow key={card.number}>
							<TableCell>
								<span
									translate="no"
									className="text-fg font-mono text-sm whitespace-nowrap tabular-nums"
								>
									{card.number}
								</span>
								<span className="text-fg-muted block text-[0.8125rem]">{card.brand}</span>
							</TableCell>
							<TableCell className="text-fg text-sm">{card.outcome}</TableCell>
							<TableCell className="text-right">
								<CopyButton
									iconOnly
									variant="ghost"
									value={card.number.replaceAll(' ', '')}
									label={`Copiar ${card.number}`}
								/>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableCard>
	)
}

/**
 * Luhn-valid test cards: brand or a custom BIN, how many, expiry (valid, expired or chosen), fixed
 * or random CVV, optional holder name, and exports in the formats test suites read. Options apply
 * as they change; "Com espaços" only restyles what is on screen.
 */
export default function CardGenerator() {
	const [cards, setCards] = useState<ExportableCard[] | null>(null)
	const form = useToolForm({
		schema,
		defaultValues: DEFAULT_VALUES,
		onSubmit: (values) => setCards(generateCards(values)),
	})
	useGenerateOnMount(() => form.handleSubmit())

	const values = useStore(form.store, (state) => state.values)
	useRegenerateOnChange(values, () => form.handleSubmit())

	const hasBin = onlyDigits(values.bin) !== ''
	const displayedCards = cards?.map((card) =>
		values.spaces ? card : { ...card, number: card.digits },
	)
	const singleCard = displayedCards?.length === 1 ? displayedCards[0] : null

	return (
		<ToolLayout resultFirst>
			<FormCard
				title="Escolha como quer"
				onSubmit={() => form.handleSubmit()}
				actions={
					<form.AppForm>
						<form.SubmitButton>
							<RefreshCw aria-hidden="true" />{' '}
							{values.amount > 1 ? 'Gerar novos cartões' : 'Gerar novo cartão'}
						</form.SubmitButton>
					</form.AppForm>
				}
			>
				<div className="grid grid-cols-2 items-start gap-x-3 gap-y-4 sm:gap-x-4">
					<form.AppField name="brand">
						{(field) => (
							<field.SelectField
								label="Bandeira"
								options={BRANDS}
								description={hasBin ? 'Definida pelo BIN.' : undefined}
							/>
						)}
					</form.AppField>
					<form.AppField name="bin">
						{(field) => (
							<field.TextField
								label="BIN (opcional)"
								placeholder="Ex.: 516292"
								inputMode="numeric"
								inputClassName="font-mono tabular"
								description={binDescription(values.bin)}
							/>
						)}
					</form.AppField>
				</div>
				<form.AppField name="amount">
					{(field) => <field.SliderField label="Quantos cartões?" min={1} max={50} editable />}
				</form.AppField>
				<form.AppField name="expiry">
					{(field) => <field.RadioField label="Validade" options={EXPIRY_MODES} />}
				</form.AppField>
				{values.expiry === 'custom' ? (
					<div className="grid grid-cols-2 gap-x-3 gap-y-4 sm:gap-x-4">
						<form.AppField name="month">
							{(field) => <field.SelectField label="Mês" options={MONTHS} />}
						</form.AppField>
						<form.AppField name="year">
							{(field) => <field.SelectField label="Ano" options={YEARS} />}
						</form.AppField>
					</div>
				) : null}
				<form.AppField name="cvv">
					{(field) => (
						<field.TextField
							label="CVV fixo (opcional)"
							placeholder="Vazio: um CVV aleatório por cartão"
							inputMode="numeric"
							inputClassName="font-mono tabular"
						/>
					)}
				</form.AppField>
				<div className="flex flex-col">
					<form.AppField name="holder">
						{(field) => <field.SwitchField label="Incluir nome do titular" />}
					</form.AppField>
					<form.AppField name="spaces">
						{(field) => (
							<field.SwitchField label="Número com espaços" description="4588 1499 9482 5963" />
						)}
					</form.AppField>
				</div>
				<Alert>
					<Info />
					Números só para testar formulários e gateways em modo de teste. Não pertencem a nenhuma
					conta e são recusados em qualquer compra real.
				</Alert>
			</FormCard>

			<ResultCard title="Copie e use" empty={!displayedCards} emptyText="Gerando cartão…">
				{singleCard ? <SingleCard card={singleCard} /> : null}
				{displayedCards && !singleCard ? <CardList cards={displayedCards} /> : null}
				{cards && displayedCards ? <ExportPanel cards={cards} spaces={values.spaces} /> : null}
			</ResultCard>

			<StripeTestCards />
		</ToolLayout>
	)
}
