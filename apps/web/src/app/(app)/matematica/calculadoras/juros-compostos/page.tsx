// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import JurosCompostos from '@/tools/juros-compostos'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('matematica/calculadoras/juros-compostos')

export default function Page() {
	return <ToolPage id="matematica/calculadoras/juros-compostos" component={JurosCompostos} />
}
