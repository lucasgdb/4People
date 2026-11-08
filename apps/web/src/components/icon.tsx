import {
	ArrowLeftRight,
	Binary,
	Calculator,
	CalendarDays,
	Check,
	type LucideProps,
	Monitor,
	RefreshCw,
	Server,
	Shapes,
	Sigma,
	SquareTerminal,
	Table2,
	Type,
	Wifi,
	Wrench,
} from 'lucide-react'

const ICONS = {
	computer: Monitor,
	refresh: RefreshCw,
	check: Check,
	text: Type,
	wifi: Wifi,
	binary: Binary,
	table: Table2,
	sigma: Sigma,
	shapes: Shapes,
	calendar: CalendarDays,
	calculator: Calculator,
	wrench: Wrench,
	convert: ArrowLeftRight,
	terminal: SquareTerminal,
	server: Server,
} as const

export type IconName = keyof typeof ICONS

export function Icon({ name, ...props }: LucideProps & { name: IconName }) {
	const Component = ICONS[name]
	return <Component aria-hidden="true" strokeWidth={1.5} {...props} />
}
