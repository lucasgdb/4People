// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import MaiusculasEMinusculas from '@/tools/maiusculas-e-minusculas'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/funcoes-de-texto/maiusculas-e-minusculas')

export default function Page() {
	return <ToolPage id="computacao/funcoes-de-texto/maiusculas-e-minusculas" component={MaiusculasEMinusculas} />
}
