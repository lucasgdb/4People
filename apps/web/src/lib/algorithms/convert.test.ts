import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
	attempt,
	buildDataUri,
	columnNames,
	csvToSql,
	dataUriSnippets,
	detectDelimiter,
	extensionForMime,
	formatBytes,
	inferColumnType,
	inferScalar,
	iniTo,
	jsonErrorOffset,
	jsonToXml,
	jsonToYaml,
	lineColumn,
	parseCsv,
	parseDataUri,
	parseIni,
	parseJson,
	quoteIdentifier,
	sqlLiteral,
	sqlType,
	XML_READ_DEFAULTS,
	XML_WRITE_DEFAULTS,
	xmlName,
	xmlToJson,
	yamlToJson,
} from './convert.ts'

describe('shared', () => {
	it('lineColumn', () => {
		assert.deepEqual(lineColumn('ab\ncd', 0), { line: 1, column: 1 })
		assert.deepEqual(lineColumn('ab\ncd', 4), { line: 2, column: 2 })
	})
	it('jsonErrorOffset finds the first syntax error', () => {
		assert.equal(jsonErrorOffset('{"a":[1,2,{"b":null}],"c":"\\u00e9"}'), -1)
		assert.equal(jsonErrorOffset('{"a":}'), 5)
		assert.equal(jsonErrorOffset('[1,]'), 3)
		assert.equal(jsonErrorOffset("{'a':1}"), 1)
		assert.equal(jsonErrorOffset('{"a":1} x'), 8)
		assert.equal(jsonErrorOffset('"abc'), 4)
		assert.equal(jsonErrorOffset('01'), 1)
		assert.equal(jsonErrorOffset(''), 0)
	})
	it('attempt wraps errors', () => {
		assert.deepEqual(
			attempt(() => 'x'),
			{ ok: true, output: 'x' },
		)
		assert.deepEqual(
			attempt(() => ({ output: 'y', info: 'i' })),
			{ ok: true, output: 'y', info: 'i' },
		)
		const failed = attempt(() => JSON.stringify(parseIni('a=1\n[x')))
		assert.ok(!failed.ok && failed.line === 2)
	})
	it('parseJson reports line and column', () => {
		assert.deepEqual(parseJson('{"a":1}'), { a: 1 })
		assert.throws(
			() => parseJson('{\n  "a": 1,\n}'),
			(error: Error & { line?: number }) => error.line === 3 && /linha 3/.test(error.message),
		)
	})
})

describe('YAML', () => {
	it('JSON → YAML with indent', async () => {
		const result = await jsonToYaml('{"a":1,"b":[1,{"c":null}],"d":"x: y"}', 2)
		assert.ok(result.ok)
		assert.equal(result.output, "a: 1\nb:\n  - 1\n  - c: null\nd: 'x: y'\n")
		const four = await jsonToYaml('{"a":{"b":1}}', 4)
		assert.ok(four.ok && four.output.includes('    b: 1'))
	})
	it('JSON → YAML error', async () => {
		const result = await jsonToYaml('{"a":}')
		assert.equal(result.ok, false)
		assert.ok(!result.ok && result.line === 1 && result.column === 6)
	})
	it('YAML → JSON, single and multi-document', async () => {
		const one = await yamlToJson('a: 1\nb: [x, y]\n', '2')
		assert.ok(one.ok)
		assert.deepEqual(JSON.parse(one.output), { a: 1, b: ['x', 'y'] })
		const many = await yamlToJson('a: 1\n---\nb: 2\n', '0')
		assert.ok(many.ok)
		assert.equal(many.output, '[{"a":1},{"b":2}]')
		assert.match(many.info ?? '', /2 documentos/)
		const tab = await yamlToJson('a: 1', 'tab')
		assert.ok(tab.ok && tab.output === '{\n\t"a": 1\n}')
	})
	it('YAML errors carry line and column', async () => {
		const result = await yamlToJson('a: 1\n b: : [')
		assert.ok(!result.ok)
		assert.equal(result.line, 2)
		assert.equal(result.column, 3)
		assert.match(result.error, /linha 2, coluna 3/)
	})
})

describe('XML', () => {
	const xml = '<?xml version="1.0"?><a x="1"><b>t</b><b y="2">u</b><n>42</n></a>'
	it('XML → JSON keeps attributes with the prefix', async () => {
		const result = await xmlToJson(xml, XML_READ_DEFAULTS, '0')
		assert.ok(result.ok)
		assert.deepEqual(JSON.parse(result.output), {
			a: { b: ['t', { '#text': 'u', '@_y': 2 }], n: 42, '@_x': 1 },
		})
	})
	it('XML → JSON options: no attributes, text as strings, custom names', async () => {
		const plain = await xmlToJson(
			xml,
			{ keepAttributes: false, attributePrefix: '@_', textNodeName: '#text', parseValues: false },
			'0',
		)
		assert.ok(plain.ok)
		assert.deepEqual(JSON.parse(plain.output), { a: { b: ['t', 'u'], n: '42' } })
		const custom = await xmlToJson(
			'<a k="v">t</a>',
			{ keepAttributes: true, attributePrefix: '$', textNodeName: '_', parseValues: true },
			'0',
		)
		assert.ok(custom.ok)
		assert.deepEqual(JSON.parse(custom.output), { a: { _: 't', $k: 'v' } })
	})
	it('XML errors carry line and column', async () => {
		const result = await xmlToJson('<a>\n<b></a>', XML_READ_DEFAULTS)
		assert.ok(!result.ok)
		assert.equal(result.line, 2)
		assert.match(result.error, /XML inválido \(linha 2/)
	})
	it('JSON → XML with root, attributes, arrays and escaping', async () => {
		const result = await jsonToXml('{"user":{"@_id":7,"name":"A & B","tags":["x","y"]}}', {
			...XML_WRITE_DEFAULTS,
			rootName: '',
			declaration: false,
		})
		assert.ok(result.ok)
		assert.equal(
			result.output,
			'<user id="7">\n  <name>A &amp; B</name>\n  <tags>x</tags>\n  <tags>y</tags>\n</user>',
		)
		const rooted = await jsonToXml('[1,2]', { ...XML_WRITE_DEFAULTS, indent: '0' })
		assert.ok(rooted.ok)
		assert.equal(
			rooted.output,
			'<?xml version="1.0" encoding="UTF-8"?><root><item>1</item><item>2</item></root>',
		)
	})
	it('JSON → XML renames invalid element names and rejects bad roots', async () => {
		assert.equal(xmlName('first name'), 'first_name')
		assert.equal(xmlName('1st'), '_1st')
		assert.equal(xmlName('xmlThing'), '_xmlThing')
		const result = await jsonToXml('{"2x":1}', { ...XML_WRITE_DEFAULTS, declaration: false })
		assert.ok(result.ok && result.output.includes('<_2x>1</_2x>'))
		const bad = await jsonToXml('{"a":1}', { ...XML_WRITE_DEFAULTS, rootName: '1abc' })
		assert.ok(!bad.ok && /raiz inválido/.test(bad.error))
		const noRoot = await jsonToXml('{"a":1,"b":2}', { ...XML_WRITE_DEFAULTS, rootName: '' })
		assert.ok(!noRoot.ok && /única chave/.test(noRoot.error))
	})
})

describe('INI', () => {
	const ini = `; comment
name = app
debug = true

[database]
host: localhost
port = 5432
password = "p;a\\"ss" ; trailing
path = C:\\data # comment

[database.replica]
host = 'r1'

[servers]
host = a
host = b
list[] = x
flag
`
	it('parses sections, nesting, comments, quotes, duplicates and arrays', () => {
		assert.deepEqual(parseIni(ini), {
			name: 'app',
			debug: true,
			database: {
				host: 'localhost',
				port: 5432,
				password: 'p;a"ss',
				path: 'C:\\data',
				replica: { host: 'r1' },
			},
			servers: { host: ['a', 'b'], list: ['x'], flag: true },
		})
	})
	it('keeps text when type inference is off', () => {
		assert.deepEqual(parseIni('a = 1\nb = true', { inferTypes: false }), { a: '1', b: 'true' })
	})
	it('inferScalar', () => {
		assert.equal(inferScalar('42'), 42)
		assert.equal(inferScalar('-1.5'), -1.5)
		assert.equal(inferScalar('007'), '007')
		assert.equal(inferScalar('off'), false)
		assert.equal(inferScalar('null'), null)
		assert.equal(inferScalar('99999999999999999999'), '99999999999999999999')
	})
	it('reports errors with the line', () => {
		assert.throws(() => parseIni('a=1\n[sec'), /linha 2/)
		assert.throws(() => parseIni('[]'), /vazio/)
		assert.throws(() => parseIni('a = "x'), /Aspas sem fechamento/)
		assert.throws(() => parseIni('a = 1\n[a]'), /já foi usada/)
		assert.throws(() => parseIni('[a]\n[b]\na=1\n[x]\nb = 1\n[x.b]'), /já foi usada/)
		assert.throws(() => parseIni('not a pair'), /Linha sem "=" ou ":"/)
		assert.throws(() => parseIni('= 1'), /Chave vazia/)
	})
	it('converts to JSON, YAML and XML', async () => {
		const json = await iniTo('[a]\nb=1', 'json', { inferTypes: true, indent: '0' })
		assert.ok(json.ok && json.output === '{"a":{"b":1}}')
		const yaml = await iniTo('[a]\nb=1', 'yaml', { inferTypes: true, indent: '2' })
		assert.ok(yaml.ok && yaml.output === 'a:\n  b: 1\n')
		const bad = await iniTo('[x', 'json', { inferTypes: true, indent: '2' })
		assert.ok(!bad.ok && bad.line === 1)
	})
})

describe('CSV → SQL', () => {
	it('parseCsv follows RFC 4180', () => {
		assert.deepEqual(parseCsv('a,b\r\n"x, y","he said ""hi"""\n"multi\nline",2\n\n', ','), [
			['a', 'b'],
			['x, y', 'he said "hi"'],
			['multi\nline', '2'],
		])
		assert.deepEqual(parseCsv('a,,c', ','), [['a', '', 'c']])
		assert.throws(() => parseCsv('a,"b', ','), /Aspas sem fechamento/)
	})
	it('detectDelimiter', () => {
		assert.equal(detectDelimiter('a;b;c\n1;2,5;3'), ';')
		assert.equal(detectDelimiter('a\tb\n1\t2'), '\t')
		assert.equal(detectDelimiter('a|b|c\n1|2|3'), '|')
		assert.equal(detectDelimiter('a,b\n"1;2",3'), ',')
		assert.equal(detectDelimiter('single'), ',')
	})
	it('inferColumnType', () => {
		assert.equal(inferColumnType(['1', '-2', '']).kind, 'integer')
		assert.equal(inferColumnType(['1', '']).nullable, true)
		assert.equal(inferColumnType(['3000000000']).kind, 'bigint')
		const dec = inferColumnType(['1.5', '120.25', '3'])
		assert.deepEqual([dec.kind, dec.precision, dec.scale], ['decimal', 5, 2])
		assert.equal(inferColumnType(['true', 'FALSE']).kind, 'boolean')
		assert.equal(inferColumnType(['2024-02-29', '31/12/2023']).kind, 'date')
		assert.equal(inferColumnType(['2023-02-30']).kind, 'text')
		assert.equal(inferColumnType(['2024-01-01 10:00:00']).kind, 'datetime')
		const text = inferColumnType(['abc', 'çãoé'])
		assert.deepEqual([text.kind, text.length], ['text', 4])
		assert.equal(inferColumnType(['', '']).kind, 'text')
	})
	it('types, identifiers and literals per dialect', () => {
		const text = inferColumnType(['abc'])
		assert.equal(sqlType(text, 'mysql'), 'VARCHAR(3)')
		assert.equal(sqlType(text, 'sqlserver'), 'NVARCHAR(3)')
		assert.equal(sqlType(text, 'sqlite'), 'TEXT')
		assert.equal(sqlType({ ...text, length: 5000 }, 'postgresql'), 'TEXT')
		const bool = inferColumnType(['true'])
		assert.equal(sqlType(bool, 'sqlserver'), 'BIT')
		assert.equal(sqlLiteral('true', bool, 'postgresql'), 'TRUE')
		assert.equal(sqlLiteral('false', bool, 'sqlite'), '0')
		assert.equal(quoteIdentifier('a`b', 'mysql'), '`a``b`')
		assert.equal(quoteIdentifier('a]b', 'sqlserver'), '[a]]b]')
		assert.equal(quoteIdentifier('a"b', 'postgresql'), '"a""b"')
		assert.equal(sqlLiteral("O'Brien\\", text, 'mysql'), "'O''Brien\\\\'")
		assert.equal(sqlLiteral("O'Brien", text, 'sqlserver'), "N'O''Brien'")
		assert.equal(sqlLiteral('', text, 'postgresql'), 'NULL')
		assert.equal(sqlLiteral('31/12/2023', inferColumnType(['31/12/2023']), 'mysql'), "'2023-12-31'")
		assert.equal(sqlLiteral('.5', inferColumnType(['.5']), 'mysql'), '0.5')
		assert.equal(sqlLiteral(' ', inferColumnType(['1', ' ']), 'mysql'), 'NULL')
	})
	it('columnNames dedupes and fills blanks', () => {
		assert.deepEqual(columnNames(['id', 'ID', ' ', 'x'], 5), [
			'id',
			'ID_2',
			'coluna_3',
			'x',
			'coluna_5',
		])
		assert.deepEqual(columnNames(null, 2), ['coluna_1', 'coluna_2'])
	})
	it('csvToSql builds CREATE TABLE and batched INSERTs', () => {
		const result = csvToSql('id;nome;ativo\n1;Ana;true\n2;Bia;false\n3;;true', {
			tableName: 'pessoas',
			dialect: 'postgresql',
			delimiter: 'auto',
			header: true,
			batchSize: 2,
			createTable: true,
		})
		assert.equal(result.delimiter, ';')
		assert.equal(result.rows, 3)
		assert.equal(
			result.sql,
			`CREATE TABLE "pessoas" (
  "id"    INTEGER NOT NULL,
  "nome"  VARCHAR(3),
  "ativo" BOOLEAN NOT NULL
);

INSERT INTO "pessoas" ("id", "nome", "ativo") VALUES
  (1, 'Ana', TRUE),
  (2, 'Bia', FALSE);

INSERT INTO "pessoas" ("id", "nome", "ativo") VALUES
  (3, NULL, TRUE);`,
		)
	})
	it('csvToSql warns about ragged rows and works without header', () => {
		const result = csvToSql('1,2\n3\n4,5,6', {
			tableName: 'db.t',
			dialect: 'mysql',
			delimiter: ',',
			header: false,
			batchSize: 100,
			createTable: false,
		})
		assert.equal(result.warnings.length, 1)
		assert.match(result.sql, /^INSERT INTO `db`.`t` \(`coluna_1`, `coluna_2`, `coluna_3`\)/)
		assert.match(result.sql, /\(3, NULL, NULL\)/)
		assert.throws(() => csvToSql('', { ...baseCsv }), /vazio/)
	})
})

const baseCsv = {
	tableName: 't',
	dialect: 'mysql' as const,
	delimiter: 'auto' as const,
	header: true,
	batchSize: 10,
	createTable: true,
}

describe('data URI', () => {
	it('parses base64 and percent-encoded URIs', () => {
		const png = parseDataUri('data:image/png;base64,iVBORw0KGgo=')
		assert.equal(png.mime, 'image/png')
		assert.equal(png.base64, true)
		assert.deepEqual([...png.bytes], [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
		const text = parseDataUri('data:text/plain;charset=utf-8,Ol%C3%A1')
		assert.deepEqual(text.params, ['charset=utf-8'])
		assert.equal(new TextDecoder().decode(text.bytes), 'Olá')
		assert.equal(parseDataUri('data:,x').mime, 'text/plain')
		assert.equal(parseDataUri('url("data:image/gif;base64,R0lG")').mime, 'image/gif')
	})
	it('rejects invalid input', () => {
		assert.throws(() => parseDataUri('hello'), /não é um data URI/)
		assert.throws(() => parseDataUri('data:image/png;base64,@@@'), /Base64/)
		assert.throws(() => parseDataUri('data:bad mime;base64,AA=='), /MIME inválido/)
		assert.throws(() => parseDataUri('data:text/plain,%E0%A4%A'), /%/)
	})
	it('formatBytes', () => {
		assert.equal(formatBytes(1), '1 byte')
		assert.equal(formatBytes(1000), '1000 bytes')
		assert.equal(formatBytes(1536), '1,5 KB')
		assert.equal(formatBytes(5 * 1024 * 1024), '5 MB')
	})
	it('builds URIs, snippets and extensions', () => {
		const uri = buildDataUri('image/png', new Uint8Array([1, 2, 3]))
		assert.equal(uri, 'data:image/png;base64,AQID')
		const snippets = dataUriSnippets(uri, { width: 2, height: 3 }, 'Logo "x"')
		assert.equal(snippets.css, 'background-image: url("data:image/png;base64,AQID");')
		assert.equal(
			snippets.html,
			'<img src="data:image/png;base64,AQID" width="2" height="3" alt="Logo &quot;x&quot;">',
		)
		assert.equal(snippets.markdown, '![Logo "x"](data:image/png;base64,AQID)')
		assert.equal(extensionForMime('image/jpeg'), 'jpg')
		assert.equal(extensionForMime('image/svg+xml'), 'svg')
		assert.equal(extensionForMime('application/x-foo'), 'xfoo')
	})
})
