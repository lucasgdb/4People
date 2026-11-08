// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import IniParaJson from '@/tools/ini-para-json'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/conversores/ini-para-json')

export default function Page() {
	return <ToolPage id="computacao/conversores/ini-para-json" component={IniParaJson} />
}
