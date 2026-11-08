// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import GeradorDeJson from '@/tools/gerador-de-json'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/desenvolvimento/gerador-de-json')

export default function Page() {
	return <ToolPage id="computacao/desenvolvimento/gerador-de-json" component={GeradorDeJson} />
}
