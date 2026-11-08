'use client'

import { Button, CopyButton, cn } from '@4people/ui'
import { useStore } from '@tanstack/react-form'
import {
	Hash,
	Lightbulb,
	RefreshCw,
	ShieldAlert,
	ShieldCheck,
	ShieldX,
	Shuffle,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { z } from 'zod'
import { useToolForm } from '@/components/form/use-tool-form'
import {
	CHARSETS,
	type CharsetKey,
	formatCrackTime,
	generatePassphrase,
	generatePassword,
	generatePin,
	type PassphraseSeparator,
	type PasswordStrength,
	passphraseBits,
	pinBits,
	randomPasswordBits,
	strengthFromBits,
} from '@/lib/algorithms/password'
import { pick } from '@/lib/algorithms/random'
import { FormCard, ResultCard, ToolLayout } from './_shared/tool-layout'

/**
 * Phones show three short labels without icons (icons pushed them onto two lines); from sm up, each
 * kind has its icon and full name. The hidden variant drops out of the accessible name.
 */
const KIND_ICON_CLASS = 'hidden size-4 sm:block'
const KINDS = [
	{
		value: 'random',
		label: (
			<span className="flex items-center gap-2">
				<Shuffle aria-hidden="true" className={KIND_ICON_CLASS} /> Aleatória
			</span>
		),
	},
	{
		value: 'memorable',
		label: (
			<span className="flex items-center gap-2">
				<Lightbulb aria-hidden="true" className={KIND_ICON_CLASS} />
				<span className="sm:hidden">Memorável</span>
				<span className="hidden sm:inline">Fácil de lembrar</span>
			</span>
		),
	},
	{
		value: 'pin',
		label: (
			<span className="flex items-center gap-2">
				<Hash aria-hidden="true" className={KIND_ICON_CLASS} /> PIN
			</span>
		),
	},
] as const

const CHARSET_KEYS: CharsetKey[] = ['lowerCase', 'upperCase', 'number', 'special']

const STRENGTH_LEVELS = ['Muito fraca', 'Fraca', 'Razoável', 'Forte', 'Muito forte'] as const

const SEPARATORS: ReadonlyArray<{ value: PassphraseSeparator; label: string }> = [
	{ value: 'hyphen', label: 'Hífen ( - )' },
	{ value: 'dot', label: 'Ponto ( . )' },
	{ value: 'underscore', label: 'Sublinhado ( _ )' },
	{ value: 'space', label: 'Espaço' },
	{ value: 'none', label: 'Nenhum' },
]

const schema = z
	.object({
		kind: z.enum(['random', 'memorable', 'pin']),
		length: z.number().int().min(4).max(128),
		number: z.boolean(),
		upperCase: z.boolean(),
		lowerCase: z.boolean(),
		special: z.boolean(),
		excludeEqualChars: z.boolean(),
		excludeSimilarChars: z.boolean(),
		words: z.number().int().min(2).max(10),
		separator: z.enum(['hyphen', 'dot', 'underscore', 'space', 'none']),
		capitalize: z.boolean(),
		wordNumber: z.boolean(),
		pinLength: z.number().int().min(4).max(12),
		avoidObvious: z.boolean(),
	})
	.superRefine((values, ctx) => {
		if (!hasNoCharsetSelected(values)) return
		ctx.addIssue({
			code: 'custom',
			message: 'Ligue pelo menos um tipo de caractere.',
			path: ['special'],
		})
	})

type Values = z.input<typeof schema>

/** Random kind with every character type off: nothing to draw from. */
function hasNoCharsetSelected(options: Pick<Values, 'kind' | CharsetKey>): boolean {
	return options.kind === 'random' && !CHARSET_KEYS.some((key) => options[key])
}

const DEFAULTS: Values = {
	kind: 'random',
	length: 16,
	number: true,
	upperCase: true,
	lowerCase: true,
	special: true,
	excludeEqualChars: true,
	excludeSimilarChars: true,
	words: 4,
	separator: 'hyphen',
	capitalize: true,
	wordNumber: true,
	pinLength: 4,
	avoidObvious: true,
}

/** Look and advice for each level: the panel is tinted so the verdict reads at a glance. */
const STRENGTH_STYLE: Record<
	PasswordStrength,
	{ panel: string; ink: string; fill: string; icon: typeof ShieldCheck; tip: string }
> = {
	'Muito fraca': {
		panel: 'bg-danger-soft',
		ink: 'text-danger-ink',
		fill: 'bg-danger',
		icon: ShieldX,
		tip: 'Aumente o tamanho ou ligue mais tipos de caractere.',
	},
	Fraca: {
		panel: 'bg-danger-soft',
		ink: 'text-danger-ink',
		fill: 'bg-danger',
		icon: ShieldAlert,
		tip: 'Aumente o tamanho ou ligue mais tipos de caractere.',
	},
	Razoável: {
		panel: 'bg-warning-soft',
		ink: 'text-warning-ink',
		fill: 'bg-warning-ink',
		icon: ShieldAlert,
		tip: 'Serve para contas pouco importantes. Para as outras, aumente o tamanho.',
	},
	Forte: {
		panel: 'bg-accent-soft',
		ink: 'text-accent-soft-fg',
		fill: 'bg-primary',
		icon: ShieldCheck,
		tip: 'Boa para a maioria das contas.',
	},
	'Muito forte': {
		panel: 'bg-success-soft',
		ink: 'text-success-ink',
		fill: 'bg-success',
		icon: ShieldCheck,
		tip: 'Ótima até para e-mail, banco e gerenciador de senhas.',
	},
}

/** Verdict, 5-step meter, time to crack in a sentence, and the numbers behind it as chips. */
function StrengthPanel({ bits, length }: { bits: number; length: number }) {
	const strength = strengthFromBits(bits)
	const level = STRENGTH_LEVELS.indexOf(strength.label)
	const style = STRENGTH_STYLE[strength.label]
	const Icon = style.icon
	const time = formatCrackTime(strength.crackSeconds)
	return (
		<section
			aria-labelledby="password-strength"
			className={cn('flex flex-col gap-4 rounded-[18px] p-4 sm:p-5', style.panel)}
		>
			<div className="flex items-center gap-3">
				<span
					aria-hidden="true"
					className={cn(
						'bg-surface grid size-11 shrink-0 place-items-center rounded-full',
						style.ink,
					)}
				>
					<Icon className="size-5.5" />
				</span>
				<h3 id="password-strength" className="flex flex-col">
					<span className="text-fg-muted text-[0.8125rem] font-medium">Força da senha</span>
					<span className={cn('text-lg leading-tight font-bold', style.ink)}>{strength.label}</span>
				</h3>
			</div>
			<div aria-hidden="true" className="grid grid-cols-5 gap-1.5">
				{STRENGTH_LEVELS.map((name, index) => (
					<span
						key={name}
						className={cn(
							'h-2 rounded-full transition-colors duration-300',
							index <= level ? style.fill : 'bg-fg/10',
						)}
					/>
				))}
			</div>
			<p className="text-fg text-[0.9375rem] leading-relaxed">
				{strength.crackSeconds < 1 ? (
					<>
						Um computador <strong>quebra na hora</strong> por tentativa e erro.
					</>
				) : (
					<>
						Por tentativa e erro, quebrar levaria <strong>{time}</strong>.
					</>
				)}{' '}
				{style.tip}
			</p>
			<dl className="flex flex-wrap gap-2 text-[0.8125rem]">
				<div className="bg-surface text-fg flex items-center gap-1.5 rounded-full px-3 py-1">
					<dt className="sr-only">Tamanho</dt>
					<dd className="tabular">
						<strong>{length}</strong> caracteres
					</dd>
				</div>
				<div className="bg-surface text-fg flex items-center gap-1.5 rounded-full px-3 py-1">
					<dt className="sr-only">Entropia</dt>
					<dd className="tabular">
						<strong>≈ {Math.round(bits)}</strong> bits de entropia
					</dd>
				</div>
			</dl>
			<p className="text-fg-muted text-xs">
				Estimativa para um ataque de 10 bilhões de tentativas por segundo.
			</p>
		</section>
	)
}

/** The four character switches, each shown as a card with a sample of what it adds. */
const CHAR_OPTIONS = [
	{ name: 'lowerCase', label: 'Minúsculas', sample: 'abc', tone: 'text-fg-muted' },
	{ name: 'upperCase', label: 'Maiúsculas', sample: 'ABC', tone: 'text-fg-muted' },
	{ name: 'number', label: 'Números', sample: '123', tone: 'text-code-digit' },
	{ name: 'special', label: 'Símbolos', sample: '#$&', tone: 'text-code-symbol' },
] as const

const OPTION_CARD =
	'rounded-control border-border bg-surface hover:border-border-strong has-data-checked:border-accent/40 has-data-checked:bg-accent-soft/40 border px-3.5 py-1.5 transition-colors [&>span:last-child]:flex-1'

/** One-tap sizes under the slider. */
const LENGTH_PRESETS = [8, 12, 16, 24, 32, 64] as const
const PIN_PRESETS = [4, 6, 8] as const

type GeneratedPassword = { password: string; bits: number }

function makePin(options: Values): GeneratedPassword {
	// Excluding obvious PINs removes a tiny share of the space: the bits stay a fair estimate.
	return {
		password: generatePin(options.pinLength, options.avoidObvious),
		bits: pinBits(options.pinLength),
	}
}

function makePassphrase(options: Values): GeneratedPassword {
	return {
		password: generatePassphrase({
			words: options.words,
			separator: options.separator,
			capitalize: options.capitalize,
			number: options.wordNumber,
		}),
		bits: passphraseBits({ words: options.words, number: options.wordNumber }),
	}
}

function makeRandomPassword(options: Values): GeneratedPassword {
	const charsets = CHARSET_KEYS.filter((key) => options[key])
	const poolSize = charsets.reduce((size, key) => size + CHARSETS[key].length, 0)
	const firstCharset = charsets.length > 0 ? pick(charsets) : 'lowerCase'
	return {
		password: generatePassword({
			length: options.length,
			firstChar: firstCharset,
			charsets,
			excludeEqualChars: options.excludeEqualChars,
			excludeSimilarChars: options.excludeSimilarChars,
		}),
		bits: randomPasswordBits(options.length, poolSize, poolSize),
	}
}

function makePassword(options: Values): GeneratedPassword {
	if (options.kind === 'pin') return makePin(options)
	if (options.kind === 'memorable') return makePassphrase(options)
	return makeRandomPassword(options)
}

/** Digits blue, letters plain, everything else (symbols) orange: easier to read back. */
function charColorClass(char: string): string {
	if (/\d/.test(char)) return 'text-code-digit'
	if (/[a-z]/i.test(char)) return 'text-fg'
	return 'text-code-symbol'
}

function Presets({
	label,
	values,
	current,
	onPick,
}: {
	label: string
	values: readonly number[]
	current: number
	onPick: (value: number) => void
}) {
	return (
		<fieldset aria-label={label} className="flex flex-wrap gap-1.5">
			{values.map((value) => (
				<button
					key={value}
					type="button"
					aria-pressed={current === value}
					onClick={() => onPick(value)}
					className="border-border text-fg-muted hover:border-border-strong hover:text-fg aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-primary-fg focus-visible:ring-ring tabular h-9 min-w-11 rounded-full border px-3 text-sm font-medium transition-colors outline-none focus-visible:ring-4"
				>
					{value}
				</button>
			))}
		</fieldset>
	)
}

function ColoredPassword({ value }: { value: string }) {
	return (
		<span translate="no">
			{[...value].map((char, index) => (
				<span
					// biome-ignore lint/suspicious/noArrayIndexKey: characters repeat; position is identity
					key={index}
					className={charColorClass(char)}
				>
					{char === ' ' ? '␣' : char}
				</span>
			))}
		</span>
	)
}

/**
 * Passwords from the browser's CSPRNG in three kinds: random characters, easy to remember
 * (pronounceable words) and PIN. Every option applies right away; strength comes from the real
 * entropy of how the password was made.
 */
export default function PasswordGenerator() {
	const [result, setResult] = useState<GeneratedPassword | null>(null)
	const form = useToolForm({
		schema,
		defaultValues: DEFAULTS,
		onSubmit: (values) => setResult(makePassword(values)),
	})

	// A new password whenever the options change and are valid, including the first one on mount.
	// Remembering the last options keeps React's double effect run from making two passwords.
	const values = useStore(form.store, (state) => state.values)
	const lastOptionsKey = useRef('')
	useEffect(() => {
		const optionsKey = JSON.stringify(values)
		if (optionsKey === lastOptionsKey.current) return
		lastOptionsKey.current = optionsKey
		if (schema.safeParse(values).success) setResult(makePassword(values))
		// Submitting shows the field errors; with no charset the inline alert already explains it.
		else if (!hasNoCharsetSelected(values)) form.handleSubmit()
	}, [values, form])

	const kind = values.kind

	return (
		<ToolLayout resultFirst>
			<FormCard title="Escolha como quer" onSubmit={() => form.handleSubmit()} actions={null}>
				<form.AppField name="kind">
					{(field) => <field.RadioField label="Tipo de senha" options={KINDS} />}
				</form.AppField>

				{kind === 'random' ? (
					<>
						<div className="flex flex-col gap-3">
							<form.AppField name="length">
								{(field) => (
									<field.SliderField label="Tamanho" min={4} max={128} editable unit="caracteres" />
								)}
							</form.AppField>
							<Presets
								label="Tamanhos comuns"
								values={LENGTH_PRESETS}
								current={values.length}
								onPick={(size) => form.setFieldValue('length', size)}
							/>
						</div>
						<fieldset className="flex flex-col">
							<legend className="text-fg mb-2 text-sm font-medium">Usar</legend>
							<div className="grid gap-2 sm:grid-cols-2">
								{CHAR_OPTIONS.map((option) => (
									<form.AppField key={option.name} name={option.name}>
										{(field) => (
											<field.SwitchField
												className={OPTION_CARD}
												label={
													<span className="flex items-center justify-between gap-3">
														{option.label}
														<span
															aria-hidden="true"
															translate="no"
															className={cn('font-mono text-sm', option.tone)}
														>
															{option.sample}
														</span>
													</span>
												}
											/>
										)}
									</form.AppField>
								))}
							</div>
							{hasNoCharsetSelected(values) ? (
								<p role="alert" className="text-danger mt-1 text-[0.8125rem] font-medium">
									Ligue pelo menos um tipo de caractere. A senha anterior continua abaixo.
								</p>
							) : null}
						</fieldset>
						<div className="flex flex-col">
							<form.AppField name="excludeEqualChars">
								{(field) => (
									<field.SwitchField
										label="Evitar caracteres iguais seguidos"
										description="Ex.: AA, ll, 22"
									/>
								)}
							</form.AppField>
							<form.AppField name="excludeSimilarChars">
								{(field) => (
									<field.SwitchField
										label="Evitar caracteres parecidos seguidos"
										description="Ex.: lI, O0, gq"
									/>
								)}
							</form.AppField>
						</div>
					</>
				) : null}

				{kind === 'memorable' ? (
					<>
						<form.AppField name="words">
							{(field) => (
								<field.SliderField label="Palavras" min={2} max={10} editable unit="palavras" />
							)}
						</form.AppField>
						<form.AppField name="separator">
							{(field) => <field.SelectField label="Separador" options={SEPARATORS} />}
						</form.AppField>
						<div className="grid gap-x-6 sm:grid-cols-2">
							<form.AppField name="capitalize">
								{(field) => <field.SwitchField label="Primeira letra maiúscula" />}
							</form.AppField>
							<form.AppField name="wordNumber">
								{(field) => <field.SwitchField label="Incluir um número" />}
							</form.AppField>
						</div>
						<p className="text-fg-muted text-[0.8125rem]">
							Palavras inventadas que dá para pronunciar (ex.: “bavoli-Turesa42”): fáceis de digitar
							e de lembrar, e fora de qualquer dicionário.
						</p>
					</>
				) : null}

				{kind === 'pin' ? (
					<>
						<div className="flex flex-col gap-3">
							<form.AppField name="pinLength">
								{(field) => (
									<field.SliderField label="Dígitos" min={4} max={12} editable unit="dígitos" />
								)}
							</form.AppField>
							<Presets
								label="Tamanhos comuns de PIN"
								values={PIN_PRESETS}
								current={values.pinLength}
								onPick={(size) => form.setFieldValue('pinLength', size)}
							/>
						</div>
						<form.AppField name="avoidObvious">
							{(field) => (
								<field.SwitchField
									label="Evitar PINs óbvios"
									description="Ex.: 0000, 1234, 9876, 1212"
								/>
							)}
						</form.AppField>
					</>
				) : null}
			</FormCard>

			<ResultCard title="Sua senha" empty={!result} emptyText="Gerando senha…">
				{result ? (
					<div className="flex flex-col gap-5">
						<div className="flex flex-col gap-2">
							<output className="rounded-control bg-surface-muted block px-5 py-6 text-center font-mono text-[clamp(1.25rem,3vw,1.75rem)] leading-snug font-semibold tracking-wide break-all select-all">
								<ColoredPassword value={result.password} />
							</output>
							{kind === 'random' ? (
								<ul
									aria-label="Cores da senha"
									className="text-fg-muted flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs"
								>
									<li className="flex items-center gap-1.5">
										<span aria-hidden="true" className="bg-fg size-2 rounded-full" /> Letras
									</li>
									<li className="flex items-center gap-1.5">
										<span aria-hidden="true" className="bg-code-digit size-2 rounded-full" />{' '}
										Números
									</li>
									<li className="flex items-center gap-1.5">
										<span aria-hidden="true" className="bg-code-symbol size-2 rounded-full" />{' '}
										Símbolos
									</li>
								</ul>
							) : null}
						</div>
						<div className="grid gap-2 sm:grid-cols-2">
							<CopyButton
								value={result.password}
								label="Copiar senha"
								variant="primary"
								size="lg"
								className="w-full"
							/>
							<Button
								variant="secondary"
								size="lg"
								className="w-full"
								onClick={() => setResult(makePassword(values))}
							>
								<RefreshCw /> Gerar outra
							</Button>
						</div>
						<StrengthPanel bits={result.bits} length={result.password.length} />
					</div>
				) : null}
			</ResultCard>
		</ToolLayout>
	)
}
