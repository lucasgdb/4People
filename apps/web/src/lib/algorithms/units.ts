/**
 * Unit conversion like Google's converter: each category has a base unit and every unit says how to
 * go to and from it. Most units are a plain factor (1 ft = 0.3048 m); temperature has an offset and
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

/** A unit that is a plain multiple of the category's base unit. */
function linearUnit(id: string, name: string, symbol: string, factor: number): Unit {
	return { id, name, symbol, factor }
}

/** A temperature unit, converted through Celsius (the category's base). */
function temperatureUnit(
	id: string,
	name: string,
	symbol: string,
	toCelsius: (value: number) => number,
	fromCelsius: (celsius: number) => number,
): Unit {
	return { id, name, symbol, toBase: toCelsius, fromBase: fromCelsius }
}

const INCH_METERS = 0.0254
const FOOT_METERS = 0.3048
const YARD_METERS = 0.9144
const MILE_METERS = 1609.344
const NAUTICAL_MILE_METERS = 1852
const POUND_KILOGRAMS = 0.45359237
const US_GALLON_LITERS = 3.785411784
const IMPERIAL_GALLON_LITERS = 4.54609
const CALORIE_JOULES = 4.184
const BTU_JOULES = 1055.05585262
const STANDARD_GRAVITY = 9.80665
/** Gregorian mean year. */
const YEAR_SECONDS = 365.2425 * 86400

export const CATEGORIES: readonly Category[] = [
	{
		id: 'comprimento',
		name: 'Comprimento',
		pair: ['m', 'cm'],
		units: [
			linearUnit('km', 'Quilômetro', 'km', 1000),
			linearUnit('m', 'Metro', 'm', 1),
			linearUnit('cm', 'Centímetro', 'cm', 0.01),
			linearUnit('mm', 'Milímetro', 'mm', 0.001),
			linearUnit('um', 'Micrômetro', 'µm', 1e-6),
			linearUnit('nm', 'Nanômetro', 'nm', 1e-9),
			linearUnit('mi', 'Milha', 'mi', MILE_METERS),
			linearUnit('yd', 'Jarda', 'yd', YARD_METERS),
			linearUnit('ft', 'Pé', 'ft', FOOT_METERS),
			linearUnit('in', 'Polegada', 'in', INCH_METERS),
			linearUnit('nmi', 'Milha náutica', 'nmi', NAUTICAL_MILE_METERS),
		],
	},
	{
		id: 'massa',
		name: 'Massa',
		pair: ['kg', 'lb'],
		units: [
			linearUnit('t', 'Tonelada', 't', 1000),
			linearUnit('arroba', 'Arroba', '@', 15),
			linearUnit('kg', 'Quilograma', 'kg', 1),
			linearUnit('g', 'Grama', 'g', 0.001),
			linearUnit('mg', 'Miligrama', 'mg', 1e-6),
			linearUnit('ug', 'Micrograma', 'µg', 1e-9),
			linearUnit('lb', 'Libra', 'lb', POUND_KILOGRAMS),
			linearUnit('oz', 'Onça', 'oz', POUND_KILOGRAMS / 16),
			linearUnit('st', 'Stone', 'st', POUND_KILOGRAMS * 14),
		],
	},
	{
		id: 'temperatura',
		name: 'Temperatura',
		pair: ['c', 'f'],
		allowNegative: true,
		units: [
			temperatureUnit(
				'c',
				'Celsius',
				'°C',
				(celsius) => celsius,
				(celsius) => celsius,
			),
			temperatureUnit(
				'f',
				'Fahrenheit',
				'°F',
				(fahrenheit) => ((fahrenheit - 32) * 5) / 9,
				(celsius) => (celsius * 9) / 5 + 32,
			),
			temperatureUnit(
				'k',
				'Kelvin',
				'K',
				(kelvin) => kelvin - 273.15,
				(celsius) => celsius + 273.15,
			),
		],
		formula: (from, to) => TEMPERATURE_FORMULAS[`${from.id}-${to.id}`] ?? null,
	},
	{
		id: 'area',
		name: 'Área',
		pair: ['m2', 'ft2'],
		units: [
			linearUnit('km2', 'Quilômetro quadrado', 'km²', 1e6),
			linearUnit('ha', 'Hectare', 'ha', 1e4),
			linearUnit('alq-sp', 'Alqueire paulista', 'alq. SP', 24200),
			linearUnit('alq-mg', 'Alqueire mineiro', 'alq. MG', 48400),
			linearUnit('m2', 'Metro quadrado', 'm²', 1),
			linearUnit('cm2', 'Centímetro quadrado', 'cm²', 1e-4),
			linearUnit('mi2', 'Milha quadrada', 'mi²', MILE_METERS * MILE_METERS),
			linearUnit('acre', 'Acre', 'ac', 4046.8564224),
			linearUnit('yd2', 'Jarda quadrada', 'yd²', YARD_METERS * YARD_METERS),
			linearUnit('ft2', 'Pé quadrado', 'ft²', FOOT_METERS * FOOT_METERS),
			linearUnit('in2', 'Polegada quadrada', 'in²', INCH_METERS * INCH_METERS),
		],
	},
	{
		id: 'volume',
		name: 'Volume',
		pair: ['l', 'ml'],
		units: [
			linearUnit('m3', 'Metro cúbico', 'm³', 1000),
			linearUnit('l', 'Litro', 'L', 1),
			linearUnit('ml', 'Mililitro', 'mL', 0.001),
			linearUnit('cm3', 'Centímetro cúbico', 'cm³', 0.001),
			linearUnit('cup', 'Xícara (240 mL)', 'xíc.', 0.24),
			linearUnit('tbsp', 'Colher de sopa (15 mL)', 'c. sopa', 0.015),
			linearUnit('tsp', 'Colher de chá (5 mL)', 'c. chá', 0.005),
			linearUnit('gal', 'Galão americano', 'gal', US_GALLON_LITERS),
			linearUnit('qt', 'Quarto americano', 'qt', US_GALLON_LITERS / 4),
			linearUnit('pt', 'Pint americano', 'pt', US_GALLON_LITERS / 8),
			linearUnit('floz', 'Onça fluida americana', 'fl oz', US_GALLON_LITERS / 128),
			linearUnit('gal-uk', 'Galão imperial', 'gal (UK)', IMPERIAL_GALLON_LITERS),
			linearUnit('ft3', 'Pé cúbico', 'ft³', FOOT_METERS ** 3 * 1000),
			linearUnit('in3', 'Polegada cúbica', 'in³', INCH_METERS ** 3 * 1000),
		],
	},
	{
		id: 'velocidade',
		name: 'Velocidade',
		pair: ['kmh', 'mph'],
		units: [
			linearUnit('kmh', 'Quilômetro por hora', 'km/h', 1 / 3.6),
			linearUnit('ms', 'Metro por segundo', 'm/s', 1),
			linearUnit('mph', 'Milha por hora', 'mph', MILE_METERS / 3600),
			linearUnit('kn', 'Nó', 'kn', NAUTICAL_MILE_METERS / 3600),
			linearUnit('fts', 'Pé por segundo', 'ft/s', FOOT_METERS),
		],
	},
	{
		id: 'tempo',
		name: 'Tempo',
		pair: ['h', 'min'],
		units: [
			linearUnit('ns', 'Nanossegundo', 'ns', 1e-9),
			linearUnit('us', 'Microssegundo', 'µs', 1e-6),
			linearUnit('ms', 'Milissegundo', 'ms', 0.001),
			linearUnit('s', 'Segundo', 's', 1),
			linearUnit('min', 'Minuto', 'min', 60),
			linearUnit('h', 'Hora', 'h', 3600),
			linearUnit('d', 'Dia', 'd', 86400),
			linearUnit('wk', 'Semana', 'sem.', 604800),
			linearUnit('mo', 'Mês (médio)', 'mês', YEAR_SECONDS / 12),
			linearUnit('yr', 'Ano (médio)', 'ano', YEAR_SECONDS),
			linearUnit('dec', 'Década', 'déc.', YEAR_SECONDS * 10),
			linearUnit('cent', 'Século', 'séc.', YEAR_SECONDS * 100),
		],
	},
	{
		id: 'armazenamento',
		name: 'Armazenamento de dados',
		pair: ['gb', 'mb'],
		units: [
			linearUnit('bit', 'Bit', 'bit', 1 / 8),
			linearUnit('b', 'Byte', 'B', 1),
			linearUnit('kb', 'Quilobyte', 'kB', 1e3),
			linearUnit('mb', 'Megabyte', 'MB', 1e6),
			linearUnit('gb', 'Gigabyte', 'GB', 1e9),
			linearUnit('tb', 'Terabyte', 'TB', 1e12),
			linearUnit('pb', 'Petabyte', 'PB', 1e15),
			linearUnit('kib', 'Kibibyte', 'KiB', 2 ** 10),
			linearUnit('mib', 'Mebibyte', 'MiB', 2 ** 20),
			linearUnit('gib', 'Gibibyte', 'GiB', 2 ** 30),
			linearUnit('tib', 'Tebibyte', 'TiB', 2 ** 40),
		],
	},
	{
		id: 'transferencia',
		name: 'Taxa de transferência',
		pair: ['mbps', 'mbs'],
		units: [
			linearUnit('bps', 'Bit por segundo', 'bit/s', 1),
			linearUnit('kbps', 'Quilobit por segundo', 'kbit/s', 1e3),
			linearUnit('mbps', 'Megabit por segundo', 'Mbit/s', 1e6),
			linearUnit('gbps', 'Gigabit por segundo', 'Gbit/s', 1e9),
			linearUnit('kbs', 'Quilobyte por segundo', 'kB/s', 8e3),
			linearUnit('mbs', 'Megabyte por segundo', 'MB/s', 8e6),
			linearUnit('gbs', 'Gigabyte por segundo', 'GB/s', 8e9),
		],
	},
	{
		id: 'energia',
		name: 'Energia',
		pair: ['kcal', 'kj'],
		units: [
			linearUnit('j', 'Joule', 'J', 1),
			linearUnit('kj', 'Quilojoule', 'kJ', 1000),
			linearUnit('cal', 'Caloria', 'cal', CALORIE_JOULES),
			linearUnit('kcal', 'Quilocaloria', 'kcal', CALORIE_JOULES * 1000),
			linearUnit('wh', 'Watt-hora', 'Wh', 3600),
			linearUnit('kwh', 'Quilowatt-hora', 'kWh', 3.6e6),
			linearUnit('ev', 'Elétron-volt', 'eV', 1.602176634e-19),
			linearUnit('btu', 'BTU', 'BTU', BTU_JOULES),
		],
	},
	{
		id: 'potencia',
		name: 'Potência',
		pair: ['cv', 'kw'],
		units: [
			linearUnit('w', 'Watt', 'W', 1),
			linearUnit('kw', 'Quilowatt', 'kW', 1000),
			linearUnit('cv', 'Cavalo-vapor', 'cv', 735.49875),
			// Mechanical horsepower: 550 ft·lbf/s.
			linearUnit('hp', 'Horsepower', 'hp', 550 * FOOT_METERS * POUND_KILOGRAMS * STANDARD_GRAVITY),
			linearUnit('btuh', 'BTU por hora', 'BTU/h', BTU_JOULES / 3600),
		],
	},
	{
		id: 'pressao',
		name: 'Pressão',
		pair: ['psi', 'bar'],
		units: [
			linearUnit('pa', 'Pascal', 'Pa', 1),
			linearUnit('kpa', 'Quilopascal', 'kPa', 1000),
			linearUnit('bar', 'Bar', 'bar', 1e5),
			linearUnit('atm', 'Atmosfera', 'atm', 101325),
			linearUnit(
				'psi',
				'Libra por polegada quadrada',
				'psi',
				(POUND_KILOGRAMS * STANDARD_GRAVITY) / (INCH_METERS * INCH_METERS),
			),
			linearUnit('mmhg', 'Milímetro de mercúrio', 'mmHg', 133.322387415),
			linearUnit('kgfcm2', 'Quilograma-força por cm²', 'kgf/cm²', 98066.5),
		],
	},
	{
		id: 'frequencia',
		name: 'Frequência',
		pair: ['ghz', 'mhz'],
		units: [
			linearUnit('hz', 'Hertz', 'Hz', 1),
			linearUnit('khz', 'Quilohertz', 'kHz', 1e3),
			linearUnit('mhz', 'Megahertz', 'MHz', 1e6),
			linearUnit('ghz', 'Gigahertz', 'GHz', 1e9),
			linearUnit('rpm', 'Rotação por minuto', 'rpm', 1 / 60),
		],
	},
	{
		id: 'consumo',
		name: 'Consumo de combustível',
		pair: ['kml', 'l100'],
		units: [
			linearUnit('kml', 'Quilômetro por litro', 'km/L', 1),
			{
				id: 'l100',
				name: 'Litro por 100 km',
				symbol: 'L/100 km',
				toBase: (litersPer100Km) => 100 / litersPer100Km,
				fromBase: (kmPerLiter) => 100 / kmPerLiter,
			},
			linearUnit('mpg', 'Milha por galão americano', 'mpg', MILE_METERS / 1000 / US_GALLON_LITERS),
			linearUnit(
				'mpg-uk',
				'Milha por galão imperial',
				'mpg (UK)',
				MILE_METERS / 1000 / IMPERIAL_GALLON_LITERS,
			),
		],
		formula: fuelEconomyFormula,
	},
	{
		id: 'angulo',
		name: 'Ângulo',
		pair: ['deg', 'rad'],
		allowNegative: true,
		units: [
			linearUnit('deg', 'Grau', '°', 1),
			linearUnit('rad', 'Radiano', 'rad', 180 / Math.PI),
			linearUnit('mrad', 'Miliradiano', 'mrad', 0.18 / Math.PI),
			linearUnit('grad', 'Grado', 'grad', 0.9),
			linearUnit('arcmin', 'Minuto de arco', '′', 1 / 60),
			linearUnit('arcsec', 'Segundo de arco', '″', 1 / 3600),
			linearUnit('turn', 'Volta', 'volta', 360),
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

function factorOf(unit: Unit): number {
	return unit.factor ?? 1
}

/** L/100 km is the inverse of km/L, so converting to or from it divides a constant by the value. */
function fuelEconomyFormula(from: Unit, to: Unit): string | null {
	if (from.id === to.id) return null
	if (from.id === 'l100') return `divida ${formatFactor(100 / factorOf(to))} pelo valor`
	if (to.id === 'l100') return `divida ${formatFactor(100 / factorOf(from))} pelo valor`
	return null
}

export function categoryById(id: string): Category | undefined {
	return CATEGORIES.find((category) => category.id === id)
}

export function unitById(category: Category, id: string): Unit | undefined {
	return category.units.find((unit) => unit.id === id)
}

function toBase(unit: Unit, value: number): number {
	return unit.toBase ? unit.toBase(value) : value * factorOf(unit)
}

function fromBase(unit: Unit, value: number): number {
	return unit.fromBase ? unit.fromBase(value) : value / factorOf(unit)
}

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
	const categoryFormula = category.formula?.(from, to)
	if (categoryFormula) return categoryFormula
	if (from.toBase || to.toBase) return null
	const multiplier = Number((factorOf(from) / factorOf(to)).toPrecision(10))
	const divisor = Number((factorOf(to) / factorOf(from)).toPrecision(10))
	return prefersDivision(multiplier, divisor)
		? `divida o valor por ${formatFactor(divisor)}`
		: `multiplique o valor por ${formatFactor(multiplier)}`
}

/** The shorter, rounder number reads better: ÷ 2,54 instead of × 0,3937007874. */
function prefersDivision(multiplier: number, divisor: number): boolean {
	const multiplierDigits = significantDigitCount(multiplier)
	const divisorDigits = significantDigitCount(divisor)
	if (divisorDigits === multiplierDigits) return multiplier < 1
	return divisorDigits < multiplierDigits
}

function significantDigitCount(value: number): number {
	return String(value)
		.replace('.', '')
		.replace(/^0+|0+$/g, '').length
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
	const magnitude = Math.abs(value)
	if (magnitude >= 1e15 || magnitude < 1e-7) {
		const [mantissa = '0', exponent = '0'] = value.toExponential(6).split('e')
		const trimmed = mantissa.replace(/\.?0+$/, '').replace('.', ',')
		return `${trimmed}e${exponent.replace('+', '')}`
	}
	return new Intl.NumberFormat('pt-BR', {
		maximumSignificantDigits: 10,
		useGrouping: false,
	}).format(value)
}
