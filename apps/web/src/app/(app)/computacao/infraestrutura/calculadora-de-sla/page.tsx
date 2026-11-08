// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import CalculadoraDeSla from '@/tools/calculadora-de-sla'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/infraestrutura/calculadora-de-sla')

export default function Page() {
	return <ToolPage id="computacao/infraestrutura/calculadora-de-sla" component={CalculadoraDeSla} />
}
