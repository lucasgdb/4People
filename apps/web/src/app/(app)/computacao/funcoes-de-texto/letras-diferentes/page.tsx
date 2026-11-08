// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import LetrasDiferentes from '@/tools/letras-diferentes'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/funcoes-de-texto/letras-diferentes')

export default function Page() {
	return <ToolPage id="computacao/funcoes-de-texto/letras-diferentes" component={LetrasDiferentes} />
}
