// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import EventosDeTeclado from '@/tools/eventos-de-teclado'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/tabelas-e-padroes/eventos-de-teclado')

export default function Page() {
	return <ToolPage id="computacao/tabelas-e-padroes/eventos-de-teclado" component={EventosDeTeclado} />
}
