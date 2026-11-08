// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import ConversorDeCores from '@/tools/conversor-de-cores'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/tabelas-e-padroes/conversor-de-cores')

export default function Page() {
	return <ToolPage id="computacao/tabelas-e-padroes/conversor-de-cores" component={ConversorDeCores} />
}
