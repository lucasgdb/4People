// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import ConversorDeUnidadesDeDados from '@/tools/conversor-de-unidades-de-dados'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/infraestrutura/conversor-de-unidades-de-dados')

export default function Page() {
	return <ToolPage id="computacao/infraestrutura/conversor-de-unidades-de-dados" component={ConversorDeUnidadesDeDados} />
}
