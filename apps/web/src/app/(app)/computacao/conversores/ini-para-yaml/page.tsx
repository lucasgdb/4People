// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import IniParaYaml from '@/tools/ini-para-yaml'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/conversores/ini-para-yaml')

export default function Page() {
	return <ToolPage id="computacao/conversores/ini-para-yaml" component={IniParaYaml} />
}
