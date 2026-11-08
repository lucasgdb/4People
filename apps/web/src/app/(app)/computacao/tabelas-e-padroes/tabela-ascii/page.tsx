// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import TabelaAscii from '@/tools/tabela-ascii'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/tabelas-e-padroes/tabela-ascii')

export default function Page() {
	return <ToolPage id="computacao/tabelas-e-padroes/tabela-ascii" component={TabelaAscii} />
}
