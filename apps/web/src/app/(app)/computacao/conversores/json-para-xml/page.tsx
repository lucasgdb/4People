// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import JsonParaXml from '@/tools/json-para-xml'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/conversores/json-para-xml')

export default function Page() {
	return <ToolPage id="computacao/conversores/json-para-xml" component={JsonParaXml} />
}
