import type { ReactNode, SVGProps } from 'react'

/**
 * 4People tool icons: one outline set on a 24px grid, 1.5px stroke, round caps and joins.
 * Shared grammar: generators carry a "+", validators a check badge, area tools show the shape itself,
 * date tools a calendar with the operation inside.
 */

const plus = <path d="M19 2.75v5.5M16.25 5.5h5.5" />
const checkBadge = (
	<>
		<circle cx="18" cy="17.5" r="4.25" />
		<path d="m16.2 17.6 1.3 1.3 2.4-2.6" />
	</>
)
const card = <rect x="2.75" y="7" width="15.5" height="12" rx="2" />
const car = (
	<>
		<path d="M4.75 15.75h14.5M6 15.75v-3.5l1.7-3.6a2 2 0 0 1 1.8-1.15h5a2 2 0 0 1 1.8 1.15l1.7 3.6v3.5M6 12.25h12M6 15.75v2.5M18 15.75v2.5" />
		<circle cx="8.75" cy="14" r=".6" fill="currentColor" stroke="none" />
		<circle cx="15.25" cy="14" r=".6" fill="currentColor" stroke="none" />
	</>
)
const steering = (
	<>
		<circle cx="7.5" cy="13" r="2.5" />
		<path d="M5 13h5M7.5 13v2.5" />
	</>
)
const ballot = (
	<>
		<rect x="3.75" y="11" width="13" height="9.5" rx="1.5" />
		<path d="M7.75 11V5.25h5V11M7.75 15.5h5" />
	</>
)
const creditCard = (
	<>
		<rect x="2.75" y="6.5" width="15.5" height="11" rx="2" />
		<path d="M2.75 10h15.5M5.75 14.25h3" />
	</>
)
const halfCard = <path d="M13.25 19H4.75a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h11.5a2 2 0 0 1 2 2v3.25" />
const calendar = (
	<>
		<rect x="3" y="4.75" width="18" height="16.5" rx="2.5" />
		<path d="M3 9.75h18M8 2.75v4M16 2.75v4" />
	</>
)

const ICONS: Record<string, ReactNode> = {
	/* ------------------------------ Geradores ------------------------------ */
	'gerador-de-cpf': (
		<>
			{card}
			<path d="M5.75 13h2.5M10 13h2.5M14.25 13h1.25M5.75 16h6" />
			{plus}
		</>
	),
	'gerador-de-cnpj': (
		<>
			<path d="M3 21.25h15M4.5 21.25V9.5l5-2.75v14.5M9.5 21.25V4.25l7 3v14" />
			<path d="M12 10h2M12 13.5h2M12 17h2M6.75 13h.5M6.75 16.5h.5" />
			{plus}
		</>
	),
	'gerador-de-rg': (
		<>
			{card}
			<circle cx="7.25" cy="12" r="2" />
			<path d="M4.75 16.75a2.75 2.75 0 0 1 5 0M12 11.5h3.5M12 14.75h3.5" />
			{plus}
		</>
	),
	'gerador-de-senha': (
		<>
			<rect x="2.25" y="7.25" width="19.5" height="9.5" rx="3" />
			<circle cx="7" cy="12" r="1.1" fill="currentColor" stroke="none" />
			<circle cx="11" cy="12" r="1.1" fill="currentColor" stroke="none" />
			<circle cx="15" cy="12" r="1.1" fill="currentColor" stroke="none" />
			<path d="M18.25 9.75v4.5" />
		</>
	),
	'gerador-de-nomes': (
		<>
			<circle cx="8" cy="8.5" r="3.25" />
			<path d="M2.75 19.75a5.25 5.25 0 0 1 10.5 0M15.5 9.5h6M15.5 13h6M15.5 16.5h3.75" />
		</>
	),

	/* ----------------------------- Validadores ----------------------------- */
	'validador-de-cpf': (
		<>
			<path d="M13.25 19H4.75a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h11.5a2 2 0 0 1 2 2v3.25" />
			<path d="M5.75 11h2.5M10 11h2.5M5.75 14h5" />
			{checkBadge}
		</>
	),
	'validador-de-cnpj': (
		<>
			<path d="M3 21.25h9.5M4.5 21.25V9.5l5-2.75v14.5M9.5 4.25l7 3v5" />
			<path d="M12 10h2M6.75 13h.5M6.75 16.5h.5" />
			{checkBadge}
		</>
	),
	'validador-de-rg': (
		<>
			<path d="M13.25 19H4.75a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h11.5a2 2 0 0 1 2 2v3.25" />
			<circle cx="7.25" cy="11.25" r="1.75" />
			<path d="M5 15.75a2.5 2.5 0 0 1 4.5 0M12 11h3" />
			{checkBadge}
		</>
	),

	/* ---------------------------- Funções de texto ------------------------- */
	'contador-de-caracteres': (
		<>
			<path d="m2.75 18.5 4.5-12.5 4.5 12.5M4.4 14h5.7" />
			<path d="M15 9.75h6.5M15 14.75h6.5M17.25 7l-1 10.25M20.5 7l-1 10.25" />
		</>
	),

	/* ---------------------------- Rede e internet -------------------------- */
	'meu-ip': (
		<>
			<circle cx="12" cy="12" r="9.25" />
			<path d="M2.75 12h18.5M12 2.75c-2.6 2.5-3.9 5.6-3.9 9.25s1.3 6.75 3.9 9.25c2.6-2.5 3.9-5.6 3.9-9.25S14.6 5.25 12 2.75Z" />
		</>
	),
	'buscar-cep': (
		<>
			<path d="M12 21.25s-6.75-5.9-6.75-11.25a6.75 6.75 0 0 1 13.5 0c0 5.35-6.75 11.25-6.75 11.25Z" />
			<circle cx="12" cy="10" r="2.5" />
		</>
	),

	/* ------------------------------ Codificadores -------------------------- */
	'conversor-de-binario': (
		<>
			<rect x="3.75" y="3.25" width="5.5" height="7.5" rx="2.75" />
			<path d="M16.25 3.25v7.5M14.25 4.75l2-1.5M7.25 13.25v7.5M5.25 14.75l2-1.5" />
			<rect x="13.75" y="13.25" width="5.5" height="7.5" rx="2.75" />
		</>
	),

	/* ---------------------------- Tabelas e padrões ------------------------ */
	'eventos-de-teclado': (
		<>
			<rect x="3.75" y="9.25" width="16.5" height="12" rx="2.75" />
			<path d="M8.75 17.25h6.5M12 2.75v4M9.75 4.75 12 7l2.25-2.25" />
		</>
	),

	/* ------------------------------ Cálculo de áreas ----------------------- */
	'area-do-circulo': (
		<>
			<circle cx="12" cy="12" r="8.75" />
			<path d="M12 12h8.75" />
			<circle cx="12" cy="12" r=".9" fill="currentColor" stroke="none" />
		</>
	),
	'area-do-quadrado': (
		<>
			<rect x="4.25" y="4.25" width="15.5" height="15.5" rx="1.25" />
			<path d="m4.5 11.75 7.25-7.25M4.75 19.25 19.25 4.75M12.25 19.5l7.25-7.25" />
		</>
	),
	'area-do-retangulo': (
		<>
			<rect x="2.75" y="5.25" width="18.5" height="10.5" rx="1.25" />
			<path d="M2.75 20h18.5M2.75 18.75v2.5M21.25 18.75v2.5" />
		</>
	),
	'area-do-triangulo': (
		<>
			<path d="M12 3.75 21.25 19.5H2.75L12 3.75Z" />
			<path d="M12 7v12.25" strokeDasharray="1.75 2" />
		</>
	),
	'area-do-pentagono': <path d="M12 2.9 20.85 9.33 17.47 19.75H6.53L3.15 9.33Z" />,
	'area-do-hexagono': <path d="M12 2.75 20.01 7.38v9.24L12 21.25l-8.01-4.63V7.38Z" />,
	'area-do-poligono-regular': (
		<path d="M8.6 3.75h6.8l4.85 4.85v6.8l-4.85 4.85H8.6L3.75 15.4V8.6Z" />
	),
	'area-do-losango': (
		<>
			<path d="M12 2.75 20.25 12 12 21.25 3.75 12Z" />
			<path d="M3.75 12h16.5M12 2.75v18.5" strokeDasharray="1.75 2" />
		</>
	),
	'area-do-trapezio': <path d="M7.25 5.75h9.5l4.5 12.5H2.75Z" />,
	'area-do-paralelogramo': <path d="M8 5.75h13.25l-5.25 12.5H2.75Z" />,
	'area-da-elipse': (
		<>
			<ellipse cx="12" cy="12" rx="9.25" ry="6" />
			<path d="M2.75 12h18.5M12 6v12" strokeDasharray="1.75 2" />
		</>
	),
	'area-da-coroa-circular': (
		<>
			<circle cx="12" cy="12" r="9" />
			<circle cx="12" cy="12" r="4.25" />
		</>
	),
	'area-do-setor-circular': (
		<>
			<path d="M12 12V3a9 9 0 0 1 8.56 11.78Z" />
			<path d="M20.56 14.78A9 9 0 1 1 12 3" strokeDasharray="1.75 2" />
		</>
	),

	/* ------------------------------ Cálculo de datas ----------------------- */
	'diferenca-entre-datas': (
		<>
			{calendar}
			<path d="M8 15.5h8M9.75 13.75 8 15.5l1.75 1.75M14.25 13.75 16 15.5l-1.75 1.75" />
		</>
	),
	'somar-em-data': (
		<>
			{calendar}
			<path d="M12 12.75v5.5M9.25 15.5h5.5" />
		</>
	),
	'subtrair-em-data': (
		<>
			{calendar}
			<path d="M9.25 15.5h5.5" />
		</>
	),

	/* -------------------------------- Calculadoras ------------------------- */
	porcentagem: (
		<>
			<path d="M18.75 5.25 5.25 18.75" />
			<circle cx="6.75" cy="6.75" r="2.5" />
			<circle cx="17.25" cy="17.25" r="2.5" />
		</>
	),
	'calculadora-de-imc': (
		<>
			<rect x="3.25" y="3.25" width="17.5" height="17.5" rx="4" />
			<path d="M7.75 11a4.25 4.25 0 0 1 8.5 0M12 11l1.75-2.5" />
		</>
	),
	'equacao-do-segundo-grau': (
		<>
			<path d="M2.75 14.5h18.5" />
			<path d="M5 3.75Q12 30 19 3.75" />
		</>
	),
	'fatorar-numero': (
		<>
			<circle cx="12" cy="4.5" r="1.75" />
			<circle cx="6.5" cy="12" r="1.75" />
			<circle cx="17.5" cy="12" r="1.75" />
			<circle cx="13.75" cy="19.5" r="1.75" />
			<circle cx="21" cy="19.5" r="1.75" />
			<path d="m10.95 5.95-3.4 4.6M13.05 5.95l3.4 4.6M16.75 13.6l-2.2 4.3M18.3 13.6l1.95 4.3" />
		</>
	),
	'maximo-divisor-comum': (
		<>
			<circle cx="8.75" cy="12" r="6.25" />
			<circle cx="15.25" cy="12" r="6.25" />
			<path
				d="M12 6.55a6.25 6.25 0 0 1 0 10.9 6.25 6.25 0 0 1 0-10.9Z"
				fill="currentColor"
				fillOpacity=".3"
			/>
		</>
	),
	'minimo-multiplo-comum': (
		<>
			<path
				d="M12 6.55a6.25 6.25 0 1 0 0 10.9 6.25 6.25 0 1 0 0-10.9Z"
				fill="currentColor"
				fillOpacity=".18"
			/>
			<circle cx="8.75" cy="12" r="6.25" />
			<circle cx="15.25" cy="12" r="6.25" />
		</>
	),
	'numeros-primos': (
		<>
			<circle cx="5.5" cy="5.5" r="1" fill="currentColor" stroke="none" />
			<circle cx="18.5" cy="5.5" r="1" fill="currentColor" stroke="none" />
			<circle cx="5.5" cy="12" r="1" fill="currentColor" stroke="none" />
			<circle cx="18.5" cy="12" r="1" fill="currentColor" stroke="none" />
			<circle cx="12" cy="18.5" r="1" fill="currentColor" stroke="none" />
			<circle cx="12" cy="5.5" r="2.75" />
			<circle cx="12" cy="12" r="2.75" />
			<circle cx="5.5" cy="18.5" r="2.75" />
			<circle cx="18.5" cy="18.5" r="2.75" />
		</>
	),
	'numeros-amigaveis': (
		<>
			<circle cx="5.75" cy="12" r="3" />
			<circle cx="18.25" cy="12" r="3" />
			<path d="M9.25 9.75h5.5M13 8l1.75 1.75L13 11.5M14.75 14.25h-5.5M11 12.5l-1.75 1.75L11 16" />
		</>
	),
	fibonacci: (
		<>
			<path d="M12.5 13a.75.75 0 0 0-.75-.75 1.5 1.5 0 0 0-1.5 1.5 2.25 2.25 0 0 0 2.25 2.25 3.75 3.75 0 0 0 3.75-3.75A6 6 0 0 0 10.25 6.25 9.5 9.5 0 0 0 2.75 15.75" />
			<rect x="2.75" y="3.75" width="18.5" height="16.5" rx="2" />
		</>
	),
	'conversor-de-temperatura': (
		<>
			<path d="M13.5 14.6V4.75a2.5 2.5 0 0 0-5 0v9.85a4.25 4.25 0 1 0 5 0Z" />
			<path d="M11 15.25v-6M17 6h2.75M17 9.5h2.75M17 13h1.75" />
		</>
	),
	'divisao-e-resto': (
		<>
			<path d="M4.75 12h14.5" />
			<circle cx="12" cy="6.5" r="1.35" fill="currentColor" stroke="none" />
			<circle cx="12" cy="17.5" r="1.35" fill="currentColor" stroke="none" />
		</>
	),

	/* ----------------------------- Novas ferramentas ---------------------------- */
	'gerador-de-uuid': (
		<>
			<rect x="2.75" y="7.25" width="15.5" height="10" rx="2" />
			<path d="M5.75 12.25h2.5M10 12.25h1.5M13.25 12.25h2" />
			{plus}
		</>
	),
	'gerador-de-hash': <path d="M9.5 3.75 7.5 20.25M16.5 3.75l-2 16.5M4.25 9h16.5M3.25 15h16.5" />,
	'maiusculas-e-minusculas': (
		<>
			<path d="m2.75 18.5 4.5-12.5 4.5 12.5M4.4 14h5.7" />
			<circle cx="17" cy="15.25" r="3.25" />
			<path d="M20.25 12v6.5" />
		</>
	),
	'formatador-de-json': (
		<path d="M8 3.75c-2 0-3 1-3 3v2.5c0 1.5-.75 2.25-2.25 2.75C4.25 12.5 5 13.25 5 14.75v2.5c0 2 1 3 3 3M16 3.75c2 0 3 1 3 3v2.5c0 1.5.75 2.25 2.25 2.75-1.5.5-2.25 1.25-2.25 2.75v2.5c0 2-1 3-3 3M10 12h.01M14 12h.01" />
	),
	base64: (
		<>
			<path d="M3 7.5h6M3 12h6M3 16.5h4M11.5 12h2.5M12.75 10.5 14.25 12l-1.5 1.5" />
			<rect x="16.25" y="6.75" width="2.25" height="2.25" rx=".5" />
			<rect x="16.25" y="10.88" width="2.25" height="2.25" rx=".5" />
			<rect x="16.25" y="15" width="2.25" height="2.25" rx=".5" />
			<rect x="19.5" y="8.8" width="2.25" height="2.25" rx=".5" />
			<rect x="19.5" y="12.95" width="2.25" height="2.25" rx=".5" />
		</>
	),
	'codificador-de-url': (
		<path d="M10 13.75a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-.75.75M14 10.25a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l.75-.75" />
	),
	'decodificador-de-jwt': (
		<>
			<rect x="2.25" y="9" width="5.5" height="6" rx="1.25" />
			<rect x="9.25" y="9" width="5.5" height="6" rx="1.25" />
			<rect x="16.25" y="9" width="5.5" height="6" rx="1.25" />
			<path d="M17.75 13.25 20.25 10.75" />
		</>
	),
	'conversor-de-bases-numericas': (
		<>
			<path d="M6.5 3.75v6.5M4.75 5.25l1.75-1.5" />
			<rect x="10" y="3.75" width="4.25" height="6.5" rx="2.1" />
			<path d="M3.5 15.25h16.5M17 12.25l3 3-3 3" />
		</>
	),
	'regra-de-tres': (
		<>
			<path d="M3.5 12h6M14.5 12h6M11.25 10.75h1.5M11.25 13.25h1.5" />
			<circle cx="6.5" cy="7.75" r="1.5" />
			<circle cx="6.5" cy="16.25" r="1.5" />
			<circle cx="17.5" cy="7.75" r="1.5" />
			<path d="m16 14.75 3 3m0-3-3 3" />
		</>
	),
	'conversor-de-unidades': (
		<>
			<path d="M3.5 15.5 15.5 3.5l5 5-12 12Z" />
			<path d="m7 12 1.75 1.75M9.5 9.5l2.5 2.5M12 7l1.75 1.75M14.5 4.5 17 7" />
		</>
	),
	'juros-compostos': (
		<>
			<path d="M3 20.25h18" />
			<path d="M4 18.25c6 0 10.5-3.25 15-12.5" />
			<path d="M15.25 5.25h4v4" />
		</>
	),
	'media-mediana-e-moda': (
		<>
			<path d="M6 20.25v-5.5M10 20.25v-9.5M14 20.25v-7M18 20.25V7.5M3 20.25h18" />
			<path d="M3 11h18" strokeDasharray="1.75 2" />
		</>
	),
	'arranjo-e-combinacao': (
		<>
			<circle cx="6" cy="6" r="2.25" />
			<circle cx="18" cy="6" r="2.25" />
			<circle cx="6" cy="18" r="2.25" />
			<circle cx="18" cy="18" r="2.25" />
			<path d="M8.25 6h7.5M8.25 18h7.5M6 8.25v7.5M18 8.25v7.5M7.6 7.6l8.8 8.8M16.4 7.6l-8.8 8.8" />
		</>
	),
	'numeros-romanos': (
		<path d="M5.5 6v12M3.5 6h4M3.5 18h4M10.25 6l4.25 12 4.25-12M9 6h2.5M17.5 6H20" />
	),

	/* --------------------------- Inspiradas no 4Devs ---------------------------- */
	'gerador-de-cnh': (
		<>
			{card}
			{steering}
			<path d="M12 11.5h3.5M12 14.5h3.5" />
			{plus}
		</>
	),
	'gerador-de-pis': (
		<>
			{card}
			<circle cx="7.25" cy="13" r="2.25" />
			<path d="M7.25 11.75v2.5M12 11.5h3.5M12 14.5h3.5" />
			{plus}
		</>
	),
	'gerador-de-renavam': (
		<>
			{car}
			{plus}
		</>
	),
	'gerador-de-titulo-de-eleitor': (
		<>
			{ballot}
			{plus}
		</>
	),
	'gerador-de-cartao-de-credito': (
		<>
			{creditCard}
			{plus}
		</>
	),
	'gerador-de-placas': (
		<>
			<rect x="2.75" y="6.75" width="18.5" height="10.5" rx="1.5" />
			<path d="M2.75 9.5h18.5M6.5 13.5h2.25M10.5 13.5h1M13.25 13.5h1M16 13.5h1.5" />
		</>
	),
	'gerador-de-pessoas': (
		<>
			<circle cx="8.5" cy="8.25" r="2.75" />
			<path d="M3.25 18.75a5.25 5.25 0 0 1 10.5 0" />
			<circle cx="16" cy="9.25" r="2.25" />
			<path d="M14.25 13.9a4.25 4.25 0 0 1 6.5 3.6" />
		</>
	),
	'validador-de-cnh': (
		<>
			{halfCard}
			<circle cx="7.25" cy="11.75" r="2" />
			<path d="M5.25 11.75h4M7.25 11.75v2" />
			{checkBadge}
		</>
	),
	'validador-de-pis': (
		<>
			{halfCard}
			<circle cx="7.25" cy="11.75" r="2" />
			<path d="M7.25 10.75v2M12 11h3" />
			{checkBadge}
		</>
	),
	'validador-de-renavam': (
		<>
			<path d="M3 14.25h10.5M4.25 14.25v-3l1.5-3.25a2 2 0 0 1 1.8-1.15h4.4a2 2 0 0 1 1.8 1.15l.75 1.6M4.25 10.75h9M4.25 14.25v2.25" />
			{checkBadge}
		</>
	),
	'validador-de-titulo-de-eleitor': (
		<>
			<path d="M13 20.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-6.5a1.5 1.5 0 0 1 1.5-1.5h10a1.5 1.5 0 0 1 1.5 1.5M7.75 11V5.25h5V11" />
			{checkBadge}
		</>
	),
	'validador-de-cartao-de-credito': (
		<>
			<path d="M13.25 17.5H4.75a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h11.5a2 2 0 0 1 2 2v3.25M2.75 10h15.5" />
			{checkBadge}
		</>
	),
	'letras-diferentes': (
		<>
			<path d="M3.5 19.5 10 4.5h2l2.75 15M6.25 14.25h8.5" />
			<path d="M19 3.25v4.5M16.75 5.5h4.5" />
		</>
	),
	'ordem-alfabetica': (
		<path d="M3.5 6h9M3.5 12h7M3.5 18h5M17.5 5v14M14.75 16.25 17.5 19l2.75-2.75" />
	),
	'frequencia-de-palavras': <path d="M4 5.5h15M4 10h11M4 14.5h7M4 19h3.5" />,
	'texto-para-html': <path d="M7.5 8 3.5 12l4 4M16.5 8l4 4-4 4M10 9h4M12 9v6" />,
	'informacoes-de-caractere': (
		<>
			<rect x="3.25" y="3.25" width="17.5" height="17.5" rx="3" />
			<path d="m8 16.5 4-9 4 9M9.5 13.25h5" />
		</>
	),
	'numero-por-extenso': (
		<path d="M5 7.5 6.75 6v12M4.25 18h5M11 12h3.5M12.75 10.25 14.5 12l-1.75 1.75M17.25 9h3.5M17.25 12h3.5M17.25 15h2.25" />
	),
	'limpar-texto': (
		<path d="M7 20.75h11M5.25 13.75l6.25-6.25a2 2 0 0 1 2.83 0l3.17 3.17a2 2 0 0 1 0 2.83l-6.75 6.75H8.5l-3.25-3.25a2 2 0 0 1 0-2.83ZM9.5 9.5l5 5" />
	),
	'tabela-ascii': (
		<>
			<rect x="3" y="4" width="18" height="16" rx="2" />
			<path d="M3 9h18M3 14.5h18M9 4v16" />
		</>
	),
	'conversor-de-cores': (
		<>
			<path d="M12 3.25a8.75 8.75 0 1 0 0 17.5c1.1 0 1.75-.8 1.75-1.75 0-.5-.2-.9-.5-1.25-.3-.35-.5-.75-.5-1.25 0-1 .8-1.75 1.75-1.75h2a4.25 4.25 0 0 0 4.25-4.25c0-4-3.9-7.25-8.75-7.25Z" />
			<circle cx="7.5" cy="11.5" r="1.1" fill="currentColor" stroke="none" />
			<circle cx="10" cy="7.5" r="1.1" fill="currentColor" stroke="none" />
			<circle cx="14.75" cy="7.5" r="1.1" fill="currentColor" stroke="none" />
		</>
	),
	'gerador-de-numeros-aleatorios': (
		<>
			<rect x="3.5" y="3.5" width="17" height="17" rx="3.5" />
			{[
				[8.5, 8.5],
				[15.5, 8.5],
				[12, 12],
				[8.5, 15.5],
				[15.5, 15.5],
			].map(([cx, cy]) => (
				<circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.15" fill="currentColor" stroke="none" />
			))}
		</>
	),
	'gerador-de-lorem-ipsum': <path d="M3.5 6.5h17M3.5 10.5h17M3.5 14.5h17M3.5 18.5h10" />,
	'gerador-de-qr-code': (
		<>
			<rect x="3.5" y="3.5" width="6" height="6" rx="1" />
			<rect x="14.5" y="3.5" width="6" height="6" rx="1" />
			<rect x="3.5" y="14.5" width="6" height="6" rx="1" />
			<path d="M14.5 14.5h2.5v2.5M20.5 14.5v.01M18 18h2.5v2.5M14.5 20.5h1" />
		</>
	),
	'consulta-de-bancos': (
		<path d="M3 20.5h18M4.5 20.5V19h15v1.5M5.75 19v-8M9.9 19v-8M14.1 19v-8M18.25 19v-8M3.5 9.25 12 4l8.5 5.25Z" />
	),
	'cotacao-de-moedas': (
		<>
			<circle cx="8.5" cy="8.5" r="5.25" />
			<path d="M10.1 6.6c-.35-.5-.95-.8-1.6-.8-.95 0-1.65.55-1.65 1.3 0 1.65 3.3.9 3.3 2.65 0 .75-.75 1.35-1.65 1.35-.7 0-1.35-.35-1.7-.85M8.5 5v.8M8.5 11.1v.9" />
			<path d="M14.75 10.5a5.25 5.25 0 1 1-4.25 4.25M15 13.25h4.5M17.5 11.25l2 2-2 2M19.5 17.75H15M17 15.75l-2 2 2 2" />
		</>
	),
	/* --------------------------- Novas ferramentas --------------------------- */
	'gerador-de-jwt': (
		<>
			<rect x="2.25" y="11" width="4.75" height="5.5" rx="1.25" />
			<rect x="8.5" y="11" width="4.75" height="5.5" rx="1.25" />
			<rect x="14.75" y="11" width="4.75" height="5.5" rx="1.25" />
			<path d="M19 2.75v5.5M16.25 5.5h5.5" />
		</>
	),
	'testador-de-regex': (
		<>
			<path d="M16.5 3.75v8M13.04 5.75l6.92 4M19.96 5.75l-6.92 4" />
			<circle cx="6.5" cy="17.25" r="2.5" />
		</>
	),
	'comparador-de-textos': (
		<>
			<rect x="2.75" y="3.75" width="8" height="16.5" rx="1.5" />
			<rect x="13.25" y="3.75" width="8" height="16.5" rx="1.5" />
			<path d="M4.75 12h4M15.25 12h4M17.25 10v4" />
		</>
	),
	'avaliador-de-jsonpath': (
		<>
			<path d="M7.5 3.75c-1.75 0-2.75.75-2.75 2.5v2.5c0 1.25-.5 2-1.75 2.25 1.25.25 1.75 1 1.75 2.25v2.5c0 1.75 1 2.5 2.75 2.5M10.5 12h.01" />
			<circle cx="16.5" cy="13.5" r="3.75" />
			<path d="m19.25 16.25 2.5 2.5" />
		</>
	),
	'testador-de-xpath': (
		<path d="M7 7.5 2.75 12 7 16.5M17 7.5l4.25 4.5L17 16.5M9.75 17l2-10M12.25 17l2-10" />
	),
	'conversor-de-timestamp': (
		<path d="M20.25 12a8.25 8.25 0 1 1-2.42-5.83M20.25 3.75v3.5h-3.5M12 7.5V12l3 2" />
	),
	'descritor-de-cron': (
		<>
			<rect x="3.75" y="5" width="16.5" height="15.25" rx="2" />
			<path d="M3.75 9.5h16.5M8 3v4M16 3v4M14.75 15.25a2.75 2.75 0 1 1-.8-1.95M14.75 12.25v1.5h-1.5" />
		</>
	),
	'separador-de-url': (
		<>
			<rect x="2.75" y="4.5" width="18.5" height="5.5" rx="2.75" />
			<path d="M6 10v3.5M12 10v3.5M18 10v3.5M4.5 16.5h3M10.5 16.5h3M16.5 16.5h3M4.5 19.5h3M10.5 19.5h3M16.5 19.5h3" />
		</>
	),
	'testador-de-api-rest': (
		<>
			<path d="M3.75 12h10.5M10.75 7.5 15.25 12l-4.5 4.5" />
			<path d="M18.25 5.25c1.5 0 2 .75 2 2v9.5c0 1.25-.5 2-2 2" />
		</>
	),
	'gerador-de-json': (
		<>
			<path d="M9 4.75c-1.75 0-2.75.75-2.75 2.5v2.5c0 1.25-.75 2-2 2.25 1.25.25 2 1 2 2.25v2.5c0 1.75 1 2.5 2.75 2.5" />
			<path d="M14 10.75c1.25 0 2 .75 2 2v1c0 1 .5 1.5 1.5 1.75-1 .25-1.5.75-1.5 1.75v1c0 1.25-.75 2-2 2" />
			<path d="M19 2.75v5.5M16.25 5.5h5.5" />
		</>
	),
	'codificador-de-html': <path d="M8 7 3 12l5 5M16 7l5 5-5 5M13.5 5.5l-3 13" />,
	'escape-de-string': <path d="M5 6v4M8.5 6v4M15.5 6v4M19 6v4M10 11l4 8" />,
	'visualizador-de-svg': (
		<>
			<path d="M4 18C7 8.5 17 8.5 20 18M4 18 9 7M20 18 15 7" />
			<circle cx="9" cy="6.5" r="1.5" />
			<circle cx="15" cy="6.5" r="1.5" />
		</>
	),
	'json-para-yaml': (
		<path d="M4.25 8c-1 0-1.5.5-1.5 1.5v1.5c0 .5-.25.9-.75 1 .5.1.75.5.75 1v1.5c0 1 .5 1.5 1.5 1.5M7.25 8c1 0 1.5.5 1.5 1.5v1.5c0 .5.25.9.75 1-.5.1-.75.5-.75 1v1.5c0 1-.5 1.5-1.5 1.5M14.75 8h4M16.75 12h5M16.75 16h5M14.75 12h.01M14.75 16h.01M10.75 12h2.5M12.25 10.5l1.5 1.5-1.5 1.5" />
	),
	'yaml-para-json': (
		<path d="M2.25 8h4M4.25 12h5M4.25 16h5M2.25 12h.01M2.25 16h.01M16.75 8c-1 0-1.5.5-1.5 1.5v1.5c0 .5-.25.9-.75 1 .5.1.75.5.75 1v1.5c0 1 .5 1.5 1.5 1.5M19.75 8c1 0 1.5.5 1.5 1.5v1.5c0 .5.25.9.75 1-.5.1-.75.5-.75 1v1.5c0 1-.5 1.5-1.5 1.5M10.75 12h2.5M12.25 10.5l1.5 1.5-1.5 1.5" />
	),
	'xml-para-json': (
		<path d="M4 9 1.75 12l2.25 3M7.5 9 9.75 12l-2.25 3M6.5 8.5l-1.5 7M16.75 8c-1 0-1.5.5-1.5 1.5v1.5c0 .5-.25.9-.75 1 .5.1.75.5.75 1v1.5c0 1 .5 1.5 1.5 1.5M19.75 8c1 0 1.5.5 1.5 1.5v1.5c0 .5.25.9.75 1-.5.1-.75.5-.75 1v1.5c0 1-.5 1.5-1.5 1.5M10.75 12h2.5M12.25 10.5l1.5 1.5-1.5 1.5" />
	),
	'json-para-xml': (
		<path d="M4.25 8c-1 0-1.5.5-1.5 1.5v1.5c0 .5-.25.9-.75 1 .5.1.75.5.75 1v1.5c0 1 .5 1.5 1.5 1.5M7.25 8c1 0 1.5.5 1.5 1.5v1.5c0 .5.25.9.75 1-.5.1-.75.5-.75 1v1.5c0 1-.5 1.5-1.5 1.5M16.5 9 14.25 12l2.25 3M20 9 22.25 12l-2.25 3M19 8.5l-1.5 7M10.75 12h2.5M12.25 10.5l1.5 1.5-1.5 1.5" />
	),
	'ini-para-json': (
		<path d="M3.25 7h-1v3.5h1M8.25 7h1v3.5h-1M2.25 14h7M2.25 17h4.5M16.75 8c-1 0-1.5.5-1.5 1.5v1.5c0 .5-.25.9-.75 1 .5.1.75.5.75 1v1.5c0 1 .5 1.5 1.5 1.5M19.75 8c1 0 1.5.5 1.5 1.5v1.5c0 .5.25.9.75 1-.5.1-.75.5-.75 1v1.5c0 1-.5 1.5-1.5 1.5M10.75 12h2.5M12.25 10.5l1.5 1.5-1.5 1.5" />
	),
	'ini-para-yaml': (
		<path d="M3.25 7h-1v3.5h1M8.25 7h1v3.5h-1M2.25 14h7M2.25 17h4.5M14.75 8h4M16.75 12h5M16.75 16h5M14.75 12h.01M14.75 16h.01M10.75 12h2.5M12.25 10.5l1.5 1.5-1.5 1.5" />
	),
	'csv-para-sql': (
		<>
			<rect x="2" y="6.5" width="7.5" height="11" rx="1.5" />
			<path d="M2 10.25h7.5M2 13.75h7.5M5.75 6.5v11M10.75 12h2.5M12.25 10.5l1.5 1.5-1.5 1.5M14.75 8v8c0 .85 1.55 1.5 3.5 1.5s3.5-.65 3.5-1.5V8M14.75 12c0 .85 1.55 1.5 3.5 1.5s3.5-.65 3.5-1.5" />
			<ellipse cx="18.25" cy="8" rx="3.5" ry="1.5" />
		</>
	),
	'imagem-para-data-uri': (
		<>
			<rect x="2" y="6.5" width="7.5" height="11" rx="1.5" />
			<circle cx="4.75" cy="9.5" r="1" />
			<path d="m2 15.25 2.25-2.25 2 2 1.25-1.25 2 2M14.75 8.5h7.25M14.75 12h7.25M14.75 15.5h4.5M10.75 12h2.5M12.25 10.5l1.5 1.5-1.5 1.5" />
		</>
	),
	'data-uri-para-imagem': (
		<>
			<rect x="14.5" y="6.5" width="7.5" height="11" rx="1.5" />
			<circle cx="17.25" cy="9.5" r="1" />
			<path d="m14.5 15.25 2.25-2.25 2 2 1.25-1.25 2 2M2 8.5h7.25M2 12h7.25M2 15.5h4.5M10.75 12h2.5M12.25 10.5l1.5 1.5-1.5 1.5" />
		</>
	),
	'calculadora-de-sub-rede-ipv4': (
		<>
			<rect x="9" y="2.75" width="6" height="5" rx="1" />
			<rect x="2.75" y="16.25" width="5.5" height="5" rx="1" />
			<rect x="9.25" y="16.25" width="5.5" height="5" rx="1" />
			<rect x="15.75" y="16.25" width="5.5" height="5" rx="1" />
			<path d="M12 7.75v8.5M5.5 16.25V12h13v4.25" />
		</>
	),
	'calculadora-de-sub-rede-ipv6': (
		<>
			<rect x="3.25" y="3.25" width="17.5" height="17.5" rx="2" />
			<path d="M12 3.25v17.5M3.25 12h17.5M16.375 12v8.75M12 16.375h8.75" />
		</>
	),
	'calculadora-de-sla': (
		<>
			<path d="M20.25 12.5a8.25 8.25 0 1 1-4.1-7.6" />
			<path d="m8.5 11.75 2.75 2.75 8.5-8.75" />
		</>
	),
	'calculadora-de-tempo-de-download': (
		<>
			<path d="M9 3.25v10M5.25 9.5 9 13.25l3.75-3.75M3.25 19.25h7.5" />
			<circle cx="17" cy="16" r="4.75" />
			<path d="M17 13.75V16l1.5 1" />
		</>
	),
	'conversor-de-unidades-de-dados': (
		<>
			<ellipse cx="10" cy="5.5" rx="6.25" ry="2.25" />
			<path d="M3.75 5.5v12c0 1.25 2.8 2.25 6.25 2.25M16.25 5.5v4.25M3.75 11.5c0 1.25 2.8 2.25 6.25 2.25" />
			<path d="M14 16h7.25M18.75 13.5l2.5 2.5-2.5 2.5" />
		</>
	),
}

export type ToolIconProps = SVGProps<SVGSVGElement> & { slug: string; size?: number }

export function ToolIcon({ slug, size = 20, ...props }: ToolIconProps) {
	return (
		<svg
			viewBox="0 0 24 24"
			width={size}
			height={size}
			fill="none"
			stroke="currentColor"
			strokeWidth={1.5}
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
			{...props}
		>
			{ICONS[slug]}
		</svg>
	)
}

export const TOOL_ICON_SLUGS = Object.keys(ICONS)
