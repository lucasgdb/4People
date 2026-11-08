// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import NumeroPorExtenso from '@/tools/numero-por-extenso'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/funcoes-de-texto/numero-por-extenso')

export default function Page() {
	return <ToolPage id="computacao/funcoes-de-texto/numero-por-extenso" component={NumeroPorExtenso} />
}
