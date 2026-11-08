// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import FatorarNumero from '@/tools/fatorar-numero'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('matematica/calculadoras/fatorar-numero')

export default function Page() {
	return <ToolPage id="matematica/calculadoras/fatorar-numero" component={FatorarNumero} />
}
