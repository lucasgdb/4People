export type Rgb = { r: number; g: number; b: number; alpha: number }

const HEX_COLOR = /^#?([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/
const FUNCTIONAL_COLOR = /^(rgba?|hsla?)\(\s*([^)]+)\)$/
const COLOR_FORMAT_HINT = 'Use HEX (#a62023), rgb(166, 32, 35) ou hsl(359, 68%, 39%).'

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))
const clampChannel = (value: number) => clamp(Math.round(value), 0, 255)

/** "#abc" / "#abcd" are shorthand for "#aabbcc" / "#aabbccdd". */
function parseHexColor(hex: string): Rgb {
	const fullHex = hex.length <= 4 ? [...hex].map((digit) => digit + digit).join('') : hex
	const byteAt = (start: number) => Number.parseInt(fullHex.slice(start, start + 2), 16)
	return {
		r: byteAt(0),
		g: byteAt(2),
		b: byteAt(4),
		alpha: fullHex.length === 8 ? byteAt(6) / 255 : 1,
	}
}

/** "50%" → 0.5, "0.5" → 0.5, missing → 1 (opaque). */
function parseAlpha(text: string | undefined): number {
	if (text === undefined) return 1
	if (text.endsWith('%')) return Number.parseFloat(text) / 100
	return Number(text)
}

/** An rgb() channel: 0–255, or a percentage of 255. */
const parseRgbChannel = (text: string) =>
	text.endsWith('%') ? (Number.parseFloat(text) / 100) * 255 : Number(text)

function rgbFromChannels(channels: string[], alpha: number): Rgb | null {
	const [red = 0, green = 0, blue = 0] = channels.map(parseRgbChannel)
	if (![red, green, blue].every(Number.isFinite)) return null
	return { r: clampChannel(red), g: clampChannel(green), b: clampChannel(blue), alpha }
}

function hslFromChannels(channels: string[], alpha: number): Rgb | null {
	const [hue = 0, saturation = 0, lightness = 0] = channels.map((text) => Number.parseFloat(text))
	if (![hue, saturation, lightness].every(Number.isFinite)) return null
	return { ...hslToRgb(hue, saturation, lightness), alpha }
}

/** rgb()/rgba()/hsl()/hsla() with commas, spaces or the "/ alpha" syntax. */
function parseFunctionalColor(text: string): Rgb | null {
	const match = FUNCTIONAL_COLOR.exec(text)
	if (!match) return null
	const [, functionName = '', argumentList = ''] = match
	const parts = argumentList.split(/[\s,/]+/).filter(Boolean)
	if (parts.length < 3) return null
	const channels = parts.slice(0, 3)
	const alpha = parseAlpha(parts[3])
	if (functionName.startsWith('rgb')) return rgbFromChannels(channels, alpha)
	return hslFromChannels(channels, alpha)
}

/** Parses #rgb, #rrggbb(aa), rgb()/rgba() and hsl()/hsla(), the formats people paste. */
export function parseColor(input: string): Rgb {
	const text = input.trim().toLowerCase()
	const hex = HEX_COLOR.exec(text)?.[1]
	if (hex) return parseHexColor(hex)
	const functional = parseFunctionalColor(text)
	if (functional) return functional
	throw new Error(COLOR_FORMAT_HINT)
}

/** CSS Color 4 reference algorithm; saturation and lightness are percentages. */
function hslToRgb(hue: number, saturation: number, lightness: number) {
	const sat = clamp(saturation, 0, 100) / 100
	const light = clamp(lightness, 0, 100) / 100
	const normalizedHue = ((hue % 360) + 360) % 360
	const amplitude = sat * Math.min(light, 1 - light)
	const channel = (offset: number) => {
		const sector = (offset + normalizedHue / 30) % 12
		return light - amplitude * Math.max(-1, Math.min(sector - 3, 9 - sector, 1))
	}
	return {
		r: Math.round(channel(0) * 255),
		g: Math.round(channel(8) * 255),
		b: Math.round(channel(4) * 255),
	}
}

/** Hue in degrees from normalized channels, given the largest one and the max − min spread. */
function hueDegrees(red: number, green: number, blue: number, max: number, delta: number) {
	if (delta === 0) return 0
	let sector: number
	if (max === red) sector = ((green - blue) / delta) % 6
	else if (max === green) sector = (blue - red) / delta + 2
	else sector = (red - green) / delta + 4
	return (sector * 60 + 360) % 360
}

export function toHsl({ r, g, b }: Rgb) {
	const [red, green, blue] = [r / 255, g / 255, b / 255]
	const max = Math.max(red, green, blue)
	const min = Math.min(red, green, blue)
	const lightness = (max + min) / 2
	const delta = max - min
	const saturation = delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1))
	return {
		h: hueDegrees(red, green, blue, max, delta),
		s: saturation * 100,
		l: lightness * 100,
	}
}

/** sRGB gamma decoding of one 0–255 channel. */
function toLinear(channel: number) {
	const value = channel / 255
	return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
}

/** OKLCH (CSS Color 4) via linear sRGB → OKLab, with Björn Ottosson's matrices. */
export function toOklch({ r, g, b }: Rgb) {
	const [red, green, blue] = [toLinear(r), toLinear(g), toLinear(b)]
	const long = Math.cbrt(0.4122214708 * red + 0.5363325363 * green + 0.0514459929 * blue)
	const medium = Math.cbrt(0.2119034982 * red + 0.6806995451 * green + 0.1073969566 * blue)
	const short = Math.cbrt(0.0883024619 * red + 0.2817188376 * green + 0.6299787005 * blue)
	const okLightness = 0.2104542553 * long + 0.793617785 * medium - 0.0040720468 * short
	const okA = 1.9779984951 * long - 2.428592205 * medium + 0.4505937099 * short
	const okB = 0.0259040371 * long + 0.7827717662 * medium - 0.808675766 * short
	const chroma = Math.hypot(okA, okB)
	// Grays have no meaningful hue.
	const hue = chroma < 1e-4 ? 0 : ((Math.atan2(okB, okA) * 180) / Math.PI + 360) % 360
	return { l: okLightness * 100, c: chroma, h: hue }
}

export function toCmyk({ r, g, b }: Rgb) {
	const black = 1 - Math.max(r, g, b) / 255
	if (black === 1) return { c: 0, m: 0, y: 0, k: 100 }
	const ink = (channel: number) => ((1 - channel / 255 - black) / (1 - black)) * 100
	return { c: ink(r), m: ink(g), y: ink(b), k: black * 100 }
}

/** WCAG 2 relative luminance. */
export const luminance = ({ r, g, b }: Rgb) =>
	0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b)

/** WCAG 2 contrast ratio, from 1 (same color) to 21 (black on white). */
export function contrastRatio(first: Rgb, second: Rgb) {
	const firstLuminance = luminance(first)
	const secondLuminance = luminance(second)
	const lighter = Math.max(firstLuminance, secondLuminance)
	const darker = Math.min(firstLuminance, secondLuminance)
	return (lighter + 0.05) / (darker + 0.05)
}

const toHexByte = (value: number) => Math.round(value).toString(16).padStart(2, '0')
const roundToTenth = (value: number) => Math.round(value * 10) / 10

function formatHex({ r, g, b, alpha }: Rgb) {
	const alphaByte = alpha < 1 ? toHexByte(alpha * 255) : ''
	return `#${toHexByte(r)}${toHexByte(g)}${toHexByte(b)}${alphaByte}`
}

function formatRgb({ r, g, b, alpha }: Rgb) {
	if (alpha < 1) return `rgb(${r} ${g} ${b} / ${roundToTenth(alpha * 100)}%)`
	return `rgb(${r} ${g} ${b})`
}

/** The color as CSS-ready strings in every supported format. */
export function formatColor(rgb: Rgb) {
	const hsl = toHsl(rgb)
	const oklch = toOklch(rgb)
	const cmyk = toCmyk(rgb)
	return {
		hex: formatHex(rgb),
		rgb: formatRgb(rgb),
		hsl: `hsl(${roundToTenth(hsl.h)} ${roundToTenth(hsl.s)}% ${roundToTenth(hsl.l)}%)`,
		oklch: `oklch(${roundToTenth(oklch.l)}% ${Math.round(oklch.c * 1000) / 1000} ${roundToTenth(oklch.h)})`,
		cmyk: `cmyk(${Math.round(cmyk.c)}% ${Math.round(cmyk.m)}% ${Math.round(cmyk.y)}% ${Math.round(cmyk.k)}%)`,
	}
}
