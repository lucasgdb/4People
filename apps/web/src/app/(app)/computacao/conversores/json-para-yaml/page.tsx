// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import JsonParaYaml from '@/tools/json-para-yaml'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/conversores/json-para-yaml')

export default function Page() {
	return <ToolPage id="computacao/conversores/json-para-yaml" component={JsonParaYaml} />
}
