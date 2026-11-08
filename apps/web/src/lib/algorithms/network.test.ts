import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
	compressIPv6,
	expandIPv6,
	formatIPv4,
	ipv4Class,
	ipv4Subnet,
	ipv4ToBinary,
	ipv4Type,
	ipv6Mask,
	ipv6ReverseName,
	ipv6ReverseZone,
	ipv6Subnet,
	ipv6Type,
	maskFromPrefix,
	parseIPv4,
	parseIPv4WithPrefix,
	parseIPv6,
	parseIPv6WithPrefix,
	parsePrefixOrMask,
	prefixForHosts,
	prefixForSubnetCount,
	prefixFromMask,
	scientificBigInt,
	splitBinary,
	splitIPv4,
	splitIPv6,
} from './network.ts'

const v4 = (text: string) => parseIPv4(text)
const roundTrip6 = (text: string) => compressIPv6(parseIPv6(text))

describe('IPv4 parsing', () => {
	it('parses and formats', () => {
		assert.equal(v4('192.168.1.10'), 3232235786)
		assert.equal(v4('0.0.0.0'), 0)
		assert.equal(v4('255.255.255.255'), 4294967295)
		assert.equal(formatIPv4(4294967295), '255.255.255.255')
		assert.equal(formatIPv4(3232235786), '192.168.1.10')
		assert.equal(v4('  10.0.0.1 '), 167772161)
	})
	it('rejects invalid input', () => {
		for (const bad of [
			'',
			'1.2.3',
			'1.2.3.4.5',
			'256.0.0.1',
			'01.2.3.4',
			'1..3.4',
			'a.b.c.d',
			'1.2.3.-4',
		])
			assert.throws(() => v4(bad), Error, bad)
	})
	it('binary view and split', () => {
		assert.equal(ipv4ToBinary(v4('192.168.1.10')), '11000000.10101000.00000001.00001010')
		assert.deepEqual(splitBinary(v4('192.168.1.10'), 24), [
			'11000000.10101000.00000001',
			'.00001010',
		])
		assert.deepEqual(splitBinary(v4('192.168.1.10'), 26), [
			'11000000.10101000.00000001.00',
			'001010',
		])
		assert.deepEqual(splitBinary(0, 0), ['', '00000000.00000000.00000000.00000000'])
		assert.equal(splitBinary(0, 32)[1], '')
	})
})

describe('masks and prefixes', () => {
	it('prefix ↔ mask', () => {
		assert.equal(formatIPv4(maskFromPrefix(24)), '255.255.255.0')
		assert.equal(formatIPv4(maskFromPrefix(0)), '0.0.0.0')
		assert.equal(formatIPv4(maskFromPrefix(32)), '255.255.255.255')
		assert.equal(formatIPv4(maskFromPrefix(19)), '255.255.224.0')
		for (let p = 0; p <= 32; p++) assert.equal(prefixFromMask(maskFromPrefix(p)), p)
		assert.throws(() => maskFromPrefix(33))
		assert.throws(() => prefixFromMask(v4('255.0.255.0')))
		assert.throws(() => prefixFromMask(v4('0.255.255.255')))
	})
	it('parses prefix or mask text', () => {
		assert.equal(parsePrefixOrMask('/24'), 24)
		assert.equal(parsePrefixOrMask('8'), 8)
		assert.equal(parsePrefixOrMask('255.255.252.0'), 22)
		assert.throws(() => parsePrefixOrMask('33'))
		assert.throws(() => parsePrefixOrMask(''))
		assert.throws(() => parsePrefixOrMask('abc'))
		assert.throws(() => parsePrefixOrMask('255.255.0.255'))
	})
	it('reads the prefix from the IP field or the mask field', () => {
		assert.deepEqual(parseIPv4WithPrefix('192.168.1.10/24'), { ip: v4('192.168.1.10'), prefix: 24 })
		assert.deepEqual(parseIPv4WithPrefix('192.168.1.10 / 24'), {
			ip: v4('192.168.1.10'),
			prefix: 24,
		})
		assert.deepEqual(parseIPv4WithPrefix('10.0.0.1 255.0.0.0'), { ip: v4('10.0.0.1'), prefix: 8 })
		assert.deepEqual(parseIPv4WithPrefix('10.0.0.1/255.255.0.0'), {
			ip: v4('10.0.0.1'),
			prefix: 16,
		})
		assert.deepEqual(parseIPv4WithPrefix('10.0.0.1', '/12'), { ip: v4('10.0.0.1'), prefix: 12 })
		assert.deepEqual(parseIPv4WithPrefix('10.0.0.1/30', '8'), { ip: v4('10.0.0.1'), prefix: 30 })
		assert.throws(() => parseIPv4WithPrefix('10.0.0.1'))
	})
})

describe('IPv4 subnet', () => {
	it('/24', () => {
		const s = ipv4Subnet(v4('192.168.1.10'), 24)
		assert.equal(formatIPv4(s.network), '192.168.1.0')
		assert.equal(formatIPv4(s.broadcast), '192.168.1.255')
		assert.equal(formatIPv4(s.firstHost), '192.168.1.1')
		assert.equal(formatIPv4(s.lastHost), '192.168.1.254')
		assert.equal(formatIPv4(s.netmask), '255.255.255.0')
		assert.equal(formatIPv4(s.wildcard), '0.0.0.255')
		assert.equal(s.totalAddresses, 256)
		assert.equal(s.usableHosts, 254)
	})
	it('odd prefixes and high addresses', () => {
		const s = ipv4Subnet(v4('172.20.77.200'), 19)
		assert.equal(formatIPv4(s.network), '172.20.64.0')
		assert.equal(formatIPv4(s.broadcast), '172.20.95.255')
		assert.equal(s.usableHosts, 8190)
		const high = ipv4Subnet(v4('250.1.2.3'), 4)
		assert.equal(formatIPv4(high.network), '240.0.0.0')
		assert.equal(formatIPv4(high.broadcast), '255.255.255.255')
	})
	it('/0, /31 and /32', () => {
		const all = ipv4Subnet(v4('8.8.8.8'), 0)
		assert.equal(all.totalAddresses, 4294967296)
		assert.equal(all.usableHosts, 4294967294)
		assert.equal(formatIPv4(all.broadcast), '255.255.255.255')
		const p2p = ipv4Subnet(v4('10.0.0.1'), 31)
		assert.equal(p2p.usableHosts, 2)
		assert.equal(formatIPv4(p2p.firstHost), '10.0.0.0')
		assert.equal(formatIPv4(p2p.lastHost), '10.0.0.1')
		const host = ipv4Subnet(v4('10.0.0.1'), 32)
		assert.equal(host.usableHosts, 1)
		assert.equal(host.firstHost, host.lastHost)
		assert.equal(formatIPv4(host.wildcard), '0.0.0.0')
	})
	it('class and type', () => {
		assert.equal(ipv4Class(v4('10.0.0.1')), 'A')
		assert.equal(ipv4Class(v4('128.0.0.1')), 'B')
		assert.equal(ipv4Class(v4('192.168.0.1')), 'C')
		assert.equal(ipv4Class(v4('224.0.0.1')), 'D')
		assert.equal(ipv4Class(v4('255.0.0.1')), 'E')
		assert.equal(ipv4Type(v4('10.1.2.3')).scope, 'private')
		assert.equal(ipv4Type(v4('172.31.255.255')).scope, 'private')
		assert.equal(ipv4Type(v4('172.32.0.0')).scope, 'public')
		assert.equal(ipv4Type(v4('192.168.1.1')).range, '192.168.0.0/16')
		assert.equal(ipv4Type(v4('8.8.8.8')).scope, 'public')
		assert.equal(ipv4Type(v4('127.0.0.1')).label, 'Loopback')
		assert.equal(ipv4Type(v4('100.100.0.1')).range, '100.64.0.0/10')
		assert.equal(ipv4Type(v4('169.254.10.1')).label, 'Link-local (APIPA)')
		assert.equal(ipv4Type(v4('239.1.1.1')).label, 'Multicast')
		assert.equal(ipv4Type(v4('255.255.255.255')).label, 'Broadcast limitado')
		assert.equal(ipv4Type(v4('255.255.255.254')).range, '240.0.0.0/4')
		assert.equal(ipv4Type(v4('198.19.0.1')).range, '198.18.0.0/15')
	})
})

describe('IPv4 split', () => {
	it('by count', () => {
		assert.equal(prefixForSubnetCount(24, 1), 24)
		assert.equal(prefixForSubnetCount(24, 4), 26)
		assert.equal(prefixForSubnetCount(24, 5), 27)
		assert.equal(prefixForSubnetCount(24, 256), 32)
		assert.throws(() => prefixForSubnetCount(24, 257))
		assert.throws(() => prefixForSubnetCount(24, 0))
	})
	it('by hosts', () => {
		assert.equal(prefixForHosts(24, 50), 26)
		assert.equal(prefixForHosts(24, 62), 26)
		assert.equal(prefixForHosts(24, 63), 25)
		assert.equal(prefixForHosts(24, 1), 30)
		assert.equal(prefixForHosts(24, 254), 24)
		assert.throws(() => prefixForHosts(24, 255))
		assert.throws(() => prefixForHosts(24, 0))
		assert.throws(() => prefixForHosts(31, 1))
	})
	it('lists subnets from the network address', () => {
		const { count, subnets } = splitIPv4(v4('192.168.1.77'), 24, 26)
		assert.equal(count, 4)
		assert.deepEqual(
			subnets.map((s) => `${formatIPv4(s.network)}–${formatIPv4(s.broadcast)}`),
			[
				'192.168.1.0–192.168.1.63',
				'192.168.1.64–192.168.1.127',
				'192.168.1.128–192.168.1.191',
				'192.168.1.192–192.168.1.255',
			],
		)
		const big = splitIPv4(v4('10.0.0.0'), 8, 24, 10)
		assert.equal(big.count, 65536)
		assert.equal(big.subnets.length, 10)
		assert.equal(formatIPv4(big.subnets[9]?.network ?? 0), '10.0.9.0')
		assert.throws(() => splitIPv4(0, 24, 23))
		assert.throws(() => splitIPv4(0, 24, 33))
	})
})

describe('IPv6 parsing and RFC 5952', () => {
	it('parses common forms', () => {
		assert.equal(parseIPv6('::'), 0n)
		assert.equal(parseIPv6('::1'), 1n)
		assert.equal(parseIPv6('[::1]'), 1n)
		assert.equal(parseIPv6('2001:db8::1'), (0x20010db8n << 96n) | 1n)
		assert.equal(parseIPv6('2001:DB8:0:0:0:0:0:1'), parseIPv6('2001:db8::1'))
		assert.equal(parseIPv6('::ffff:192.0.2.1'), (0xffffn << 32n) | 0xc0000201n)
		assert.equal(parseIPv6('1::'), 1n << 112n)
		assert.equal(parseIPv6('ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff'), (1n << 128n) - 1n)
	})
	it('rejects invalid input', () => {
		for (const bad of [
			'',
			'1:2:3:4:5:6:7',
			'1:2:3:4:5:6:7:8:9',
			'1::2::3',
			'12345::',
			'g::1',
			':1:2:3:4:5:6:7',
			'1:2:3:4:5:6:7:8::',
			'1:2:3:4::5:6:7:8',
			'::1.2.3',
			'1.2.3.4',
			'fe80::1%eth0',
			'1:2:3:4:5:6:7:',
		])
			assert.throws(() => parseIPv6(bad), Error, bad)
	})
	it('compresses per RFC 5952', () => {
		assert.equal(roundTrip6('2001:0db8:0000:0000:0000:0000:0000:0001'), '2001:db8::1')
		assert.equal(roundTrip6('2001:db8:0:0:1:0:0:1'), '2001:db8::1:0:0:1') // first of equal runs
		assert.equal(roundTrip6('2001:db8:0:1:1:1:1:1'), '2001:db8:0:1:1:1:1:1') // single 0 stays
		assert.equal(roundTrip6('2001:0:0:1:0:0:0:1'), '2001:0:0:1::1') // longest run wins
		assert.equal(roundTrip6('0:0:0:0:0:0:0:0'), '::')
		assert.equal(roundTrip6('0:0:0:0:0:0:0:1'), '::1')
		assert.equal(roundTrip6('1:0:0:0:0:0:0:0'), '1::')
		assert.equal(roundTrip6('FE80::ABCD'), 'fe80::abcd')
		assert.equal(roundTrip6('::ffff:c000:0201'), '::ffff:192.0.2.1')
		assert.equal(roundTrip6('1:2:3:4:5:6:7:8'), '1:2:3:4:5:6:7:8')
	})
	it('expands', () => {
		assert.equal(expandIPv6(parseIPv6('2001:db8::1')), '2001:0db8:0000:0000:0000:0000:0000:0001')
		assert.equal(expandIPv6(0n), '0000:0000:0000:0000:0000:0000:0000:0000')
	})
})

describe('IPv6 subnet', () => {
	it('network, last and total', () => {
		const s = ipv6Subnet(parseIPv6('2001:db8:abcd:12:3456::1'), 48)
		assert.equal(compressIPv6(s.network), '2001:db8:abcd::')
		assert.equal(compressIPv6(s.last), '2001:db8:abcd:ffff:ffff:ffff:ffff:ffff')
		assert.equal(s.total, 1n << 80n)
		assert.equal(ipv6Subnet(1n, 128).total, 1n)
		assert.equal(ipv6Subnet(5n, 0).total, 1n << 128n)
		assert.equal(ipv6Subnet(5n, 0).network, 0n)
		assert.equal(ipv6Mask(0), 0n)
		assert.equal(ipv6Mask(128), (1n << 128n) - 1n)
		assert.throws(() => ipv6Mask(129))
	})
	it('reads the prefix', () => {
		assert.deepEqual(parseIPv6WithPrefix('2001:db8::/32'), {
			value: parseIPv6('2001:db8::'),
			prefix: 32,
		})
		assert.deepEqual(parseIPv6WithPrefix('2001:db8::', '/64'), {
			value: parseIPv6('2001:db8::'),
			prefix: 64,
		})
		assert.throws(() => parseIPv6WithPrefix('2001:db8::'))
		assert.throws(() => parseIPv6WithPrefix('2001:db8::/129'))
		assert.throws(() => parseIPv6WithPrefix('2001:db8::/x'))
	})
	it('types', () => {
		assert.equal(ipv6Type(parseIPv6('::')).label, 'Não especificado')
		assert.equal(ipv6Type(parseIPv6('::1')).label, 'Loopback')
		assert.equal(ipv6Type(parseIPv6('fe80::1')).label, 'Link-local')
		assert.equal(ipv6Type(parseIPv6('febf::1')).label, 'Link-local')
		assert.equal(ipv6Type(parseIPv6('fd12:3456::1')).scope, 'private')
		assert.equal(ipv6Type(parseIPv6('fc00::1')).scope, 'private')
		assert.equal(ipv6Type(parseIPv6('ff02::1')).label, 'Multicast')
		assert.equal(ipv6Type(parseIPv6('2001:db8::1')).label, 'Documentação')
		assert.equal(ipv6Type(parseIPv6('2001:0:1::1')).label, 'Teredo')
		assert.equal(ipv6Type(parseIPv6('2002::1')).label, '6to4')
		assert.equal(ipv6Type(parseIPv6('2800:3f0:4001::200e')).scope, 'public')
		assert.equal(ipv6Type(parseIPv6('3fff::1')).scope, 'public')
		assert.equal(ipv6Type(parseIPv6('::ffff:1.2.3.4')).label, 'IPv4 mapeado')
		assert.equal(ipv6Type(parseIPv6('64:ff9b::1.2.3.4')).label, 'Tradução IPv4/IPv6 (NAT64)')
		assert.equal(ipv6Type(parseIPv6('4000::')).label, 'Reservado pela IETF')
	})
	it('reverse DNS', () => {
		assert.equal(
			ipv6ReverseName(parseIPv6('2001:db8::567:89ab')),
			'b.a.9.8.7.6.5.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.8.b.d.0.1.0.0.2.ip6.arpa',
		)
		assert.equal(ipv6ReverseZone(parseIPv6('2001:db8::'), 32), '8.b.d.0.1.0.0.2.ip6.arpa')
		assert.equal(
			ipv6ReverseZone(parseIPv6('2001:db8:abc0::'), 46),
			'c.b.a.8.b.d.0.1.0.0.2.ip6.arpa',
		)
		assert.equal(ipv6ReverseZone(0n, 0), 'ip6.arpa')
	})
	it('splits', () => {
		const { count, subnets } = splitIPv6(parseIPv6('2001:db8::'), 48, 64, 3)
		assert.equal(count, 65536n)
		assert.deepEqual(subnets.map(compressIPv6), ['2001:db8::', '2001:db8:0:1::', '2001:db8:0:2::'])
		assert.equal(splitIPv6(0n, 64, 65).subnets.length, 2)
		assert.equal(splitIPv6(0n, 0, 128).count, 1n << 128n)
		assert.throws(() => splitIPv6(0n, 64, 63))
	})
	it('scientific BigInt', () => {
		assert.equal(scientificBigInt(1n << 64n), '1,84 × 10^19')
		assert.equal(scientificBigInt(256n), '256')
	})
})
