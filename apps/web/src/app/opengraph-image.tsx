import { TOOLS } from '@/catalog/catalog'
import { OG_SIZE, renderOg } from '@/lib/og'

export const alt = '4People: ferramentas online gratuitas para pessoas'
export const size = OG_SIZE
export const contentType = 'image/png'

export default function Image() {
	return renderOg({
		title: 'Ferramentas para pessoas',
		subtitle: `${TOOLS.length} ferramentas gratuitas: CPF, CNPJ, CEP, Bhaskara, MMC e mais. Tudo no navegador.`,
	})
}
