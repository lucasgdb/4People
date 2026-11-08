// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import NumerosAmigaveis from '@/tools/numeros-amigaveis'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('matematica/calculadoras/numeros-amigaveis')

export default function Page() {
	return <ToolPage id="matematica/calculadoras/numeros-amigaveis" component={NumerosAmigaveis} />
}
