import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal-page'
import { REPOSITORY_URL } from '@/lib/site'

export const metadata: Metadata = {
	title: 'Política de privacidade',
	description:
		'Como o 4People trata seus dados: sem cadastro, sem cookies de rastreamento, e as ferramentas rodam no seu navegador.',
	alternates: { canonical: '/privacidade' },
}

const external = { target: '_blank', rel: 'noopener noreferrer' } as const

/**
 * Privacy policy. Every statement must match the code: no accounts, no cookies, no analytics; tool
 * input stays in the browser except in the tools that call a public API (listed by name).
 */
export default function PrivacyPage() {
	return (
		<LegalPage
			title="Política de privacidade"
			updated="8 de novembro de 2026"
			intro={
				<p>
					Resumo: o 4People não tem cadastro, não usa cookies de rastreamento nem ferramentas de
					análise, e o que você digita nas ferramentas é processado no seu próprio navegador.
				</p>
			}
		>
			<section>
				<h2>1. Quem somos</h2>
				<p>
					O 4People é um projeto de código aberto mantido por Lucas Bittencourt. O código está
					publicado no{' '}
					<a href={REPOSITORY_URL} {...external}>
						GitHub
					</a>
					, então qualquer pessoa pode conferir o que esta política descreve.
				</p>
			</section>
			<section>
				<h2>2. O que você digita nas ferramentas</h2>
				<p>
					Os cálculos, conversões, gerações e validações acontecem no seu navegador. Textos,
					números, arquivos e documentos que você informa não são enviados ao 4People nem guardados
					por nós.
				</p>
				<p>Algumas ferramentas precisam consultar um serviço público, direto do seu navegador:</p>
				<ul>
					<li>
						<strong>Meu IP</strong> pergunta seu endereço IP ao serviço ipify (api.ipify.org).
					</li>
					<li>
						<strong>Buscar CEP</strong> e <strong>Consulta de Bancos</strong> consultam a BrasilAPI
						(brasilapi.com.br); o Buscar CEP envia o CEP que você digitou.
					</li>
					<li>
						<strong>Cotação de Moedas</strong> consulta as cotações na AwesomeAPI
						(economia.awesomeapi.com.br).
					</li>
					<li>
						<strong>Testador de API REST</strong> envia a requisição que você montar para o endereço
						que você informar.
					</li>
				</ul>
				<p>
					Nesses casos, o serviço consultado recebe a requisição e o seu endereço IP, como em
					qualquer acesso pela internet, e segue a própria política de privacidade.
				</p>
			</section>
			<section>
				<h2>3. Cookies, rastreamento e armazenamento</h2>
				<p>
					Não usamos cookies, pixels de anúncios nem ferramentas de análise de audiência. As fontes
					do site são servidas pelo próprio 4People, sem chamadas a serviços de terceiros.
				</p>
				<p>
					Para funcionar sem internet, o site guarda cópias das próprias páginas e arquivos no cache
					do seu navegador. Esse cache fica só no seu aparelho e pode ser apagado nas configurações
					do navegador, limpando os dados do site.
				</p>
			</section>
			<section>
				<h2>4. Registros de acesso</h2>
				<p>
					Como qualquer site, o servidor que hospeda o 4People pode registrar dados técnicos de cada
					acesso, como endereço IP, data, página pedida e navegador, para segurança e para manter o
					serviço funcionando. Esses registros não são usados para identificar você nem vendidos ou
					compartilhados para publicidade.
				</p>
			</section>
			<section>
				<h2>5. Seus direitos</h2>
				<p>
					Pela Lei Geral de Proteção de Dados (LGPD, Lei nº 13.709/2018), você pode pedir
					informações sobre o tratamento de dados pessoais e a correção ou exclusão deles. Como o
					4People não mantém cadastro nem guarda o que você digita, normalmente não há dados seus
					para corrigir ou apagar.
				</p>
			</section>
			<section>
				<h2>6. Mudanças e contato</h2>
				<p>
					O 4People está em versão beta e esta política pode mudar. A data no topo indica a última
					atualização. Dúvidas ou pedidos podem ser enviados pelas{' '}
					<a href={`${REPOSITORY_URL}/issues`} {...external}>
						issues do projeto no GitHub
					</a>
					.
				</p>
			</section>
		</LegalPage>
	)
}
