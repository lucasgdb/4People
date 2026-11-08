// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import MinimoMultiploComum from '@/tools/minimo-multiplo-comum'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('matematica/calculadoras/minimo-multiplo-comum')

export default function Page() {
	return <ToolPage id="matematica/calculadoras/minimo-multiplo-comum" component={MinimoMultiploComum} />
}
