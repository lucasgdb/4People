// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import RegraDeTres from '@/tools/regra-de-tres'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('matematica/calculadoras/regra-de-tres')

export default function Page() {
	return <ToolPage id="matematica/calculadoras/regra-de-tres" component={RegraDeTres} />
}
