// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import ConversorDeTemperatura from '@/tools/conversor-de-temperatura'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('matematica/calculadoras/conversor-de-temperatura')

export default function Page() {
	return <ToolPage id="matematica/calculadoras/conversor-de-temperatura" component={ConversorDeTemperatura} />
}
