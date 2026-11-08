// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import CalculadoraDeTempoDeDownload from '@/tools/calculadora-de-tempo-de-download'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/infraestrutura/calculadora-de-tempo-de-download')

export default function Page() {
	return <ToolPage id="computacao/infraestrutura/calculadora-de-tempo-de-download" component={CalculadoraDeTempoDeDownload} />
}
