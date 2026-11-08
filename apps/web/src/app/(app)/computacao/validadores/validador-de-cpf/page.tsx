// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import ValidadorDeCpf from '@/tools/validador-de-cpf'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/validadores/validador-de-cpf')

export default function Page() {
	return <ToolPage id="computacao/validadores/validador-de-cpf" component={ValidadorDeCpf} />
}
