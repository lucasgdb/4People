// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import GeradorDeCpf from '@/tools/gerador-de-cpf'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/geradores/gerador-de-cpf')

export default function Page() {
	return <ToolPage id="computacao/geradores/gerador-de-cpf" component={GeradorDeCpf} />
}
