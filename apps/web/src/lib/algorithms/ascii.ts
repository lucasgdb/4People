/** Abbreviation and Portuguese name of the control characters 0–31, as "ABBR Name". */
const CONTROL_CHARACTERS = [
	'NUL Nulo',
	'SOH Início de cabeçalho',
	'STX Início de texto',
	'ETX Fim de texto',
	'EOT Fim de transmissão',
	'ENQ Consulta',
	'ACK Confirmação',
	'BEL Sinal sonoro',
	'BS Backspace',
	'HT Tabulação horizontal',
	'LF Nova linha',
	'VT Tabulação vertical',
	'FF Nova página',
	'CR Retorno de carro',
	'SO Shift out',
	'SI Shift in',
	'DLE Escape de enlace',
	'DC1 Controle 1 (XON)',
	'DC2 Controle 2',
	'DC3 Controle 3 (XOFF)',
	'DC4 Controle 4',
	'NAK Confirmação negativa',
	'SYN Ocioso síncrono',
	'ETB Fim de bloco',
	'CAN Cancelar',
	'EM Fim do meio',
	'SUB Substituir',
	'ESC Escape',
	'FS Separador de arquivo',
	'GS Separador de grupo',
	'RS Separador de registro',
	'US Separador de unidade',
]

const DELETE_CODE = 127
const SPACE_CODE = 32
const NO_BREAK_SPACE_CODE = 160

export type AsciiRow = {
	code: number
	hex: string
	octal: string
	binary: string
	char: string
	html: string
	description: string
}

const isC0Control = (code: number) => code < 32 || code === DELETE_CODE
const isC1Control = (code: number) => code >= 128 && code < 160

/** Abbreviation and name of a C0 control character or DEL. */
function controlCharacter(code: number) {
	if (code === DELETE_CODE) return { abbreviation: 'DEL', name: 'Apagar' }
	const [abbreviation = '', ...nameWords] = (CONTROL_CHARACTERS[code] ?? '').split(' ')
	return { abbreviation, name: nameWords.join(' ') }
}

/** What the table shows in the "character" column: the abbreviation for controls, ␠ for space. */
function displayChar(code: number): string {
	if (isC0Control(code)) return controlCharacter(code).abbreviation
	if (isC1Control(code)) return ''
	if (code === SPACE_CODE) return '␠'
	return String.fromCharCode(code)
}

function describe(code: number): string {
	if (isC0Control(code)) return controlCharacter(code).name
	if (code === SPACE_CODE) return 'Espaço'
	if (code === NO_BREAK_SPACE_CODE) return 'Espaço sem quebra'
	if (isC1Control(code)) return 'Controle C1'
	return ''
}

/** 0–255: ASCII (0–127) and the Latin-1 extension (128–255) that Windows and the web use for Portuguese. */
export const ASCII_TABLE: AsciiRow[] = Array.from({ length: 256 }, (_, code) => ({
	code,
	hex: code.toString(16).toUpperCase().padStart(2, '0'),
	octal: code.toString(8).padStart(3, '0'),
	binary: code.toString(2).padStart(8, '0'),
	char: displayChar(code),
	html: `&#${code};`,
	description: describe(code),
}))
