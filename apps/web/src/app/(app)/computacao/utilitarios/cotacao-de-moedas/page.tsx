// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import CotacaoDeMoedas from '@/tools/cotacao-de-moedas'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/utilitarios/cotacao-de-moedas')

export default function Page() {
	return <ToolPage id="computacao/utilitarios/cotacao-de-moedas" component={CotacaoDeMoedas} />
}
