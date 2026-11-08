// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import FormatadorDeJson from '@/tools/formatador-de-json'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/codificadores-e-formatos/formatador-de-json')

export default function Page() {
	return <ToolPage id="computacao/codificadores-e-formatos/formatador-de-json" component={FormatadorDeJson} />
}
