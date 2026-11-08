import type { Metadata, Route } from 'next'
import Link from 'next/link'
import { LegalPage } from '@/components/legal-page'
import { REPOSITORY_URL } from '@/lib/site'

export const metadata: Metadata = {
	title: 'Termos de uso',
	description:
		'As regras para usar o 4People: ferramentas gratuitas, dados gerados só para testes e uso por sua conta e risco.',
	alternates: { canonical: '/termos-de-uso' },
}

const external = { target: '_blank', rel: 'noopener noreferrer' } as const

export default function TermsPage() {
	return (
		<LegalPage
			title="Termos de uso"
			updated="8 de novembro de 2026"
			intro={
				<p>
					Ao usar o 4People, você concorda com estes termos. Eles são curtos: as ferramentas são
					gratuitas, rodam no seu navegador e devem ser usadas de forma legal.
				</p>
			}
		>
			<section>
				<h2>1. O serviço</h2>
				<p>
					O 4People reúne ferramentas online gratuitas de desenvolvimento, estudo e trabalho. Não é
					preciso criar conta. O site está em <strong>versão beta</strong>: as ferramentas ainda
					estão sendo testadas e podem mudar, ser corrigidas ou deixar de existir sem aviso.
				</p>
			</section>
			<section>
				<h2>2. Dados gerados são só para testes</h2>
				<p>
					CPF, CNPJ, RG, CNH, PIS, RENAVAM, título de eleitor, cartões de crédito, placas, pessoas e
					outros dados gerados aqui são fictícios. Eles só seguem as regras de formato e dos dígitos
					verificadores, para testar sistemas e formulários.
				</p>
				<ul>
					<li>Não pertencem a pessoas, empresas, veículos ou contas reais.</li>
					<li>
						É proibido usá-los para fraude, para se passar por outra pessoa, para enganar cadastros
						ou em qualquer atividade ilegal.
					</li>
					<li>Quem usa os dados é o único responsável pelo uso que faz deles.</li>
				</ul>
			</section>
			<section>
				<h2>3. Resultados sem garantia</h2>
				<p>
					As ferramentas são oferecidas &quot;no estado em que se encontram&quot;. Fazemos o
					possível para que os resultados estejam certos, mas não garantimos que sejam exatos,
					completos ou adequados a um fim específico. Confira resultados importantes, como cálculos
					financeiros, de datas ou de rede, antes de tomar decisões com base neles.
				</p>
				<p>
					Cotações, CEPs e listas de bancos vêm de serviços públicos de terceiros e podem estar
					desatualizados ou indisponíveis.
				</p>
			</section>
			<section>
				<h2>4. Responsabilidade</h2>
				<p>
					Na medida permitida pela lei, o 4People e seu mantenedor não respondem por perdas ou danos
					decorrentes do uso ou da impossibilidade de uso do site, nem por decisões tomadas a partir
					dos resultados das ferramentas.
				</p>
			</section>
			<section>
				<h2>5. Uso aceitável</h2>
				<p>
					Não tente sobrecarregar, invadir ou atrapalhar o funcionamento do site, nem usá-lo para
					atacar outros serviços. O Testador de API REST envia requisições a partir do seu
					navegador: use-o só em APIs que você tem permissão para testar.
				</p>
			</section>
			<section>
				<h2>6. Código aberto e privacidade</h2>
				<p>
					O código do 4People é aberto, sob a licença GPL-3.0, e está no{' '}
					<a href={REPOSITORY_URL} {...external}>
						GitHub
					</a>
					. O tratamento de dados está descrito na{' '}
					<Link href={'/privacidade' as Route}>política de privacidade</Link>.
				</p>
			</section>
			<section>
				<h2>7. Mudanças e contato</h2>
				<p>
					Estes termos podem mudar, principalmente durante a versão beta. A data no topo indica a
					última atualização. Estes termos seguem as leis do Brasil. Dúvidas podem ser enviadas
					pelas{' '}
					<a href={`${REPOSITORY_URL}/issues`} {...external}>
						issues do projeto no GitHub
					</a>
					.
				</p>
			</section>
		</LegalPage>
	)
}
