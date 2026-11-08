export type Rgb = { r: number; g: number; b: number; alpha: number }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

/** Parses #rgb, #rrggbb(aa), rgb()/rgba() and hsl()/hsla(), the formats people paste. */
export function parseColor(input: string): Rgb {
	const text = input.trim().toLowerCase()
	const hex = /^#?([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/.exec(text)?.[1]
	if (hex) {
		const full = hex.length <= 4 ? [...hex].map((c) => c + c).join('') : hex
		const n = (i: number) => Number.parseInt(full.slice(i, i + 2), 16)
		return { r: n(0), g: n(2), b: n(4), alpha: full.length === 8 ? n(6) / 255 : 1 }
	}
	const fn = /^(rgba?|hsla?)\(\s*([^)]+)\)$/.exec(text)
	if (fn) {
		const parts = (fn[2] ?? '').split(/[\s,/]+/).filter(Boolean)
		const alpha =
			parts[3] === undefined
				? 1
				: parts[3].endsWith('%')
					? Number.parseFloat(parts[3]) / 100
					: Number(parts[3])
		const nums = parts.slice(0, 3)
		if (nums.length === 3 && fn[1]?.startsWith('rgb')) {
			const [r, g, b] = nums.map((v) =>
				v.endsWith('%') ? (Number.parseFloat(v) / 100) * 255 : Number(v),
			)
			if ([r, g, b].every((v) => Number.isFinite(v)))
				return {
					r: clamp(Math.round(r ?? 0), 0, 255),
					g: clamp(Math.round(g ?? 0), 0, 255),
					b: clamp(Math.round(b ?? 0), 0, 255),
					alpha,
				}
		}
		if (nums.length === 3 && fn[1]?.startsWith('hsl')) {
			const [h, s, l] = nums.map((v) => Number.parseFloat(v))
			if ([h, s, l].every((v) => Number.isFinite(v)))
				return { ...hslToRgb(h ?? 0, s ?? 0, l ?? 0), alpha }
		}
	}
	throw new Error('Use HEX (#a62023), rgb(166, 32, 35) ou hsl(359, 68%, 39%).')
}

function hslToRgb(h: number, s: number, l: number) {
	const [sat, light] = [clamp(s, 0, 100) / 100, clamp(l, 0, 100) / 100]
	const k = (n: number) => (n + (((h % 360) + 360) % 360) / 30) % 12
	const a = sat * Math.min(light, 1 - light)
	const f = (n: number) => light - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1))
	return { r: Math.round(f(0) * 255), g: Math.round(f(8) * 255), b: Math.round(f(4) * 255) }
}

export function toHsl({ r, g, b }: Rgb) {
	const [rn, gn, bn] = [r / 255, g / 255, b / 255]
	const max = Math.max(rn, gn, bn)
	const min = Math.min(rn, gn, bn)
	const l = (max + min) / 2
	const d = max - min
	let h = 0
	if (d !== 0) {
		h = max === rn ? ((gn - bn) / d) % 6 : max === gn ? (bn - rn) / d + 2 : (rn - gn) / d + 4
		h = (h * 60 + 360) % 360
	}
	const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1))
	return { h, s: s * 100, l: l * 100 }
}

const toLinear = (c: number) => {
	const v = c / 255
	return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
}

/** OKLCH (CSS Color 4) via linear sRGB → OKLab. */
export function toOklch({ r, g, b }: Rgb) {
	const [lr, lg, lb] = [toLinear(r), toLinear(g), toLinear(b)]
	const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb)
	const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb)
	const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb)
	const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s
	const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s
	const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
	const C = Math.hypot(A, B)
	const H = C < 1e-4 ? 0 : ((Math.atan2(B, A) * 180) / Math.PI + 360) % 360
	return { l: L * 100, c: C, h: H }
}

export function toCmyk({ r, g, b }: Rgb) {
	const k = 1 - Math.max(r, g, b) / 255
	if (k === 1) return { c: 0, m: 0, y: 0, k: 100 }
	const part = (v: number) => ((1 - v / 255 - k) / (1 - k)) * 100
	return { c: part(r), m: part(g), y: part(b), k: k * 100 }
}

/** WCAG 2 relative luminance and contrast ratio. */
export const luminance = ({ r, g, b }: Rgb) =>
	0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b)

export function contrastRatio(a: Rgb, b: Rgb) {
	const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x)
	return ((l1 ?? 0) + 0.05) / ((l2 ?? 0) + 0.05)
}

const hex2 = (n: number) => Math.round(n).toString(16).padStart(2, '0')

export function formatColor(rgb: Rgb) {
	const hsl = toHsl(rgb)
	const ok = toOklch(rgb)
	const cmyk = toCmyk(rgb)
	const r1 = (n: number) => Math.round(n * 10) / 10
	return {
		hex: `#${hex2(rgb.r)}${hex2(rgb.g)}${hex2(rgb.b)}${rgb.alpha < 1 ? hex2(rgb.alpha * 255) : ''}`,
		rgb:
			rgb.alpha < 1
				? `rgb(${rgb.r} ${rgb.g} ${rgb.b} / ${r1(rgb.alpha * 100)}%)`
				: `rgb(${rgb.r} ${rgb.g} ${rgb.b})`,
		hsl: `hsl(${r1(hsl.h)} ${r1(hsl.s)}% ${r1(hsl.l)}%)`,
		oklch: `oklch(${r1(ok.l)}% ${Math.round(ok.c * 1000) / 1000} ${r1(ok.h)})`,
		cmyk: `cmyk(${Math.round(cmyk.c)}% ${Math.round(cmyk.m)}% ${Math.round(cmyk.y)}% ${Math.round(cmyk.k)}%)`,
	}
}
