// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import MeuIp from '@/tools/meu-ip'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/rede-e-internet/meu-ip')

export default function Page() {
	return <ToolPage id="computacao/rede-e-internet/meu-ip" component={MeuIp} />
}
