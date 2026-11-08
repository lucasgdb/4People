// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import YamlParaJson from '@/tools/yaml-para-json'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/conversores/yaml-para-json')

export default function Page() {
	return <ToolPage id="computacao/conversores/yaml-para-json" component={YamlParaJson} />
}
