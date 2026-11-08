'use client'

import {
	Button,
	type ButtonProps,
	Checkbox,
	ColorPicker,
	cn,
	DatePicker,
	Field,
	formatLongDate,
	Input,
	type NumericOptions,
	RadioGroup,
	type RadioOption,
	readNumeric,
	Select,
	type SelectOption,
	Slider,
	SUBMIT_SHORTCUT_ARIA,
	SubmitShortcutHint,
	Switch,
	sanitizeNumeric,
	stepNumeric,
	Textarea,
	TimeInput,
} from '@4people/ui'
import { createFormHook, createFormHookContexts } from '@tanstack/react-form'
import { LoaderCircle } from 'lucide-react'
import { type HTMLInputTypeAttribute, type ReactNode, useCallback, useState } from 'react'
import { applyMask, type Mask } from '@/lib/masks'

export const { fieldContext, formContext, useFieldContext, useFormContext } =
	createFormHookContexts()

/* ------------------------- focus the first invalid field ------------------------- */

/** Each form keeps the elements its fields rendered, keyed by field name. */
const controls = new WeakMap<object, Map<string, HTMLElement>>()

/** Ref callback that registers the field's focusable element with its form. */
function useControlRef<T extends HTMLElement>() {
	const field = useFieldContext<unknown>()
	const { form, name } = field
	return useCallback(
		(element: T | null) => {
			let map = controls.get(form)
			if (!map) {
				map = new Map()
				controls.set(form, map)
			}
			if (element) map.set(name, element)
			else map.delete(name)
		},
		[form, name],
	)
}

const TABBABLE =
	'input:not([type=hidden]):not(:disabled), textarea, button:not(:disabled), [tabindex]:not([tabindex="-1"])'

type FieldMetaSource = { state: { fieldMeta: Record<string, { errors?: unknown[] } | undefined> } }

/**
 * Moves focus to the first field with an error, in reading order, and brings it into view.
 * Called by `useToolForm` when a submit fails validation (TanStack Form's `onSubmitInvalid`).
 */
export function focusFirstInvalid(form: object) {
	const map = controls.get(form)
	if (!map) return
	const meta = (form as FieldMetaSource).state.fieldMeta
	const invalid = [...map.entries()]
		.filter(([name]) => (meta[name]?.errors?.length ?? 0) > 0)
		.map(([, element]) => element)
		.filter((element) => element.isConnected)
		.sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1))
	const first = invalid[0]
	if (!first) return
	const target = first.matches(TABBABLE)
		? first
		: (first.querySelector<HTMLElement>(TABBABLE) ?? first)
	const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
	target.scrollIntoView({ block: 'center', behavior: smooth ? 'smooth' : 'auto' })
	target.focus({ preventScroll: true })
}

/* ---------------------------------- fields ---------------------------------- */

/** First validation message of a field (Zod issues come through Standard Schema as `{ message }`). */
function useFieldError(): string | undefined {
	const field = useFieldContext<unknown>()
	const [error] = field.state.meta.errors
	if (!error) return undefined
	if (typeof error === 'string') return error
	if (typeof error === 'object' && 'message' in error) return String(error.message)
	return undefined
}

type BaseFieldProps = {
	label?: ReactNode
	description?: ReactNode
	className?: string
	/** Keeps the label for assistive tech only (inline layouts). */
	hideLabel?: boolean
}

type TextFieldProps = BaseFieldProps & {
	inputClassName?: string
	type?: HTMLInputTypeAttribute
	placeholder?: string
	inputMode?: 'text' | 'decimal' | 'numeric' | 'search' | 'email' | 'url'
	autoComplete?: string
	enterKeyHint?: 'enter' | 'done' | 'go' | 'next' | 'search' | 'send'
	/** Formats as the user types, e.g. `MASKS.cpf`. */
	mask?: Mask
	suffix?: ReactNode
	/** DOM id of the input; defaults to the field name. Set it when one page has several forms. */
	id?: string
}

function TextField({
	id,
	type = 'text',
	placeholder,
	inputMode,
	autoComplete = 'off',
	enterKeyHint = 'done',
	mask,
	suffix,
	label,
	hideLabel,
	inputClassName,
	...props
}: TextFieldProps) {
	const field = useFieldContext<string>()
	const error = useFieldError()
	const ref = useControlRef<HTMLInputElement>()
	const input = (
		<Input
			ref={ref}
			id={id ?? field.name}
			name={field.name}
			type={type}
			value={field.state.value}
			placeholder={placeholder}
			inputMode={mask ? 'numeric' : inputMode}
			autoComplete={autoComplete}
			enterKeyHint={enterKeyHint}
			spellCheck={false}
			autoCorrect="off"
			maxLength={mask?.length}
			onBlur={field.handleBlur}
			onChange={(event) =>
				field.handleChange(mask ? applyMask(event.target.value, mask) : event.target.value)
			}
			className={cn(suffix && 'pr-12', mask && 'tabular', inputClassName)}
		/>
	)

	return (
		<Field {...props} label={label} hideLabel={hideLabel} error={error}>
			{suffix ? (
				<div className="relative">
					{input}
					<span className="text-fg-subtle pointer-events-none absolute inset-y-0 right-3.5 flex items-center text-sm">
						{suffix}
					</span>
				</div>
			) : (
				input
			)}
		</Field>
	)
}

/**
 * Numeric input (kept as a string in form state; the Zod schema converts it). Only what a number
 * can contain gets typed (digits, one decimal separator unless `integer`, a minus when negatives are
 * allowed), and it behaves as a spinbutton: ↑/↓ step (Shift ×10), PageUp/PageDown ±10 steps,
 * Home/End jump to `min`/`max`, never past the limits. Pass the same limits as the schema.
 */
function NumberField({
	min,
	max,
	step,
	integer,
	allowNegative,
	suffix,
	label,
	hideLabel,
	inputClassName,
	placeholder,
	id,
	enterKeyHint = 'done',
	...props
}: Omit<TextFieldProps, 'type' | 'inputMode' | 'mask'> & NumericOptions) {
	const field = useFieldContext<string>()
	const error = useFieldError()
	const ref = useControlRef<HTMLInputElement>()
	const options = { min, max, step, integer, allowNegative }
	const current = readNumeric(field.state.value)
	const input = (
		<Input
			ref={ref}
			id={id ?? field.name}
			name={field.name}
			type="text"
			role="spinbutton"
			aria-valuenow={current ?? undefined}
			aria-valuemin={min}
			aria-valuemax={max}
			inputMode={integer ? 'numeric' : 'decimal'}
			autoComplete="off"
			enterKeyHint={enterKeyHint}
			spellCheck={false}
			autoCorrect="off"
			value={field.state.value}
			placeholder={placeholder}
			onBlur={field.handleBlur}
			onChange={(event) => field.handleChange(sanitizeNumeric(event.target.value, options))}
			onKeyDown={(event) => {
				if (event.altKey || event.ctrlKey || event.metaKey) return
				const next = stepNumeric(field.state.value, event.key, event.shiftKey, options)
				if (next === null) return
				event.preventDefault()
				field.handleChange(next)
			}}
			className={cn('tabular', suffix && 'pr-12', inputClassName)}
		/>
	)
	return (
		<Field {...props} label={label} hideLabel={hideLabel} error={error}>
			{suffix ? (
				<div className="relative">
					{input}
					<span className="text-fg-subtle pointer-events-none absolute inset-y-0 right-3.5 flex items-center text-sm">
						{suffix}
					</span>
				</div>
			) : (
				input
			)}
		</Field>
	)
}

function TextareaField({
	id,
	placeholder,
	rows = 5,
	spellCheck = false,
	...props
}: BaseFieldProps & {
	id?: string
	placeholder?: string
	rows?: number
	/** Off by default: most text areas here take code (JSON, JWT, Base64, HTML). Turn on for prose. */
	spellCheck?: boolean
}) {
	const field = useFieldContext<string>()
	const error = useFieldError()
	const ref = useControlRef<HTMLTextAreaElement>()
	return (
		<Field {...props} error={error}>
			<Textarea
				ref={ref}
				id={id ?? field.name}
				name={field.name}
				spellCheck={spellCheck}
				autoComplete="off"
				autoCorrect="off"
				autoCapitalize="off"
				rows={rows}
				value={field.state.value}
				placeholder={placeholder}
				onBlur={field.handleBlur}
				onChange={(event) => field.handleChange(event.target.value)}
			/>
		</Field>
	)
}

function SelectField<T extends string>({
	options,
	placeholder,
	...props
}: BaseFieldProps & { options: ReadonlyArray<SelectOption<T>>; placeholder?: string }) {
	const field = useFieldContext<T>()
	const error = useFieldError()
	const ref = useControlRef<HTMLButtonElement>()
	return (
		<Field {...props} error={error}>
			<Select<T>
				triggerRef={ref}
				name={field.name}
				options={options}
				placeholder={placeholder}
				value={field.state.value}
				onValueChange={(value) => field.handleChange(value)}
				onBlur={field.handleBlur}
			/>
		</Field>
	)
}

function RadioField<T extends string>({
	options,
	...props
}: BaseFieldProps & { options: ReadonlyArray<RadioOption<T>> }) {
	const field = useFieldContext<T>()
	const error = useFieldError()
	const ref = useControlRef<HTMLDivElement>()
	return (
		<Field {...props} error={error}>
			<RadioGroup<T>
				ref={ref}
				name={field.name}
				options={options}
				value={field.state.value}
				onValueChange={(value) => field.handleChange(value)}
			/>
		</Field>
	)
}

/** Date typed (dd/mm/aaaa) or picked from the calendar; the long form confirms what was entered. */
function DateField({ description, ...props }: BaseFieldProps) {
	const field = useFieldContext<string>()
	const error = useFieldError()
	const ref = useControlRef<HTMLInputElement>()
	const long = formatLongDate(field.state.value)
	return (
		<Field
			{...props}
			description={long ? <span className="first-letter:uppercase">{long}</span> : description}
			error={error}
		>
			<DatePicker
				inputRef={ref}
				id={field.name}
				name={field.name}
				value={field.state.value}
				onValueChange={(value) => field.handleChange(value)}
				onBlur={field.handleBlur}
			/>
		</Field>
	)
}

function TimeField(props: BaseFieldProps) {
	const field = useFieldContext<string>()
	const error = useFieldError()
	const ref = useControlRef<HTMLInputElement>()
	return (
		<Field {...props} error={error}>
			<TimeInput
				inputRef={ref}
				id={field.name}
				name={field.name}
				value={field.state.value}
				onValueChange={(value) => field.handleChange(value)}
				onBlur={field.handleBlur}
			/>
		</Field>
	)
}

/** A whole number picked on a track, with the current value shown large next to the label. */
function SliderField({
	label,
	description,
	min = 1,
	max = 20,
	step = 1,
	editable = false,
	unit,
}: {
	label: ReactNode
	description?: ReactNode
	min?: number
	max?: number
	step?: number
	/** A number box next to the label to type the value (same limits, arrows step it). */
	editable?: boolean
	/** Shown after the value, e.g. "caracteres". */
	unit?: string
}) {
	const field = useFieldContext<number>()
	const ref = useControlRef<HTMLInputElement>()
	const id = field.name
	// The box shows what is typed; the field only takes it once it is a valid number in range.
	const [draft, setDraft] = useState<string | null>(null)
	const options = { min, max, step, integer: Number.isInteger(step) }
	const commit = (text: string) => {
		const value = readNumeric(text)
		if (value !== null && value >= min && value <= max) field.handleChange(value)
	}
	return (
		<div className="flex flex-col gap-3">
			<div className="flex items-center justify-between gap-3">
				<span id={`${id}-label`} className="text-fg text-sm font-medium">
					{label}
				</span>
				{editable ? (
					<span className="flex items-center gap-2">
						<Input
							type="text"
							role="spinbutton"
							aria-label={typeof label === 'string' ? `${label} (valor)` : 'Valor'}
							aria-valuenow={field.state.value}
							aria-valuemin={min}
							aria-valuemax={max}
							inputMode="numeric"
							autoComplete="off"
							value={draft ?? String(field.state.value)}
							onChange={(event) => {
								const text = sanitizeNumeric(event.target.value, options)
								setDraft(text)
								commit(text)
							}}
							onKeyDown={(event) => {
								const next = stepNumeric(
									draft ?? String(field.state.value),
									event.key,
									event.shiftKey,
									options,
								)
								if (next === null) return
								event.preventDefault()
								setDraft(null)
								commit(next)
							}}
							// Out of range or empty when leaving: back to the current value.
							onBlur={() => setDraft(null)}
							className="tabular h-10 w-20 text-center text-base font-semibold"
						/>
						{unit ? <span className="text-fg-muted text-sm">{unit}</span> : null}
					</span>
				) : (
					<output className="text-accent tabular text-2xl leading-none font-extrabold">
						{field.state.value}
					</output>
				)}
			</div>
			<Slider
				thumbRef={ref}
				name={field.name}
				value={field.state.value}
				min={min}
				max={max}
				step={step}
				aria-labelledby={`${id}-label`}
				aria-describedby={description ? `${id}-desc` : undefined}
				onBlur={field.handleBlur}
				onValueChange={(value) => field.handleChange(value)}
			/>
			<div aria-hidden="true" className="text-fg-subtle tabular flex justify-between text-xs">
				<span>{min}</span>
				<span>{max}</span>
			</div>
			{description ? (
				<p id={`${id}-desc`} className="text-fg-muted text-[0.8125rem]">
					{description}
				</p>
			) : null}
		</div>
	)
}

/** On/off option that applies right away (generators restyle or regenerate on change). */
function SwitchField({
	label,
	description,
	className,
}: {
	label: ReactNode
	description?: ReactNode
	className?: string
}) {
	const field = useFieldContext<boolean>()
	return (
		<Switch
			className={className}
			name={field.name}
			label={label}
			description={description}
			checked={field.state.value}
			onCheckedChange={(checked) => field.handleChange(checked)}
		/>
	)
}

function CheckboxField({ label, description }: { label: ReactNode; description?: ReactNode }) {
	const field = useFieldContext<boolean>()
	return (
		<Checkbox
			name={field.name}
			label={label}
			description={description}
			checked={field.state.value}
			onCheckedChange={(checked) => field.handleChange(checked)}
		/>
	)
}

/** A hex colour picked from a popover (saturation, hue, hex input, presets). */
function ColorField(props: BaseFieldProps) {
	const field = useFieldContext<string>()
	const error = useFieldError()
	const ref = useControlRef<HTMLButtonElement>()
	const labelId = `${field.name}-label`
	return (
		<Field {...props} label={undefined} error={error}>
			{props.label ? (
				<span id={labelId} className="text-fg text-sm leading-none font-medium">
					{props.label}
				</span>
			) : null}
			<ColorPicker
				id={field.name}
				triggerRef={ref}
				aria-labelledby={props.label ? labelId : undefined}
				value={field.state.value}
				onValueChange={(hex) => field.handleChange(hex)}
				onBlur={field.handleBlur}
			/>
		</Field>
	)
}

function SubmitButton({ children, size = 'lg', ...props }: Omit<ButtonProps, 'type'>) {
	const form = useFormContext()
	return (
		<form.Subscribe selector={(state) => state.isSubmitting}>
			{(isSubmitting) => (
				<Button
					type="submit"
					size={size}
					disabled={isSubmitting}
					aria-keyshortcuts={SUBMIT_SHORTCUT_ARIA}
					{...props}
				>
					{isSubmitting ? <LoaderCircle aria-hidden="true" className="animate-spin" /> : null}
					{children}
					<SubmitShortcutHint className="ml-1.5 opacity-75" />
				</Button>
			)}
		</form.Subscribe>
	)
}

export { useControlRef, useFieldError }

export const { useAppForm, withForm } = createFormHook({
	fieldContext,
	formContext,
	fieldComponents: {
		TextField,
		NumberField,
		TextareaField,
		SelectField,
		RadioField,
		CheckboxField,
		DateField,
		TimeField,
		SliderField,
		SwitchField,
		ColorField,
	},
	formComponents: { SubmitButton },
})
