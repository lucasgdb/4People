// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import EquacaoDoSegundoGrau from '@/tools/equacao-do-segundo-grau'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('matematica/calculadoras/equacao-do-segundo-grau')

export default function Page() {
	return <ToolPage id="matematica/calculadoras/equacao-do-segundo-grau" component={EquacaoDoSegundoGrau} />
}
