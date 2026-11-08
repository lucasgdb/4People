// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import Fibonacci from '@/tools/fibonacci'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('matematica/calculadoras/fibonacci')

export default function Page() {
	return <ToolPage id="matematica/calculadoras/fibonacci" component={Fibonacci} />
}
