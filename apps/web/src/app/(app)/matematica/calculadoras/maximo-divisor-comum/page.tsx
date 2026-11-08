// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import MaximoDivisorComum from '@/tools/maximo-divisor-comum'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('matematica/calculadoras/maximo-divisor-comum')

export default function Page() {
	return <ToolPage id="matematica/calculadoras/maximo-divisor-comum" component={MaximoDivisorComum} />
}
