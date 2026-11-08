// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import CalculadoraDeImc from '@/tools/calculadora-de-imc'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('matematica/calculadoras/calculadora-de-imc')

export default function Page() {
	return <ToolPage id="matematica/calculadoras/calculadora-de-imc" component={CalculadoraDeImc} />
}
