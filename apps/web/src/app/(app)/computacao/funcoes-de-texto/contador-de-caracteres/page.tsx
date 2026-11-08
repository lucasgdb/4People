// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import ContadorDeCaracteres from '@/tools/contador-de-caracteres'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/funcoes-de-texto/contador-de-caracteres')

export default function Page() {
	return <ToolPage id="computacao/funcoes-de-texto/contador-de-caracteres" component={ContadorDeCaracteres} />
}
