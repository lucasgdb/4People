// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import ConversorDeBinario from '@/tools/conversor-de-binario'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/codificadores-e-formatos/conversor-de-binario')

export default function Page() {
	return <ToolPage id="computacao/codificadores-e-formatos/conversor-de-binario" component={ConversorDeBinario} />
}
