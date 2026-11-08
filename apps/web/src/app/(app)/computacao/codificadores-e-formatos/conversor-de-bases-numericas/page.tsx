// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import ConversorDeBasesNumericas from '@/tools/conversor-de-bases-numericas'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/codificadores-e-formatos/conversor-de-bases-numericas')

export default function Page() {
	return <ToolPage id="computacao/codificadores-e-formatos/conversor-de-bases-numericas" component={ConversorDeBasesNumericas} />
}
