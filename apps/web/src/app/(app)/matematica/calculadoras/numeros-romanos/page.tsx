// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import NumerosRomanos from '@/tools/numeros-romanos'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('matematica/calculadoras/numeros-romanos')

export default function Page() {
	return <ToolPage id="matematica/calculadoras/numeros-romanos" component={NumerosRomanos} />
}
