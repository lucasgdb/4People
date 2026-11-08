// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import Porcentagem from '@/tools/porcentagem'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('matematica/calculadoras/porcentagem')

export default function Page() {
	return <ToolPage id="matematica/calculadoras/porcentagem" component={Porcentagem} />
}
