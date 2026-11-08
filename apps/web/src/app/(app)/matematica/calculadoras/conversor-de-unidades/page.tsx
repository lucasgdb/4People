// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import ConversorDeUnidades from '@/tools/conversor-de-unidades'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('matematica/calculadoras/conversor-de-unidades')

export default function Page() {
	return <ToolPage id="matematica/calculadoras/conversor-de-unidades" component={ConversorDeUnidades} />
}
