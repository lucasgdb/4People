import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { faker } from '@faker-js/faker/locale/pt_BR'
import { validateCNPJ, validateCPF } from './documents.ts'
import {
	BASE_GENERATORS,
	buildRequest,
	decodeHtmlEntities,
	type EscapeLanguage,
	encodeHtmlEntities,
	ensureSvgNamespace,
	escapeString,
	explainFetchError,
	fakerGenerators,
	formatBytes,
	generateJson,
	HTML_ENTITIES,
	jsonTokens,
	minifySvg,
	PLACEHOLDERS,
	parseCurl,
	prettyBody,
	renderTemplate,
	statusClass,
	svgDataUrl,
	svgInfo,
	svgLengthToPx,
	templateFromFields,
	toCurl,
	unescapeString,
	withSvgSize,
} from './web.ts'

describe('HTML entities', () => {
	it('has the full HTML 4 set', () => {
		assert.equal(HTML_ENTITIES.size, 253)
		assert.equal(HTML_ENTITIES.get('nbsp'), 160)
		assert.equal(HTML_ENTITIES.get('yuml'), 255)
		assert.equal(HTML_ENTITIES.get('Sigma'), 931)
		assert.equal(HTML_ENTITIES.get('Omega'), 937)
		assert.equal(HTML_ENTITIES.get('sigmaf'), 962)
		assert.equal(HTML_ENTITIES.get('omega'), 969)
		assert.equal(HTML_ENTITIES.has('_'), false)
	})
	it('encodes only special characters by default', () => {
		assert.equal(
			encodeHtmlEntities(`<a href="x">Tom & Jerry's</a> é`),
			'&lt;a href=&quot;x&quot;&gt;Tom &amp; Jerry&#39;s&lt;/a&gt; é',
		)
	})
	it('encodes non-ASCII as named, decimal or hex', () => {
		assert.equal(encodeHtmlEntities('é€😀', { scope: 'nonAscii' }), '&eacute;&euro;&#128512;')
		assert.equal(encodeHtmlEntities('é<', { scope: 'nonAscii', format: 'decimal' }), '&#233;&#60;')
		assert.equal(encodeHtmlEntities('é😀', { scope: 'nonAscii', format: 'hex' }), '&#xE9;&#x1F600;')
		assert.equal(encodeHtmlEntities('a\nb', { scope: 'nonAscii' }), 'a\nb')
		assert.equal(encodeHtmlEntities('\u0001', { scope: 'nonAscii' }), '&#1;')
	})
	it('decodes named, decimal and hex, keeping unknown ones', () => {
		assert.equal(
			decodeHtmlEntities('&lt;p&gt;&eacute; &#233; &#xE9; &#X1F600; &apos;&foo; &#0; &#xD800;'),
			"<p>é é é 😀 '&foo; &#0; &#xD800;",
		)
	})
	it('round-trips', () => {
		const text = 'Preço < R$ 10 & “frete” grátis 😀'
		for (const format of ['named', 'decimal', 'hex'] as const)
			assert.equal(
				decodeHtmlEntities(encodeHtmlEntities(text, { format, scope: 'nonAscii' })),
				text,
			)
	})
})

describe('string escaping', () => {
	const tricky = 'Olá "mundo"\n\tit\'s \\ fim\u0001 😀'
	it('escapes per language', () => {
		assert.equal(escapeString('a"b\n', 'json'), 'a\\"b\\n')
		assert.equal(escapeString('a\'b"\n\0', 'js'), 'a\\\'b\\"\\n\\x00')
		assert.equal(escapeString(' ', 'js'), '\\u2028')
		assert.equal(escapeString('a"\u0001', 'java'), 'a\\"\\u0001')
		assert.equal(escapeString("it's\u0007", 'python'), "it\\'s\\x07")
		assert.equal(escapeString("d'Ávila", 'sql'), "d''Ávila")
		assert.equal(escapeString("it's", 'shell'), `'it'\\''s'`)
		assert.equal(escapeString('', 'shell'), "''")
		assert.equal(
			escapeString('1+1=2? (sim) [a] /x/', 'regex'),
			'1\\+1=2\\? \\(sim\\) \\[a\\] \\/x\\/',
		)
	})
	it('regex escape works with the u flag', () => {
		const escaped = escapeString('a.b*c-d/e', 'regex')
		assert.ok(new RegExp(`^${escaped}$`, 'u').test('a.b*c-d/e'))
		assert.ok(!new RegExp(`^${escaped}$`, 'u').test('aXb*c-d/e'))
	})
	it('round-trips every language', () => {
		for (const language of ['js', 'json', 'java', 'python', 'sql', 'shell', 'regex'] as const)
			assert.equal(unescapeString(escapeString(tricky, language), language), tricky, language)
	})
	it('unescapes unicode forms', () => {
		assert.equal(unescapeString('\\u00e9\\uD83D\\uDE00', 'json'), 'é😀')
		assert.equal(unescapeString('\\u{1F600}\\x41', 'js'), '😀A')
		assert.equal(unescapeString('\\U0001F600\\101\\x41', 'python'), '😀AA')
		assert.equal(unescapeString('\\x41\\U0001F600', 'java'), 'A😀')
		assert.equal(unescapeString('a\\\nb', 'js'), 'ab')
		assert.equal(unescapeString('\\0', 'js'), '\0')
	})
	it('lenient vs strict unknown escapes', () => {
		assert.equal(unescapeString('\\q', 'js'), 'q')
		assert.equal(unescapeString('\\q', 'python'), '\\q')
		assert.throws(() => unescapeString('\\q', 'json'), /Escape inválido/)
		assert.throws(() => unescapeString('\\q', 'java'), /Escape inválido/)
		assert.throws(() => unescapeString('abc\\', 'json'), /Escape inválido/)
		assert.throws(() => unescapeString('\\u12', 'json'), /Escape inválido/)
		assert.throws(() => unescapeString('\\u{110000}', 'js'), /Escape inválido/)
		assert.throws(() => unescapeString('\\xZZ', 'js'), /Escape inválido/)
	})
	it('reads shell words', () => {
		assert.equal(unescapeString(`'it'\\''s'`, 'shell'), "it's")
		assert.equal(unescapeString(`"a \\"b\\" \\$HOME \\n"`, 'shell'), 'a "b" $HOME \\n')
		assert.equal(unescapeString('a\\ b', 'shell'), 'a b')
		assert.throws(() => unescapeString("'abc", 'shell'), /Aspas simples/)
		assert.throws(() => unescapeString('"abc', 'shell'), /Aspas duplas/)
		assert.throws(() => unescapeString('abc\\', 'shell'), /Barra invertida/)
	})
	it('unescapes SQL and regex', () => {
		assert.equal(unescapeString("d''Ávila", 'sql'), "d'Ávila")
		assert.equal(unescapeString('\\.\\-\\w', 'regex'), '.-\\w')
	})
	it('json escape is valid JSON', () => {
		assert.equal(JSON.parse(`"${escapeString(tricky, 'json')}"`), tricky)
	})
	it('covers the language list', () => {
		const languages: EscapeLanguage[] = ['js', 'json', 'java', 'python', 'sql', 'shell', 'regex']
		for (const language of languages) assert.equal(typeof escapeString('x', language), 'string')
	})
})

describe('SVG', () => {
	const svg = `<?xml version="1.0"?>
<!-- comment -->
<svg xmlns="http://www.w3.org/2000/svg"   width="10mm" height='20' viewBox="0 0 100 200">
  <metadata><rdf:RDF/></metadata>
  <sodipodi:namedview id="n"/>
  <rect  x="1"   y="2" />
</svg>`
	it('lengths', () => {
		assert.equal(svgLengthToPx('10'), 10)
		assert.equal(svgLengthToPx('1in'), 96)
		assert.ok(Math.abs((svgLengthToPx('10mm') ?? 0) - 37.795) < 0.01)
		assert.equal(svgLengthToPx('50%'), null)
		assert.equal(svgLengthToPx(undefined), null)
		assert.equal(svgLengthToPx('0'), null)
	})
	it('reads the root tag', () => {
		const info = svgInfo(svg)
		assert.equal(info.width, '10mm')
		assert.equal(info.height, '20')
		assert.equal(info.viewBox, '0 0 100 200')
		assert.equal(info.pixelHeight, 20)
		assert.equal(info.hasScript, false)
		assert.ok(info.bytes > 100)
	})
	it('falls back to viewBox, aspect ratio and 300×150', () => {
		const a = svgInfo('<svg viewBox="0 0 64 32"></svg>')
		assert.deepEqual([a.pixelWidth, a.pixelHeight], [64, 32])
		const b = svgInfo('<svg width="128" viewBox="0 0 64 32"></svg>')
		assert.deepEqual([b.pixelWidth, b.pixelHeight], [128, 64])
		const c = svgInfo('<svg></svg>')
		assert.deepEqual([c.pixelWidth, c.pixelHeight], [300, 150])
		assert.throws(() => svgInfo('<div></div>'), /<svg>/)
	})
	it('flags scripts', () => {
		assert.equal(svgInfo('<svg><script>alert(1)</script></svg>').hasScript, true)
		assert.equal(svgInfo('<svg onload="alert(1)"></svg>').hasScript, true)
	})
	it('sets the size', () => {
		assert.equal(
			withSvgSize('<svg width="1" viewBox="0 0 2 2"><g/></svg>', 20, 30),
			'<svg viewBox="0 0 2 2" width="20" height="30"><g/></svg>',
		)
		assert.equal(withSvgSize('<svg/>', 5, 6), '<svg width="5" height="6"/>')
		assert.equal(withSvgSize('nada', 5, 6), 'nada')
	})
	it('minifies', () => {
		assert.equal(
			minifySvg(svg),
			`<svg xmlns="http://www.w3.org/2000/svg" width="10mm" height='20' viewBox="0 0 100 200"><rect x="1" y="2"/></svg>`,
		)
	})
	it('adds the namespace when missing', () => {
		assert.equal(
			ensureSvgNamespace('<svg width="1"><g/></svg>'),
			'<svg xmlns="http://www.w3.org/2000/svg" width="1"><g/></svg>',
		)
		const ok = '<svg xmlns="http://www.w3.org/2000/svg"/>'
		assert.equal(ensureSvgNamespace(ok), ok)
		assert.equal(ensureSvgNamespace('<svg>'), '<svg xmlns="http://www.w3.org/2000/svg">')
	})
	it('builds a data URL', () => {
		assert.ok(svgDataUrl('<svg/>').startsWith('data:image/svg+xml;charset=utf-8,%3Csvg'))
	})
})

describe('REST tester', () => {
	it('classifies status', () => {
		assert.equal(statusClass(204), '2xx')
		assert.equal(statusClass(503), '5xx')
		assert.equal(statusClass(0), 'falha')
	})
	it('formats bytes', () => {
		assert.equal(formatBytes(512), '512 B')
		assert.equal(formatBytes(1536), '1,5 KB')
		assert.equal(formatBytes(20 * 1024 * 1024), '20 MB')
	})
	const base = {
		method: 'GET' as const,
		url: 'api.exemplo.com/x',
		headers: [],
		bodyType: 'none' as const,
		body: '',
	}
	it('normalizes the URL', () => {
		assert.equal(buildRequest(base).url, 'https://api.exemplo.com/x')
		assert.throws(() => buildRequest({ ...base, url: ' ' }), /Informe a URL/)
		assert.throws(() => buildRequest({ ...base, url: 'ftp://x.com' }), /http/)
		assert.throws(() => buildRequest({ ...base, url: 'http://' }), /URL inválida/)
	})
	it('handles headers', () => {
		const request = buildRequest({
			...base,
			headers: [
				{ key: 'Accept', value: 'application/json' },
				{ key: ' ', value: 'ignored' },
				{ key: 'Cookie', value: 'a=1' },
				{ key: 'Sec-Fetch-Mode', value: 'x' },
			],
		})
		assert.deepEqual(request.headers, [['Accept', 'application/json']])
		assert.deepEqual(request.ignoredHeaders, ['Cookie', 'Sec-Fetch-Mode'])
		assert.throws(
			() => buildRequest({ ...base, headers: [{ key: 'a b', value: '' }] }),
			/cabeçalho/,
		)
	})
	it('builds bodies', () => {
		const json = buildRequest({ ...base, method: 'POST', bodyType: 'json', body: '{"a":1}' })
		assert.equal(json.body, '{"a":1}')
		assert.deepEqual(json.headers, [['Content-Type', 'application/json']])
		const form = buildRequest({
			...base,
			method: 'POST',
			bodyType: 'form',
			body: 'a=1\nb = x y\n\nc',
		})
		assert.equal(form.body, 'a=1&b=x+y&c=')
		const text = buildRequest({
			...base,
			method: 'PUT',
			bodyType: 'text',
			body: 'oi',
			headers: [{ key: 'content-type', value: 'text/csv' }],
		})
		assert.deepEqual(text.headers, [['content-type', 'text/csv']])
		assert.throws(() => buildRequest({ ...base, bodyType: 'json', body: '{}' }), /GET não aceita/)
		assert.throws(
			() => buildRequest({ ...base, method: 'POST', bodyType: 'json', body: '{' }),
			/JSON válido/,
		)
		assert.equal(buildRequest({ ...base, bodyType: 'json', body: '  ' }).body, undefined)
	})
	it('prints curl', () => {
		assert.equal(
			toCurl({ url: 'https://x.com', method: 'POST', headers: [['A', "it's"]], body: '{}' }),
			`curl -X POST 'https://x.com' \\\n  -H 'A: it'\\''s' \\\n  --data-raw '{}'`,
		)
	})
	it('pretty-prints JSON bodies', () => {
		assert.deepEqual(prettyBody('{"a":1}', 'application/json'), {
			text: '{\n  "a": 1\n}',
			json: true,
		})
		assert.deepEqual(prettyBody('[1]', 'text/plain'), { text: '[\n  1\n]', json: true })
		assert.deepEqual(prettyBody('<p>', 'text/html'), { text: '<p>', json: false })
		assert.deepEqual(prettyBody('{x', 'application/json'), { text: '{x', json: false })
	})
	it('explains fetch errors', () => {
		const typeError = new TypeError('Failed to fetch')
		assert.match(explainFetchError(typeError, 'https://x.com', 'https:'), /CORS/)
		assert.match(explainFetchError(typeError, 'http://x.com', 'https:'), /conteúdo misto/)
		assert.match(
			explainFetchError(new DOMException('x', 'AbortError'), 'https://x.com', 'https:'),
			/demorou/,
		)
		assert.equal(explainFetchError(new Error('boom'), 'https://x.com', 'https:'), 'boom')
	})
})

describe('curl import', () => {
	it('ignores text that is not a curl command', () => {
		assert.equal(parseCurl('https://api.github.com/users/x'), null)
	})
	it('reads a DevTools "Copy as cURL (bash)" command', () => {
		const parsed = parseCurl(
			"curl 'https://api.exemplo.com/todos?x=1' \\\n  -H 'accept: application/json' \\\n  -H $'x-note: it\\'s ok' \\\n  --data-raw '{\"title\":\"pão\"}' \\\n  --compressed",
		)
		assert.deepEqual(parsed, {
			method: 'POST',
			url: 'https://api.exemplo.com/todos?x=1',
			headers: [
				{ key: 'accept', value: 'application/json' },
				{ key: 'x-note', value: "it's ok" },
			],
			bodyType: 'json',
			body: '{\n  "title": "pão"\n}',
		})
	})
	it('reads -X, double quotes, --user and --json', () => {
		const parsed = parseCurl('curl -sS -X PUT "api.x.com/a" -u ana:123 --json "{\\"a\\":1}"')
		assert.equal(parsed?.method, 'PUT')
		assert.equal(parsed?.url, 'https://api.x.com/a')
		assert.deepEqual(parsed?.headers, [
			{ key: 'Authorization', value: `Basic ${btoa('ana:123')}` },
			{ key: 'Content-Type', value: 'application/json' },
			{ key: 'Accept', value: 'application/json' },
		])
		assert.equal(parsed?.bodyType, 'json')
	})
	it('turns form data into one field per line and -G into a query', () => {
		assert.deepEqual(
			parseCurl("curl https://x.com -d 'nome=Ana%20B' -d idade=30")?.body,
			'nome=Ana B\nidade=30',
		)
		const get = parseCurl('curl -G https://x.com/busca --data-urlencode "q=pão quente"')
		assert.equal(get?.method, 'GET')
		assert.equal(get?.url, 'https://x.com/busca?q=p%C3%A3o%20quente')
		assert.equal(get?.bodyType, 'none')
	})
	it('explains what it cannot read', () => {
		assert.throws(() => parseCurl('curl -H "Accept: x"'), /sem URL|não tem URL/)
		assert.throws(() => parseCurl("curl 'https://x.com"), /sem fechamento/)
		assert.throws(() => parseCurl('curl -X TRACE https://x.com'), /TRACE/)
	})
})

describe('JSON tokens', () => {
	it('tells keys from string values, numbers and literals', () => {
		const tokens = jsonTokens('{\n  "a": "b",\n  "n": -1.5e3,\n  "ok": true\n}')
		const pick = (kind: string) => tokens.filter((t) => t.kind === kind).map((t) => t.text)
		assert.deepEqual(pick('key'), ['"a"', '"n"', '"ok"'])
		assert.deepEqual(pick('string'), ['"b"'])
		assert.deepEqual(pick('number'), ['-1.5e3'])
		assert.deepEqual(pick('literal'), ['true'])
		assert.equal(
			tokens.map((t) => t.text).join(''),
			'{\n  "a": "b",\n  "n": -1.5e3,\n  "ok": true\n}',
		)
	})
})

describe('JSON generator', () => {
	const generators = { ...BASE_GENERATORS, fixo: () => 'F', ...fakerGenerators(faker) }
	it('base generators respect arguments', () => {
		for (let i = 0; i < 200; i += 1) {
			const n = BASE_GENERATORS.inteiro?.([5, 7], { index: 1 }) as number
			assert.ok(n >= 5 && n <= 7 && Number.isInteger(n))
			const d = BASE_GENERATORS.decimal?.([1, 2, 3], { index: 1 }) as number
			assert.ok(d >= 1 && d <= 2 && Number(d.toFixed(3)) === d)
		}
		assert.throws(() => BASE_GENERATORS.inteiro?.([9, 1], { index: 1 }), /mínimo/)
		assert.throws(() => BASE_GENERATORS.inteiro?.([1.5, 3], { index: 1 }), /inteiros/)
		assert.ok(validateCPF(BASE_GENERATORS.cpf?.([], { index: 1 }) as string).valid)
		assert.ok(validateCNPJ(BASE_GENERATORS.cnpj?.([], { index: 1 }) as string).valid)
		assert.match(
			BASE_GENERATORS.uuid?.([], { index: 1 }) as string,
			/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
		)
		assert.match(BASE_GENERATORS.data?.([], { index: 1 }) as string, /^20[0-3]\d-\d{2}-\d{2}$/)
		assert.equal(String(BASE_GENERATORS.lorem?.([4], { index: 1 })).split(' ').length, 4)
		assert.match(BASE_GENERATORS.cor?.([], { index: 1 }) as string, /^#[0-9a-f]{6}$/)
		assert.equal(typeof BASE_GENERATORS.booleano?.([], { index: 1 }), 'boolean')
	})
	it('faker generators work', () => {
		for (const [name, generator] of Object.entries(fakerGenerators(faker))) {
			const value = generator([], { index: 1 })
			assert.ok(value !== undefined && value !== '', name)
		}
		assert.match(fakerGenerators(faker).cep?.([], { index: 1 }) as string, /^\d{5}-\d{3}$/)
	})
	it('every documented placeholder exists', () => {
		for (const doc of PLACEHOLDERS) {
			for (const match of doc.syntax.matchAll(/\{\{([a-zA-Z]+)/g)) {
				const name = match[1] ?? ''
				assert.ok(name === 'repetir' || name in generators, name)
			}
		}
	})
	it('keeps types for whole-string placeholders and interpolates the rest', () => {
		const result = renderTemplate(
			{
				a: '{{ inteiro(3, 3) }}',
				b: 'id-{{fixo}}-{{inteiro(1,1)}}',
				c: '{{booleano}}',
				d: 1,
				e: null,
				f: [true],
			},
			generators,
		) as Record<string, unknown>
		assert.equal(result.a, 3)
		assert.equal(result.b, 'id-F-1')
		assert.equal(typeof result.c, 'boolean')
		assert.equal(result.d, 1)
		assert.equal(result.e, null)
		assert.deepEqual(result.f, [true])
	})
	it('repeats with index', () => {
		const result = renderTemplate(
			{ list: ['{{repetir(3)}}', { i: '{{indice}}' }] },
			generators,
		) as {
			list: { i: number }[]
		}
		assert.deepEqual(result.list, [{ i: 1 }, { i: 2 }, { i: 3 }])
		const ranged = renderTemplate(['{{repetir(2, 4)}}', 'x'], generators) as string[]
		assert.ok(ranged.length >= 2 && ranged.length <= 4)
		assert.deepEqual(renderTemplate(['{{repetir(0)}}', 'x'], generators), [])
	})
	it('reports errors', () => {
		assert.throws(() => renderTemplate('{{xyz}}', generators), /desconhecido: \{\{xyz\}\}/)
		assert.throws(() => renderTemplate('{{repetir(2)}}', generators), /primeiro item/)
		assert.throws(() => renderTemplate(['{{repetir(2)}}'], generators), /único modelo/)
		assert.throws(() => renderTemplate(['{{repetir(2001)}}', 1], generators), /1.000/)
		assert.throws(() => renderTemplate('{{inteiro(a)}}', generators), /Argumento inválido/)
		assert.throws(
			() => renderTemplate(['{{repetir(1000)}}', ['{{repetir(1000)}}', '{{fixo}}']], generators),
			/grande demais/,
		)
	})
	it('generates one object or an array', () => {
		const one = JSON.parse(generateJson('{"n":"{{indice}}"}', 1, generators))
		assert.deepEqual(one, { n: 1 })
		const many = JSON.parse(generateJson('{"n":"{{indice}}"}', 3, generators))
		assert.deepEqual(many, [{ n: 1 }, { n: 2 }, { n: 3 }])
		assert.throws(() => generateJson('{', 1, generators), /JSON válido/)
	})
	it('builds templates from fields', () => {
		assert.equal(
			templateFromFields([
				{ name: 'id', type: 'uuid' },
				{ name: ' nome ', type: 'nome' },
			]),
			'{\n  "id": "{{uuid}}",\n  "nome": "{{nome}}"\n}',
		)
		assert.throws(() => templateFromFields([]), /pelo menos um/)
		assert.throws(() => templateFromFields([{ name: '', type: 'uuid' }]), /nome/)
		assert.throws(
			() =>
				templateFromFields([
					{ name: 'a', type: 'uuid' },
					{ name: 'a', type: 'nome' },
				]),
			/duas vezes/,
		)
	})
})
