const CONTROL = [
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

export type AsciiRow = {
	code: number
	hex: string
	octal: string
	binary: string
	char: string
	html: string
	description: string
}

/** 0–255: ASCII (0–127) and the Latin-1 extension (128–255) that Windows and the web use for Portuguese. */
export const ASCII_TABLE: AsciiRow[] = Array.from({ length: 256 }, (_, code) => {
	const control = code < 32 || code === 127 || (code >= 128 && code < 160)
	const [abbr, ...name] =
		code < 32 ? (CONTROL[code] ?? '').split(' ') : code === 127 ? ['DEL', 'Apagar'] : []
	return {
		code,
		hex: code.toString(16).toUpperCase().padStart(2, '0'),
		octal: code.toString(8).padStart(3, '0'),
		binary: code.toString(2).padStart(8, '0'),
		char: control ? (abbr ?? '') : code === 32 ? '␠' : String.fromCharCode(code),
		html: `&#${code};`,
		description:
			code < 32 || code === 127
				? name.join(' ')
				: code === 32
					? 'Espaço'
					: code === 160
						? 'Espaço sem quebra'
						: code >= 128 && code < 160
							? 'Controle C1'
							: '',
	}
})
