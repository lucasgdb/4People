// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import XmlParaJson from '@/tools/xml-para-json'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/conversores/xml-para-json')

export default function Page() {
	return <ToolPage id="computacao/conversores/xml-para-json" component={XmlParaJson} />
}
