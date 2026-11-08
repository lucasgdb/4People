// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import ValidadorDeCnpj from '@/tools/validador-de-cnpj'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/validadores/validador-de-cnpj')

export default function Page() {
	return <ToolPage id="computacao/validadores/validador-de-cnpj" component={ValidadorDeCnpj} />
}
