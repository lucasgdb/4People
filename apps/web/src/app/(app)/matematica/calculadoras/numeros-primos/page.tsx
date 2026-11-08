// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import NumerosPrimos from '@/tools/numeros-primos'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('matematica/calculadoras/numeros-primos')

export default function Page() {
	return <ToolPage id="matematica/calculadoras/numeros-primos" component={NumerosPrimos} />
}
