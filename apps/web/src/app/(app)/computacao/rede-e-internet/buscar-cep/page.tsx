// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import BuscarCep from '@/tools/buscar-cep'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/rede-e-internet/buscar-cep')

export default function Page() {
	return <ToolPage id="computacao/rede-e-internet/buscar-cep" component={BuscarCep} />
}
