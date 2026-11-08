// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import CalculadoraDeSubRedeIpv4 from '@/tools/calculadora-de-sub-rede-ipv4'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/infraestrutura/calculadora-de-sub-rede-ipv4')

export default function Page() {
	return <ToolPage id="computacao/infraestrutura/calculadora-de-sub-rede-ipv4" component={CalculadoraDeSubRedeIpv4} />
}
