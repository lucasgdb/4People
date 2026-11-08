// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import DivisaoEResto from '@/tools/divisao-e-resto'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('matematica/calculadoras/divisao-e-resto')

export default function Page() {
	return <ToolPage id="matematica/calculadoras/divisao-e-resto" component={DivisaoEResto} />
}
