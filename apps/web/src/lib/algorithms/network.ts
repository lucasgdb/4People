/**
 * IPv4 and IPv6 addressing: parsing, subnet math, classification and RFC 5952 text form.
 * IPv4 addresses are unsigned 32-bit numbers; IPv6 addresses are 128-bit BigInts, so every
 * figure (including 2^128 address counts) is exact.
 */

/* ---------------------------------------------------------------------------------------------- */
/*                                               IPv4                                             */
/* ---------------------------------------------------------------------------------------------- */

const OCTET = /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/

/** "192.168.1.10" → 3232235786. Rejects leading zeros (they read as octal in some tools). */
export function parseIPv4(text: string): number {
	const trimmed = text.trim()
	if (!trimmed) throw new Error('Informe um endereço IPv4, como 192.168.1.10.')
	const parts = trimmed.split('.')
	if (parts.length !== 4)
		throw new Error('Um IPv4 tem 4 números separados por ponto, como 192.168.1.10.')
	let value = 0
	for (const part of parts) {
		if (part === '') throw new Error('Há um número faltando entre os pontos do IPv4.')
		if (!OCTET.test(part))
			throw new Error(
				`"${part}" não é válido em um IPv4: use números de 0 a 255, sem zeros à esquerda.`,
			)
		value = value * 256 + Number(part)
	}
	return value
}

export function formatIPv4(value: number): string {
	return [value >>> 24, (value >>> 16) & 255, (value >>> 8) & 255, value & 255].join('.')
}

/** Dotted binary, e.g. "11000000.10101000.00000001.00001010". */
export function ipv4ToBinary(value: number): string {
	return formatIPv4(value)
		.split('.')
		.map((octet) => Number(octet).toString(2).padStart(8, '0'))
		.join('.')
}

/** The dotted binary split where the prefix ends: [network bits, host bits]. */
export function splitBinary(value: number, prefix: number): [string, string] {
	const binary = ipv4ToBinary(value)
	const cut = prefix + Math.floor(prefix / 8) - (prefix > 0 && prefix % 8 === 0 ? 1 : 0)
	return [binary.slice(0, cut), binary.slice(cut)]
}

/** /24 → 255.255.255.0 as a number. */
export function maskFromPrefix(prefix: number): number {
	if (!Number.isInteger(prefix) || prefix < 0 || prefix > 32)
		throw new Error('O prefixo IPv4 vai de /0 a /32.')
	return prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0
}

/** 255.255.255.0 → 24. Throws when the 1 bits aren't contiguous. */
export function prefixFromMask(mask: number): number {
	const inverted = ~mask >>> 0
	// A valid wildcard is 2^k − 1: adding one leaves no bit in common with it.
	if ((inverted & (inverted + 1)) !== 0)
		throw new Error(
			'Máscara inválida: os bits 1 precisam vir todos juntos à esquerda (ex.: 255.255.255.0).',
		)
	let prefix = 0
	for (let bit = 31; bit >= 0 && (mask >>> bit) & 1; bit--) prefix++
	return prefix
}

/** "24", "/24" or "255.255.255.0" → prefix length. */
export function parsePrefixOrMask(text: string): number {
	const trimmed = text.trim().replace(/^\//, '')
	if (!trimmed) throw new Error('Informe o prefixo (ex.: /24) ou a máscara (ex.: 255.255.255.0).')
	if (/^\d{1,2}$/.test(trimmed)) {
		const prefix = Number(trimmed)
		if (prefix > 32) throw new Error('O prefixo IPv4 vai de /0 a /32.')
		return prefix
	}
	if (trimmed.includes('.')) {
		let mask: number
		try {
			mask = parseIPv4(trimmed)
		} catch {
			throw new Error('Máscara inválida: use o formato 255.255.255.0 ou um prefixo como /24.')
		}
		return prefixFromMask(mask)
	}
	throw new Error('Use um prefixo de 0 a 32 (ex.: /24) ou uma máscara (ex.: 255.255.255.0).')
}

/**
 * The IP field may carry the prefix ("10.0.0.1/8", "10.0.0.1 255.0.0.0"); otherwise the separate
 * mask field is used.
 */
export function parseIPv4WithPrefix(ipText: string, maskText = ''): { ip: number; prefix: number } {
	const trimmed = ipText.trim()
	const match = /^([^\s/]+)\s*(?:\/\s*|\s+)(\S+)$/.exec(trimmed)
	if (match) return { ip: parseIPv4(match[1] ?? ''), prefix: parsePrefixOrMask(match[2] ?? '') }
	const ip = parseIPv4(trimmed)
	if (!maskText.trim())
		throw new Error('Informe o prefixo (ex.: /24) ou a máscara (ex.: 255.255.255.0).')
	return { ip, prefix: parsePrefixOrMask(maskText) }
}

export type IPv4Class = 'A' | 'B' | 'C' | 'D' | 'E'

/** Historic classful network class, from the first octet. */
export function ipv4Class(ip: number): IPv4Class {
	const first = ip >>> 24
	if (first < 128) return 'A'
	if (first < 192) return 'B'
	if (first < 224) return 'C'
	if (first < 240) return 'D'
	return 'E'
}

export type AddressScope = 'private' | 'public' | 'special'
export type AddressType = { scope: AddressScope; label: string; range: string }

const IPV4_RANGES: ReadonlyArray<[string, number, AddressScope, string]> = [
	['255.255.255.255', 32, 'special', 'Broadcast limitado'],
	['0.0.0.0', 8, 'special', 'Esta rede (não roteável)'],
	['10.0.0.0', 8, 'private', 'Privado (RFC 1918)'],
	['100.64.0.0', 10, 'special', 'Espaço compartilhado / CGNAT (RFC 6598)'],
	['127.0.0.0', 8, 'special', 'Loopback'],
	['169.254.0.0', 16, 'special', 'Link-local (APIPA)'],
	['172.16.0.0', 12, 'private', 'Privado (RFC 1918)'],
	['192.0.0.0', 24, 'special', 'Atribuições de protocolo IETF'],
	['192.0.2.0', 24, 'special', 'Documentação (TEST-NET-1)'],
	['192.88.99.0', 24, 'special', 'Relay 6to4 (descontinuado)'],
	['192.168.0.0', 16, 'private', 'Privado (RFC 1918)'],
	['198.18.0.0', 15, 'special', 'Testes de desempenho (RFC 2544)'],
	['198.51.100.0', 24, 'special', 'Documentação (TEST-NET-2)'],
	['203.0.113.0', 24, 'special', 'Documentação (TEST-NET-3)'],
	['224.0.0.0', 4, 'special', 'Multicast'],
	['240.0.0.0', 4, 'special', 'Reservado para uso futuro'],
]

/** Private (RFC 1918), public, or one of the special-purpose blocks (IANA registry). */
export function ipv4Type(ip: number): AddressType {
	for (const [base, prefix, scope, label] of IPV4_RANGES) {
		const mask = maskFromPrefix(prefix)
		if ((ip & mask) >>> 0 === parseIPv4(base)) return { scope, label, range: `${base}/${prefix}` }
	}
	return { scope: 'public', label: 'Público', range: '' }
}

export type IPv4Subnet = {
	ip: number
	prefix: number
	netmask: number
	wildcard: number
	network: number
	broadcast: number
	firstHost: number
	lastHost: number
	totalAddresses: number
	usableHosts: number
}

/** Network math for an address and prefix. /31 follows RFC 3021 (both addresses usable), /32 is one host. */
export function ipv4Subnet(ip: number, prefix: number): IPv4Subnet {
	const netmask = maskFromPrefix(prefix)
	const wildcard = ~netmask >>> 0
	const network = (ip & netmask) >>> 0
	const totalAddresses = 2 ** (32 - prefix)
	const broadcast = network + totalAddresses - 1
	const pointToPoint = prefix >= 31
	return {
		ip,
		prefix,
		netmask,
		wildcard,
		network,
		broadcast,
		firstHost: pointToPoint ? network : network + 1,
		lastHost: pointToPoint ? broadcast : broadcast - 1,
		totalAddresses,
		usableHosts: prefix === 32 ? 1 : prefix === 31 ? 2 : totalAddresses - 2,
	}
}

/** Smallest number of extra bits that yields at least `count` subnets. */
function bitsFor(count: number): number {
	let bits = 0
	while (2 ** bits < count) bits++
	return bits
}

/** New prefix to split a /prefix into at least `count` equal subnets. */
export function prefixForSubnetCount(prefix: number, count: number): number {
	if (!Number.isInteger(count) || count < 1)
		throw new Error('Informe um número inteiro de sub-redes, a partir de 1.')
	const next = prefix + bitsFor(count)
	if (next > 32)
		throw new Error(
			`Uma rede /${prefix} comporta no máximo ${(2 ** (32 - prefix)).toLocaleString('pt-BR')} sub-redes.`,
		)
	return next
}

/**
 * Largest prefix whose subnets hold `hosts` usable addresses, reserving network and broadcast
 * (traditional planning: at most /30).
 */
export function prefixForHosts(prefix: number, hosts: number): number {
	if (!Number.isInteger(hosts) || hosts < 1)
		throw new Error('Informe um número inteiro de hosts, a partir de 1.')
	for (let candidate = 30; candidate >= prefix; candidate--) {
		if (2 ** (32 - candidate) - 2 >= hosts) return candidate
	}
	throw new Error(
		`Uma rede /${prefix} não comporta ${hosts.toLocaleString('pt-BR')} hosts em uma única sub-rede.`,
	)
}

/** Splits network/prefix into /newPrefix subnets, returning at most `limit` of them. */
export function splitIPv4(
	ip: number,
	prefix: number,
	newPrefix: number,
	limit = 256,
): { count: number; subnets: IPv4Subnet[] } {
	if (!Number.isInteger(newPrefix) || newPrefix < prefix || newPrefix > 32)
		throw new Error(`O novo prefixo precisa estar entre /${prefix} e /32.`)
	const network = (ip & maskFromPrefix(prefix)) >>> 0
	const count = 2 ** (newPrefix - prefix)
	const step = 2 ** (32 - newPrefix)
	const subnets: IPv4Subnet[] = []
	for (let i = 0; i < Math.min(count, limit); i++)
		subnets.push(ipv4Subnet(network + i * step, newPrefix))
	return { count, subnets }
}

/* ---------------------------------------------------------------------------------------------- */
/*                                               IPv6                                             */
/* ---------------------------------------------------------------------------------------------- */

const ALL_ONES = (1n << 128n) - 1n
const HEXTET = /^[0-9a-f]{1,4}$/i

/** "2001:db8::1" → BigInt. Accepts an embedded IPv4 at the end ("::ffff:192.0.2.1") and brackets. */
export function parseIPv6(text: string): bigint {
	let address = text.trim()
	if (address.startsWith('[') && address.endsWith(']')) address = address.slice(1, -1)
	if (!address) throw new Error('Informe um endereço IPv6, como 2001:db8::1.')
	if (address.includes('%'))
		throw new Error('Remova o identificador de zona (a parte depois de %) para calcular.')

	// An IPv4 tail becomes the last two hextets.
	if (address.includes('.')) {
		const lastColon = address.lastIndexOf(':')
		if (lastColon < 0) throw new Error('Isso parece um IPv4; um IPv6 usa dois-pontos (:).')
		let v4: number
		try {
			v4 = parseIPv4(address.slice(lastColon + 1))
		} catch {
			throw new Error('O IPv4 no final do endereço é inválido (use 4 números de 0 a 255).')
		}
		address = `${address.slice(0, lastColon + 1)}${(v4 >>> 16).toString(16)}:${(v4 & 0xffff).toString(16)}`
	}

	const halves = address.split('::')
	if (halves.length > 2) throw new Error('Use "::" no máximo uma vez no endereço.')
	const toGroups = (part: string) => (part === '' ? [] : part.split(':'))
	const head = toGroups(halves[0] ?? '')
	const tail = halves.length === 2 ? toGroups(halves[1] ?? '') : []
	for (const group of [...head, ...tail]) {
		if (!HEXTET.test(group))
			throw new Error(
				group === ''
					? 'Há dois-pontos sobrando; use "::" para abreviar zeros.'
					: `"${group}" não é um grupo válido: use de 1 a 4 dígitos hexadecimais (0–9, a–f).`,
			)
	}
	let groups: string[]
	if (halves.length === 2) {
		const missing = 8 - head.length - tail.length
		if (missing < 1) throw new Error('Grupos demais: com "::" o endereço tem no máximo 7 grupos.')
		groups = [...head, ...Array<string>(missing).fill('0'), ...tail]
	} else {
		if (head.length !== 8)
			throw new Error(
				`Um IPv6 completo tem 8 grupos e este tem ${head.length}; use "::" para abreviar zeros.`,
			)
		groups = head
	}
	return groups.reduce((value, group) => (value << 16n) | BigInt(Number.parseInt(group, 16)), 0n)
}

function hextets(value: bigint): number[] {
	return Array.from({ length: 8 }, (_, i) => Number((value >> BigInt((7 - i) * 16)) & 0xffffn))
}

/** All 8 groups with 4 digits: "2001:0db8:0000:0000:0000:0000:0000:0001". */
export function expandIPv6(value: bigint): string {
	return hextets(value)
		.map((group) => group.toString(16).padStart(4, '0'))
		.join(':')
}

const MAPPED_PREFIX = 0xffffn << 32n

/**
 * RFC 5952 canonical text: lowercase, no leading zeros, the longest run of two or more zero groups
 * (the first on a tie) becomes "::", and IPv4-mapped addresses end in dotted decimal.
 */
export function compressIPv6(value: bigint): string {
	if (value >> 32n === MAPPED_PREFIX >> 32n)
		return `::ffff:${formatIPv4(Number(value & 0xffffffffn))}`
	const groups = hextets(value)
	let bestStart = -1
	let bestLength = 0
	for (let i = 0; i < 8; ) {
		if (groups[i] !== 0) {
			i++
			continue
		}
		let j = i
		while (j < 8 && groups[j] === 0) j++
		if (j - i > bestLength) {
			bestStart = i
			bestLength = j - i
		}
		i = j
	}
	const hex = groups.map((group) => group.toString(16))
	if (bestLength < 2) return hex.join(':')
	return `${hex.slice(0, bestStart).join(':')}::${hex.slice(bestStart + bestLength).join(':')}`
}

/** Splits "2001:db8::/48" or "2001:db8:: 48"; without a prefix, `fallback` is used. */
export function parseIPv6WithPrefix(
	text: string,
	prefixText = '',
): { value: bigint; prefix: number } {
	const [address = '', inline] = text.trim().split('/')
	const raw = (inline ?? prefixText).trim().replace(/^\//, '')
	if (!raw) throw new Error('Informe o prefixo, de /0 a /128 (ex.: /64).')
	if (!/^\d{1,3}$/.test(raw) || Number(raw) > 128)
		throw new Error('O prefixo IPv6 é um número de 0 a 128 (ex.: /64).')
	return { value: parseIPv6(address), prefix: Number(raw) }
}

export function ipv6Mask(prefix: number): bigint {
	if (!Number.isInteger(prefix) || prefix < 0 || prefix > 128)
		throw new Error('O prefixo IPv6 vai de /0 a /128.')
	return ALL_ONES ^ ((1n << BigInt(128 - prefix)) - 1n)
}

const IPV6_RANGES: ReadonlyArray<[string, number, AddressScope, string]> = [
	['::', 128, 'special', 'Não especificado'],
	['::1', 128, 'special', 'Loopback'],
	['::ffff:0:0', 96, 'special', 'IPv4 mapeado'],
	['64:ff9b::', 96, 'special', 'Tradução IPv4/IPv6 (NAT64)'],
	['100::', 64, 'special', 'Descarte (RFC 6666)'],
	['2001::', 32, 'special', 'Teredo'],
	['2001:db8::', 32, 'special', 'Documentação'],
	['2002::', 16, 'special', '6to4'],
	['fc00::', 7, 'private', 'Unique local (ULA, privado)'],
	['fe80::', 10, 'special', 'Link-local'],
	['ff00::', 8, 'special', 'Multicast'],
	['2000::', 3, 'public', 'Global unicast (público)'],
]

/** Address type from the IANA IPv6 special-purpose registry; the first (most specific) match wins. */
export function ipv6Type(value: bigint): AddressType {
	for (const [base, prefix, scope, label] of IPV6_RANGES) {
		if ((value & ipv6Mask(prefix)) === parseIPv6(base))
			return { scope, label, range: `${base}/${prefix}` }
	}
	return { scope: 'special', label: 'Reservado pela IETF', range: '' }
}

export type IPv6Subnet = {
	value: bigint
	prefix: number
	network: bigint
	last: bigint
	total: bigint
}

export function ipv6Subnet(value: bigint, prefix: number): IPv6Subnet {
	const mask = ipv6Mask(prefix)
	const network = value & mask
	return {
		value,
		prefix,
		network,
		last: network | (ALL_ONES ^ mask),
		total: 1n << BigInt(128 - prefix),
	}
}

/** PTR name of an address: its 32 nibbles reversed, under ip6.arpa. */
export function ipv6ReverseName(value: bigint): string {
	return `${[...expandIPv6(value).replaceAll(':', '')].reverse().join('.')}.ip6.arpa`
}

/** Reverse DNS zone for a prefix (whole nibbles only: a /50 is delegated as its /48 zone). */
export function ipv6ReverseZone(network: bigint, prefix: number): string {
	const nibbles = Math.floor(prefix / 4)
	const digits = [...expandIPv6(network).replaceAll(':', '')].slice(0, nibbles).reverse()
	return digits.length ? `${digits.join('.')}.ip6.arpa` : 'ip6.arpa'
}

/** The first `limit` /newPrefix subnets of value/prefix, and how many there are in total. */
export function splitIPv6(
	value: bigint,
	prefix: number,
	newPrefix: number,
	limit = 16,
): { count: bigint; subnets: bigint[] } {
	if (!Number.isInteger(newPrefix) || newPrefix < prefix || newPrefix > 128)
		throw new Error(`O novo prefixo precisa estar entre /${prefix} e /128.`)
	const network = value & ipv6Mask(prefix)
	const count = 1n << BigInt(newPrefix - prefix)
	const step = 1n << BigInt(128 - newPrefix)
	const shown = count < BigInt(limit) ? Number(count) : limit
	return { count, subnets: Array.from({ length: shown }, (_, i) => network + BigInt(i) * step) }
}

/** A huge count in short scientific form with pt-BR decimals: 2^64 → "1,84 × 10^19"; small values as is. */
export function scientificBigInt(value: bigint): string {
	const digits = value.toString()
	if (digits.length <= 6) return digits
	const mantissa = `${digits[0]},${digits.slice(1, 3)}`
	return `${mantissa} × 10^${digits.length - 1}`
}
