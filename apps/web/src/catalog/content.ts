/**
 * Editorial content: per tool, a direct answer, questions, SEO title and description and an optional
 * step-by-step; per topic, an introduction. One file per topic in ./content. Rendered on the pages,
 * in JSON-LD and in /llms-full.txt, so every claim must match what src/lib/algorithms does.
 */

import { TOOLS } from './catalog.ts'
import { content as computacaoCodificadoresEFormatos } from './content/computacao--codificadores-e-formatos.ts'
import { content as computacaoConversores } from './content/computacao--conversores.ts'
import { content as computacaoDesenvolvimento } from './content/computacao--desenvolvimento.ts'
import { content as computacaoFuncoesDeTexto } from './content/computacao--funcoes-de-texto.ts'
import { content as computacaoGeradores } from './content/computacao--geradores.ts'
import { content as computacaoInfraestrutura } from './content/computacao--infraestrutura.ts'
import { content as computacaoRedeEInternet } from './content/computacao--rede-e-internet.ts'
import { content as computacaoTabelasEPadroes } from './content/computacao--tabelas-e-padroes.ts'
import { content as computacaoUtilitarios } from './content/computacao--utilitarios.ts'
import { content as computacaoValidadores } from './content/computacao--validadores.ts'
import { content as matematicaCalculadoras } from './content/matematica--calculadoras.ts'
import { content as matematicaCalculoDeAreas } from './content/matematica--calculo-de-areas.ts'
import { content as matematicaCalculoDeDatas } from './content/matematica--calculo-de-datas.ts'
import type { Faq, SectionContent, ToolContent } from './content/types.ts'

export type { Faq, HowTo, SectionContent, ToolContent } from './content/types.ts'

/** Topic contents keyed by "<area>/<topic>". */
const SECTIONS: Record<string, SectionContent> = {
	'computacao/geradores': computacaoGeradores,
	'computacao/validadores': computacaoValidadores,
	'computacao/funcoes-de-texto': computacaoFuncoesDeTexto,
	'computacao/codificadores-e-formatos': computacaoCodificadoresEFormatos,
	'computacao/conversores': computacaoConversores,
	'computacao/desenvolvimento': computacaoDesenvolvimento,
	'computacao/rede-e-internet': computacaoRedeEInternet,
	'computacao/infraestrutura': computacaoInfraestrutura,
	'computacao/tabelas-e-padroes': computacaoTabelasEPadroes,
	'computacao/utilitarios': computacaoUtilitarios,
	'matematica/calculo-de-areas': matematicaCalculoDeAreas,
	'matematica/calculo-de-datas': matematicaCalculoDeDatas,
	'matematica/calculadoras': matematicaCalculadoras,
}

export const TOOL_CONTENT: Record<string, ToolContent> = Object.assign(
	{},
	...Object.values(SECTIONS).map((section) => section.tools),
)

export function sectionIntro(areaSlug: string, topicSlug: string): string[] {
	return SECTIONS[`${areaSlug}/${topicSlug}`]?.intro ?? []
}

/** Site-wide questions shown on the home page (and in its FAQPage JSON-LD). */
export const SITE_FAQ: Faq[] = [
	{
		question: 'Os documentos gerados são reais?',
		answer:
			'Não. CPFs, CNPJs e RGs gerados passam apenas na validação matemática dos dígitos verificadores. Não pertencem a ninguém e servem só para testar software.',
	},
	{
		question: 'O que eu digito sai do meu navegador?',
		answer:
			'Não. Todos os cálculos rodam no seu navegador. Só quatro ferramentas consultam serviços públicos: Buscar CEP e Consulta de Bancos (BrasilAPI), Meu IP (ipify) e Cotação de Moedas (AwesomeAPI). O Testador de API REST envia apenas a requisição que você montar.',
	},
	{
		question: 'Preciso criar conta ou pagar?',
		answer: `Não. Todas as ${TOOLS.length} ferramentas são gratuitas e funcionam sem cadastro.`,
	},
	{
		question: 'Funciona no celular?',
		answer:
			'Sim. Todas as ferramentas foram feitas para funcionar no celular, com campos e botões do tamanho do polegar.',
	},
	{
		question: 'Posso ver como cada cálculo é feito?',
		answer:
			'Sim. Cada ferramenta explica a fórmula na própria página, e o código-fonte completo está aberto no GitHub sob a licença GPL-3.0.',
	},
	{
		question: 'Quem faz o 4People?',
		answer:
			'Lucas Bittencourt, que criou o projeto em 2019 com colegas da Etec de Guaratinguetá. Hoje ele é mantido como código aberto.',
	},
]
