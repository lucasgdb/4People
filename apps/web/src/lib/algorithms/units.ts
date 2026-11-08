/**
 * Unit conversion like Google's converter: each category has a base unit and every unit says how to
 * go to and from it. Most units are a plain factor (1 pé = 0,3048 m); temperature has an offset and
 * fuel economy has an inverse unit (L/100 km), so those use functions.
 *
 * Factors are exact by definition where one exists (international yard and pound, 1959; the
 * thermochemical calorie; the 2019 SI electronvolt) and otherwise come from NIST SP 811.
 */

export type Unit = {
	id: string
	name: string
	symbol: string
	/** Value in the base unit = toBase(value). Linear units only need `factor`. */
	factor?: number
	toBase?: (value: number) => number
	fromBase?: (value: number) => number
}

export type Category = {
	id: string
	name: string
	units: readonly Unit[]
	/** Default pair shown when the category is picked. */
	pair: readonly [string, string]
	/** Negative values make sense (temperature) — otherwise the field refuses the minus sign. */
	allowNegative?: boolean
	/** Formula for pairs that aren't a plain factor. */
	formula?: (from: Unit, to: Unit) => string | null
}

const u = (id: string, name: string, symbol: string, factor: number): Unit => ({
	id,
	name,
	symbol,
	factor,
})

const INCH = 0.0254
const FOOT = 0.3048
const YARD = 0.9144
const MILE = 1609.344
const NAUTICAL_MILE = 1852
const POUND = 0.45359237
const US_GALLON = 3.785411784 // litres
const IMPERIAL_GALLON = 4.54609 // litres
const CALORIE = 4.184 // joules
const YEAR = 365.2425 * 86400 // Gregorian mean year, in seconds

const celsius = (offsetC: (v: number) => number, toC: (c: number) => number) => ({
	toBase: offsetC,
	fromBase: toC,
})

export const CATEGORIES: readonly Category[] = [
	{
		id: 'comprimento',
		name: 'Comprimento',
		pair: ['m', 'cm'],
		units: [
			u('km', 'Quilômetro', 'km', 1000),
			u('m', 'Metro', 'm', 1),
			u('cm', 'Centímetro', 'cm', 0.01),
			u('mm', 'Milímetro', 'mm', 0.001),
			u('um', 'Micrômetro', 'µm', 1e-6),
			u('nm', 'Nanômetro', 'nm', 1e-9),
			u('mi', 'Milha', 'mi', MILE),
			u('yd', 'Jarda', 'yd', YARD),
			u('ft', 'Pé', 'ft', FOOT),
			u('in', 'Polegada', 'in', INCH),
			u('nmi', 'Milha náutica', 'nmi', NAUTICAL_MILE),
		],
	},
	{
		id: 'massa',
		name: 'Massa',
		pair: ['kg', 'lb'],
		units: [
			u('t', 'Tonelada', 't', 1000),
			u('arroba', 'Arroba', '@', 15),
			u('kg', 'Quilograma', 'kg', 1),
			u('g', 'Grama', 'g', 0.001),
			u('mg', 'Miligrama', 'mg', 1e-6),
			u('ug', 'Micrograma', 'µg', 1e-9),
			u('lb', 'Libra', 'lb', POUND),
			u('oz', 'Onça', 'oz', POUND / 16),
			u('st', 'Stone', 'st', POUND * 14),
		],
	},
	{
		id: 'temperatura',
		name: 'Temperatura',
		pair: ['c', 'f'],
		allowNegative: true,
		units: [
			{
				id: 'c',
				name: 'Celsius',
				symbol: '°C',
				...celsius(
					(v) => v,
					(c) => c,
				),
			},
			{
				id: 'f',
				name: 'Fahrenheit',
				symbol: '°F',
				...celsius(
					(f) => ((f - 32) * 5) / 9,
					(c) => (c * 9) / 5 + 32,
				),
			},
			{
				id: 'k',
				name: 'Kelvin',
				symbol: 'K',
				...celsius(
					(k) => k - 273.15,
					(c) => c + 273.15,
				),
			},
		],
		formula: (from, to) => TEMPERATURE_FORMULAS[`${from.id}-${to.id}`] ?? null,
	},
	{
		id: 'area',
		name: 'Área',
		pair: ['m2', 'ft2'],
		units: [
			u('km2', 'Quilômetro quadrado', 'km²', 1e6),
			u('ha', 'Hectare', 'ha', 1e4),
			u('alq-sp', 'Alqueire paulista', 'alq. SP', 24200),
			u('alq-mg', 'Alqueire mineiro', 'alq. MG', 48400),
			u('m2', 'Metro quadrado', 'm²', 1),
			u('cm2', 'Centímetro quadrado', 'cm²', 1e-4),
			u('mi2', 'Milha quadrada', 'mi²', MILE * MILE),
			u('acre', 'Acre', 'ac', 4046.8564224),
			u('yd2', 'Jarda quadrada', 'yd²', YARD * YARD),
			u('ft2', 'Pé quadrado', 'ft²', FOOT * FOOT),
			u('in2', 'Polegada quadrada', 'in²', INCH * INCH),
		],
	},
	{
		id: 'volume',
		name: 'Volume',
		pair: ['l', 'ml'],
		units: [
			u('m3', 'Metro cúbico', 'm³', 1000),
			u('l', 'Litro', 'L', 1),
			u('ml', 'Mililitro', 'mL', 0.001),
			u('cm3', 'Centímetro cúbico', 'cm³', 0.001),
			u('cup', 'Xícara (240 mL)', 'xíc.', 0.24),
			u('tbsp', 'Colher de sopa (15 mL)', 'c. sopa', 0.015),
			u('tsp', 'Colher de chá (5 mL)', 'c. chá', 0.005),
			u('gal', 'Galão americano', 'gal', US_GALLON),
			u('qt', 'Quarto americano', 'qt', US_GALLON / 4),
			u('pt', 'Pint americano', 'pt', US_GALLON / 8),
			u('floz', 'Onça fluida americana', 'fl oz', US_GALLON / 128),
			u('gal-uk', 'Galão imperial', 'gal (UK)', IMPERIAL_GALLON),
			u('ft3', 'Pé cúbico', 'ft³', FOOT ** 3 * 1000),
			u('in3', 'Polegada cúbica', 'in³', INCH ** 3 * 1000),
		],
	},
	{
		id: 'velocidade',
		name: 'Velocidade',
		pair: ['kmh', 'mph'],
		units: [
			u('kmh', 'Quilômetro por hora', 'km/h', 1 / 3.6),
			u('ms', 'Metro por segundo', 'm/s', 1),
			u('mph', 'Milha por hora', 'mph', MILE / 3600),
			u('kn', 'Nó', 'kn', NAUTICAL_MILE / 3600),
			u('fts', 'Pé por segundo', 'ft/s', FOOT),
		],
	},
	{
		id: 'tempo',
		name: 'Tempo',
		pair: ['h', 'min'],
		units: [
			u('ns', 'Nanossegundo', 'ns', 1e-9),
			u('us', 'Microssegundo', 'µs', 1e-6),
			u('ms', 'Milissegundo', 'ms', 0.001),
			u('s', 'Segundo', 's', 1),
			u('min', 'Minuto', 'min', 60),
			u('h', 'Hora', 'h', 3600),
			u('d', 'Dia', 'd', 86400),
			u('wk', 'Semana', 'sem.', 604800),
			u('mo', 'Mês (médio)', 'mês', YEAR / 12),
			u('yr', 'Ano (médio)', 'ano', YEAR),
			u('dec', 'Década', 'déc.', YEAR * 10),
			u('cent', 'Século', 'séc.', YEAR * 100),
		],
	},
	{
		id: 'armazenamento',
		name: 'Armazenamento de dados',
		pair: ['gb', 'mb'],
		units: [
			u('bit', 'Bit', 'bit', 1 / 8),
			u('b', 'Byte', 'B', 1),
			u('kb', 'Quilobyte', 'kB', 1e3),
			u('mb', 'Megabyte', 'MB', 1e6),
			u('gb', 'Gigabyte', 'GB', 1e9),
			u('tb', 'Terabyte', 'TB', 1e12),
			u('pb', 'Petabyte', 'PB', 1e15),
			u('kib', 'Kibibyte', 'KiB', 2 ** 10),
			u('mib', 'Mebibyte', 'MiB', 2 ** 20),
			u('gib', 'Gibibyte', 'GiB', 2 ** 30),
			u('tib', 'Tebibyte', 'TiB', 2 ** 40),
		],
	},
	{
		id: 'transferencia',
		name: 'Taxa de transferência',
		pair: ['mbps', 'mbs'],
		units: [
			u('bps', 'Bit por segundo', 'bit/s', 1),
			u('kbps', 'Quilobit por segundo', 'kbit/s', 1e3),
			u('mbps', 'Megabit por segundo', 'Mbit/s', 1e6),
			u('gbps', 'Gigabit por segundo', 'Gbit/s', 1e9),
			u('kbs', 'Quilobyte por segundo', 'kB/s', 8e3),
			u('mbs', 'Megabyte por segundo', 'MB/s', 8e6),
			u('gbs', 'Gigabyte por segundo', 'GB/s', 8e9),
		],
	},
	{
		id: 'energia',
		name: 'Energia',
		pair: ['kcal', 'kj'],
		units: [
			u('j', 'Joule', 'J', 1),
			u('kj', 'Quilojoule', 'kJ', 1000),
			u('cal', 'Caloria', 'cal', CALORIE),
			u('kcal', 'Quilocaloria', 'kcal', CALORIE * 1000),
			u('wh', 'Watt-hora', 'Wh', 3600),
			u('kwh', 'Quilowatt-hora', 'kWh', 3.6e6),
			u('ev', 'Elétron-volt', 'eV', 1.602176634e-19),
			u('btu', 'BTU', 'BTU', 1055.05585262),
		],
	},
	{
		id: 'potencia',
		name: 'Potência',
		pair: ['cv', 'kw'],
		units: [
			u('w', 'Watt', 'W', 1),
			u('kw', 'Quilowatt', 'kW', 1000),
			u('cv', 'Cavalo-vapor', 'cv', 735.49875),
			// Mechanical horsepower: 550 ft·lbf/s.
			u('hp', 'Horsepower', 'hp', 550 * FOOT * POUND * 9.80665),
			u('btuh', 'BTU por hora', 'BTU/h', 1055.05585262 / 3600),
		],
	},
	{
		id: 'pressao',
		name: 'Pressão',
		pair: ['psi', 'bar'],
		units: [
			u('pa', 'Pascal', 'Pa', 1),
			u('kpa', 'Quilopascal', 'kPa', 1000),
			u('bar', 'Bar', 'bar', 1e5),
			u('atm', 'Atmosfera', 'atm', 101325),
			u('psi', 'Libra por polegada quadrada', 'psi', (POUND * 9.80665) / (INCH * INCH)),
			u('mmhg', 'Milímetro de mercúrio', 'mmHg', 133.322387415),
			u('kgfcm2', 'Quilograma-força por cm²', 'kgf/cm²', 98066.5),
		],
	},
	{
		id: 'frequencia',
		name: 'Frequência',
		pair: ['ghz', 'mhz'],
		units: [
			u('hz', 'Hertz', 'Hz', 1),
			u('khz', 'Quilohertz', 'kHz', 1e3),
			u('mhz', 'Megahertz', 'MHz', 1e6),
			u('ghz', 'Gigahertz', 'GHz', 1e9),
			u('rpm', 'Rotação por minuto', 'rpm', 1 / 60),
		],
	},
	{
		id: 'consumo',
		name: 'Consumo de combustível',
		pair: ['kml', 'l100'],
		units: [
			u('kml', 'Quilômetro por litro', 'km/L', 1),
			{
				id: 'l100',
				name: 'Litro por 100 km',
				symbol: 'L/100 km',
				toBase: (v) => 100 / v,
				fromBase: (kml) => 100 / kml,
			},
			u('mpg', 'Milha por galão americano', 'mpg', MILE / 1000 / US_GALLON),
			u('mpg-uk', 'Milha por galão imperial', 'mpg (UK)', MILE / 1000 / IMPERIAL_GALLON),
		],
		formula: (from, to) =>
			from.id === 'l100' || to.id === 'l100'
				? from.id === to.id
					? null
					: `divida ${formatFactor(100 / factorOf(from.id === 'l100' ? to : from))} pelo valor`
				: null,
	},
	{
		id: 'angulo',
		name: 'Ângulo',
		pair: ['deg', 'rad'],
		allowNegative: true,
		units: [
			u('deg', 'Grau', '°', 1),
			u('rad', 'Radiano', 'rad', 180 / Math.PI),
			u('mrad', 'Miliradiano', 'mrad', 0.18 / Math.PI),
			u('grad', 'Grado', 'grad', 0.9),
			u('arcmin', 'Minuto de arco', '′', 1 / 60),
			u('arcsec', 'Segundo de arco', '″', 1 / 3600),
			u('turn', 'Volta', 'volta', 360),
		],
	},
]

const TEMPERATURE_FORMULAS: Record<string, string> = {
	'c-f': '(°C × 9/5) + 32 = °F',
	'f-c': '(°F − 32) × 5/9 = °C',
	'c-k': '°C + 273,15 = K',
	'k-c': 'K − 273,15 = °C',
	'f-k': '(°F − 32) × 5/9 + 273,15 = K',
	'k-f': '(K − 273,15) × 9/5 + 32 = °F',
}

const factorOf = (unit: Unit) => unit.factor ?? 1

export function categoryById(id: string): Category | undefined {
	return CATEGORIES.find((category) => category.id === id)
}

export function unitById(category: Category, id: string): Unit | undefined {
	return category.units.find((unit) => unit.id === id)
}

const toBase = (unit: Unit, value: number) =>
	unit.toBase ? unit.toBase(value) : value * factorOf(unit)
const fromBase = (unit: Unit, value: number) =>
	unit.fromBase ? unit.fromBase(value) : value / factorOf(unit)

/** `value` in `from`, expressed in `to`. Non-finite results (100 ÷ 0 km/L) come back as null. */
export function convertUnit(value: number, from: Unit, to: Unit): number | null {
	if (from.id === to.id) return value
	const result = fromBase(to, toBase(from, value))
	return Number.isFinite(result) ? result : null
}

/** A factor for reading: "1.000", "0,3048", "2,54". */
function formatFactor(value: number): string {
	return new Intl.NumberFormat('pt-BR', { maximumSignificantDigits: 10 }).format(value)
}

/**
 * Google-style formula line: "multiplique o valor por 100" or "divida o valor por 2,54"
 * (whichever reads as the rounder number), or the category's own formula.
 */
export function conversionFormula(category: Category, from: Unit, to: Unit): string | null {
	if (from.id === to.id) return null
	const custom = category.formula?.(from, to)
	if (custom) return custom
	if (from.toBase || to.toBase) return null
	const times = Number((factorOf(from) / factorOf(to)).toPrecision(10))
	const divide = Number((factorOf(to) / factorOf(from)).toPrecision(10))
	// The shorter, rounder number reads better: ÷ 2,54 instead of × 0,3937007874.
	const digits = (n: number) =>
		String(n)
			.replace('.', '')
			.replace(/^0+|0+$/g, '').length
	const useDivide = digits(divide) === digits(times) ? times < 1 : digits(divide) < digits(times)
	return useDivide
		? `divida o valor por ${formatFactor(divide)}`
		: `multiplique o valor por ${formatFactor(times)}`
}

/** Reads what people type: "1,5", "1.5", "1.234,5", "-40", "1,2e-7". Empty or invalid → null. */
export function parseAmount(text: string): number | null {
	const compact = text.trim().replace(/\s/g, '')
	if (!/\d/.test(compact)) return null
	const normalized = compact.includes(',') ? compact.replace(/\./g, '').replace(',', '.') : compact
	const value = Number(normalized)
	return Number.isFinite(value) ? value : null
}

/**
 * A result that can be read and typed back: up to 10 significant digits, no thousands separator,
 * and scientific notation ("1,5e-9") only for very large or very small values.
 */
export function formatAmount(value: number): string {
	if (value === 0 || Object.is(value, -0)) return '0'
	const size = Math.abs(value)
	if (size >= 1e15 || size < 1e-7) {
		const [mantissa = '0', exponent = '0'] = value.toExponential(6).split('e')
		const trimmed = mantissa.replace(/\.?0+$/, '').replace('.', ',')
		return `${trimmed}e${exponent.replace('+', '')}`
	}
	return new Intl.NumberFormat('pt-BR', {
		maximumSignificantDigits: 10,
		useGrouping: false,
	}).format(value)
}
