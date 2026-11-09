'use client'

import { Popover } from '@base-ui/react/popover'
import {
	type KeyboardEvent,
	type Ref,
	useEffect,
	useId,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from 'react'
import { cn } from '../lib/cn.ts'
import { Input } from './input.tsx'

/* --------------------------------- dates --------------------------------- */
// Values are ISO calendar dates ("2026-11-07"), handled as local dates (no time zone drift).

const pad = (n: number) => String(n).padStart(2, '0')
const toISO = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`
const daysIn = (y: number, m: number) => new Date(y, m + 1, 0).getDate()

function parseISO(value: string): { y: number; m: number; d: number } | null {
	const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
	if (!match) return null
	const [y, m, d] = [Number(match[1]), Number(match[2]) - 1, Number(match[3])]
	if (m < 0 || m > 11 || d < 1 || d > daysIn(y, m)) return null
	return { y, m, d }
}

/** "07/11/2026" → "2026-11-07"; null when incomplete or impossible (31/02). */
function parseTyped(text: string): string | null {
	const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(text)
	if (!match) return null
	const iso = `${match[3]}-${match[2]}-${match[1]}`
	return parseISO(iso) ? iso : null
}

const formatTyped = (iso: string) => {
	const date = parseISO(iso)
	return date ? `${pad(date.d)}/${pad(date.m + 1)}/${date.y}` : ''
}

/** dd/mm/aaaa mask applied while typing. */
function maskDate(raw: string) {
	const digits = raw.replace(/\D/g, '').slice(0, 8)
	return [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4)].filter(Boolean).join('/')
}

const MONTHS = Array.from({ length: 12 }, (_, m) =>
	new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(new Date(2000, m, 1)),
)
const MONTHS_SHORT = MONTHS.map((name) => name.slice(0, 3))
const WEEKDAYS = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb']
const WEEKDAYS_LONG = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado']
const longDate = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full' })

const todayParts = () => {
	const now = new Date()
	return { y: now.getFullYear(), m: now.getMonth(), d: now.getDate() }
}

/** Long, human form of an ISO date ("sábado, 7 de novembro de 2026"), for hints and labels. */
export function formatLongDate(iso: string) {
	const date = parseISO(iso)
	return date ? longDate.format(new Date(date.y, date.m, date.d)) : ''
}

/* -------------------------------- calendar -------------------------------- */

type View = 'days' | 'months' | 'years'

const cellBase =
	'flex cursor-pointer items-center justify-center rounded-control text-sm tabular outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent'

function Calendar({
	value,
	onSelect,
	focusRef,
}: {
	value: string
	onSelect: (iso: string) => void
	focusRef: Ref<HTMLButtonElement>
}) {
	const selected = parseISO(value)
	const today = todayParts()
	const start = selected ?? today
	const [view, setView] = useState<View>('days')
	const [cursor, setCursor] = useState({ y: start.y, m: start.m, d: start.d })
	const gridRef = useRef<HTMLTableElement>(null)
	const titleId = useId()

	const weeks = useMemo(() => {
		const first = new Date(cursor.y, cursor.m, 1).getDay()
		const cells: { y: number; m: number; d: number; outside: boolean }[] = []
		for (let i = 0; i < 42; i += 1) {
			const date = new Date(cursor.y, cursor.m, 1 - first + i)
			cells.push({
				y: date.getFullYear(),
				m: date.getMonth(),
				d: date.getDate(),
				outside: date.getMonth() !== cursor.m,
			})
		}
		return Array.from({ length: 6 }, (_, w) => cells.slice(w * 7, w * 7 + 7))
	}, [cursor.y, cursor.m])

	/** Moves the keyboard cursor; focus follows it right after the commit (roving tabindex). */
	const focusPending = useRef(false)
	function moveTo(date: Date) {
		focusPending.current = true
		setCursor({ y: date.getFullYear(), m: date.getMonth(), d: date.getDate() })
	}
	// Layout effect: runs before the next keystroke is handled, so fast key repeats stay in sync.
	useLayoutEffect(() => {
		if (!focusPending.current) return
		focusPending.current = false
		gridRef.current?.querySelector<HTMLButtonElement>('[tabindex="0"]')?.focus()
	})

	function onGridKeyDown(event: KeyboardEvent) {
		const base = new Date(cursor.y, cursor.m, cursor.d)
		const shift = (days: number) => new Date(cursor.y, cursor.m, cursor.d + days)
		const months = (n: number) =>
			new Date(cursor.y, cursor.m + n, Math.min(cursor.d, daysIn(cursor.y, cursor.m + n)))
		let next: Date
		switch (event.key) {
			case 'ArrowLeft':
				next = shift(-1)
				break
			case 'ArrowRight':
				next = shift(1)
				break
			case 'ArrowUp':
				next = shift(-7)
				break
			case 'ArrowDown':
				next = shift(7)
				break
			case 'Home':
				next = shift(-base.getDay())
				break
			case 'End':
				next = shift(6 - base.getDay())
				break
			case 'PageUp':
				next = months(event.shiftKey ? -12 : -1)
				break
			case 'PageDown':
				next = months(event.shiftKey ? 12 : 1)
				break
			default:
				return
		}
		event.preventDefault()
		moveTo(next)
	}

	const stepMonth = (n: number) =>
		setCursor((c) => {
			const date = new Date(c.y, c.m + n, 1)
			return {
				y: date.getFullYear(),
				m: date.getMonth(),
				d: Math.min(c.d, daysIn(date.getFullYear(), date.getMonth())),
			}
		})
	const yearPage = Math.floor(cursor.y / 12) * 12

	const header = {
		days: {
			title: `${MONTHS[cursor.m]} de ${cursor.y}`,
			prev: () => stepMonth(-1),
			next: () => stepMonth(1),
			prevLabel: 'Mês anterior',
			nextLabel: 'Próximo mês',
			up: () => setView('months'),
			upLabel: 'Escolher mês e ano',
		},
		months: {
			title: String(cursor.y),
			prev: () => setCursor((c) => ({ ...c, y: c.y - 1 })),
			next: () => setCursor((c) => ({ ...c, y: c.y + 1 })),
			prevLabel: 'Ano anterior',
			nextLabel: 'Próximo ano',
			up: () => setView('years'),
			upLabel: 'Escolher ano',
		},
		years: {
			title: `${yearPage} – ${yearPage + 11}`,
			prev: () => setCursor((c) => ({ ...c, y: c.y - 12 })),
			next: () => setCursor((c) => ({ ...c, y: c.y + 12 })),
			prevLabel: 'Anos anteriores',
			nextLabel: 'Próximos anos',
			up: undefined,
			upLabel: '',
		},
	}[view]

	const arrow = (d: string) => (
		<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-4">
			<path
				d={d}
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	)

	return (
		<div className="flex w-[18.5rem] flex-col gap-2">
			<div className="flex items-center gap-1">
				<button
					type="button"
					onClick={header.up}
					disabled={!header.up}
					aria-label={header.up ? `${header.title}. ${header.upLabel}` : undefined}
					id={titleId}
					aria-live="polite"
					className="rounded-control text-fg hover:bg-surface-sunken flex h-10 flex-1 cursor-pointer items-center gap-1 px-2 text-left text-sm font-semibold first-letter:uppercase disabled:cursor-default disabled:hover:bg-transparent"
				>
					<span className="first-letter:uppercase">{header.title}</span>
					{header.up ? (
						<span className="text-fg-muted">{arrow('m4.5 6.5 3.5 3.5 3.5-3.5')}</span>
					) : null}
				</button>
				<button
					type="button"
					onClick={header.prev}
					aria-label={header.prevLabel}
					className="rounded-control text-fg-muted hover:bg-surface-sunken hover:text-fg flex size-10 cursor-pointer items-center justify-center"
				>
					{arrow('m10 3.5-4.5 4.5 4.5 4.5')}
				</button>
				<button
					type="button"
					onClick={header.next}
					aria-label={header.nextLabel}
					className="rounded-control text-fg-muted hover:bg-surface-sunken hover:text-fg flex size-10 cursor-pointer items-center justify-center"
				>
					{arrow('m6 3.5 4.5 4.5L6 12.5')}
				</button>
			</div>

			{view === 'days' ? (
				<table
					ref={gridRef}
					// biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: WAI-ARIA APG date picker pattern (table role=grid).
					role="grid"
					aria-labelledby={titleId}
					onKeyDown={onGridKeyDown}
					className="w-full table-fixed border-collapse"
				>
					<thead>
						<tr>
							{WEEKDAYS.map((day, index) => (
								<th
									key={day}
									scope="col"
									abbr={WEEKDAYS_LONG[index]}
									className="text-fg-muted h-8 text-[0.8125rem] font-normal"
								>
									{day}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{weeks.map((week) => (
							<tr key={`${week[0]?.y}-${week[0]?.m}-${week[0]?.d}`}>
								{week.map((cell) => {
									const iso = toISO(cell.y, cell.m, cell.d)
									const isSelected = value === iso
									const isToday = cell.y === today.y && cell.m === today.m && cell.d === today.d
									const isCursor = cell.y === cursor.y && cell.m === cursor.m && cell.d === cursor.d
									return (
										// biome-ignore lint/a11y/useAriaPropsSupportedByRole: inside role=grid each td is a gridcell, which supports aria-selected.
										<td key={iso} aria-selected={isSelected} className="p-0">
											<button
												ref={isCursor ? focusRef : undefined}
												type="button"
												tabIndex={isCursor ? 0 : -1}
												aria-label={longDate.format(new Date(cell.y, cell.m, cell.d))}
												aria-current={isToday ? 'date' : undefined}
												onClick={() => onSelect(iso)}
												className={cn(
													cellBase,
													'aspect-square w-full',
													isSelected
														? 'bg-primary text-primary-fg font-semibold'
														: isToday
															? 'text-accent hover:bg-surface-sunken font-semibold shadow-[inset_0_0_0_1px_var(--color-accent)]'
															: cell.outside
																? 'text-fg-subtle hover:bg-surface-sunken'
																: 'text-fg hover:bg-surface-sunken',
												)}
											>
												{cell.d}
											</button>
										</td>
									)
								})}
							</tr>
						))}
					</tbody>
				</table>
			) : view === 'months' ? (
				<div className="grid grid-cols-3 gap-1">
					{MONTHS_SHORT.map((name, m) => (
						<button
							key={name}
							type="button"
							onClick={() => {
								setCursor((c) => ({ y: c.y, m, d: Math.min(c.d, daysIn(c.y, m)) }))
								setView('days')
							}}
							className={cn(
								cellBase,
								'h-12 capitalize',
								selected && selected.y === cursor.y && selected.m === m
									? 'bg-primary text-primary-fg font-semibold'
									: 'text-fg hover:bg-surface-sunken',
							)}
						>
							{name}
						</button>
					))}
				</div>
			) : (
				<div className="grid grid-cols-3 gap-1">
					{Array.from({ length: 12 }, (_, i) => yearPage + i).map((year) => (
						<button
							key={year}
							type="button"
							onClick={() => {
								setCursor((c) => ({ ...c, y: year, d: Math.min(c.d, daysIn(year, c.m)) }))
								setView('months')
							}}
							className={cn(
								cellBase,
								'h-12',
								selected?.y === year
									? 'bg-primary text-primary-fg font-semibold'
									: year === today.y
										? 'text-accent hover:bg-surface-sunken font-semibold'
										: 'text-fg hover:bg-surface-sunken',
							)}
						>
							{year}
						</button>
					))}
				</div>
			)}

			<div className="border-border flex items-center justify-between border-t pt-2">
				<button
					type="button"
					onClick={() => onSelect(toISO(today.y, today.m, today.d))}
					className="rounded-control text-fg hover:bg-surface-sunken h-10 cursor-pointer px-4 text-sm font-semibold"
				>
					Hoje
				</button>
				<Popover.Close className="rounded-control text-fg-muted hover:bg-surface-sunken hover:text-fg h-10 cursor-pointer px-4 text-sm">
					Fechar
				</Popover.Close>
			</div>
		</div>
	)
}

/* ------------------------------- date picker ------------------------------ */

export type DatePickerProps = {
	/** ISO date ("2026-11-07"); while the user is typing an incomplete date, the masked text. */
	value: string
	onValueChange: (value: string) => void
	onBlur?: () => void
	id?: string
	name?: string
	inputRef?: Ref<HTMLInputElement>
	className?: string
}

/**
 * A date field you can type into (dd/mm/aaaa, masked) or pick from a calendar. The calendar has day,
 * month and year views, full keyboard support (arrows, PageUp/PageDown, Home/End) and a "Hoje"
 * shortcut. The value is an ISO date, or the typed text while it is not a complete, real date.
 */
export function DatePicker({
	value,
	onValueChange,
	onBlur,
	id,
	name,
	inputRef,
	className,
}: DatePickerProps) {
	const [open, setOpen] = useState(false)
	const [text, setText] = useState(() => (parseISO(value) ? formatTyped(value) : value))
	const anchorRef = useRef<HTMLDivElement>(null)
	const focusRef = useRef<HTMLButtonElement>(null)

	// Keep the text in sync when the value changes from outside (calendar, defaults, reset).
	useEffect(() => {
		if (parseISO(value)) {
			setText((current) => (parseTyped(current) === value ? current : formatTyped(value)))
		} else if (value === '') {
			setText('')
		}
	}, [value])

	return (
		<div ref={anchorRef} className={cn('relative', className)}>
			<Input
				ref={inputRef}
				id={id}
				name={name}
				value={text}
				placeholder="dd/mm/aaaa"
				inputMode="numeric"
				autoComplete="off"
				enterKeyHint="done"
				maxLength={10}
				onBlur={onBlur}
				onChange={(event) => {
					const masked = maskDate(event.target.value)
					setText(masked)
					onValueChange(parseTyped(masked) ?? masked)
				}}
				onKeyDown={(event) => {
					if (event.key === 'ArrowDown' && event.altKey) {
						event.preventDefault()
						setOpen(true)
					}
				}}
				className="tabular pr-12"
			/>
			<Popover.Root open={open} onOpenChange={setOpen}>
				<Popover.Trigger
					aria-label="Abrir calendário"
					className="text-fg-muted hover:bg-surface-sunken hover:text-fg focus-visible:ring-ring data-popup-open:bg-surface-sunken data-popup-open:text-fg absolute top-1/2 right-1 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full transition-colors outline-none focus-visible:ring-2"
				>
					<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-[1.125rem]">
						<rect
							x="3"
							y="4.75"
							width="18"
							height="16.5"
							rx="2.5"
							stroke="currentColor"
							strokeWidth="1.5"
						/>
						<path
							d="M3 9.75h18M8 2.75v4M16 2.75v4"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="round"
						/>
						<path
							d="M7.5 13.5h.01M12 13.5h.01M16.5 13.5h.01M7.5 17h.01M12 17h.01"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
						/>
					</svg>
				</Popover.Trigger>
				<Popover.Portal>
					<Popover.Positioner
						anchor={anchorRef}
						align="start"
						sideOffset={6}
						className="z-50 outline-none"
					>
						<Popover.Popup
							initialFocus={focusRef}
							aria-label="Calendário"
							className="rounded-panel border-border bg-surface text-fg shadow-float origin-(--transform-origin) border p-4 transition-[scale,opacity] duration-(--ds-motion-fast) outline-none data-ending-style:scale-[0.97] data-ending-style:opacity-0 data-starting-style:scale-[0.97] data-starting-style:opacity-0"
						>
							<Calendar
								value={parseISO(value) ? value : ''}
								focusRef={focusRef}
								onSelect={(iso) => {
									onValueChange(iso)
									setText(formatTyped(iso))
									setOpen(false)
								}}
							/>
						</Popover.Popup>
					</Popover.Positioner>
				</Popover.Portal>
			</Popover.Root>
		</div>
	)
}

/* ------------------------------- time input ------------------------------- */

/** hh:mm mask applied while typing. */
function maskTime(raw: string) {
	const digits = raw.replace(/\D/g, '').slice(0, 4)
	return digits.length > 2 ? `${digits.slice(0, 2)}:${digits.slice(2)}` : digits
}

export type TimeInputProps = {
	value: string
	onValueChange: (value: string) => void
	onBlur?: () => void
	id?: string
	name?: string
	inputRef?: Ref<HTMLInputElement>
	className?: string
}

/** A 24h time field (hh:mm, masked). Arrow Up/Down step one minute, Shift steps an hour. */
export function TimeInput({
	value,
	onValueChange,
	onBlur,
	id,
	name,
	inputRef,
	className,
}: TimeInputProps) {
	return (
		<Input
			ref={inputRef}
			id={id}
			name={name}
			value={value}
			placeholder="hh:mm"
			inputMode="numeric"
			autoComplete="off"
			maxLength={5}
			onBlur={onBlur}
			onChange={(event) => onValueChange(maskTime(event.target.value))}
			onKeyDown={(event) => {
				if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return
				const match = /^(\d{2}):(\d{2})$/.exec(value)
				if (!match) return
				event.preventDefault()
				const step = (event.key === 'ArrowUp' ? 1 : -1) * (event.shiftKey ? 60 : 1)
				const total = (((Number(match[1]) * 60 + Number(match[2]) + step) % 1440) + 1440) % 1440
				onValueChange(`${pad(Math.floor(total / 60))}:${pad(total % 60)}`)
			}}
			className={cn('tabular', className)}
		/>
	)
}
