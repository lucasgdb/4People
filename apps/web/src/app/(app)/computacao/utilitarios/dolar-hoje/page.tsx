// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import DolarHoje from '@/tools/dolar-hoje'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/utilitarios/dolar-hoje')

export default function Page() {
	return <ToolPage id="computacao/utilitarios/dolar-hoje" component={DolarHoje} />
}
