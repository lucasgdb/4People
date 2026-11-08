// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import CodificadorDeUrl from '@/tools/codificador-de-url'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/codificadores-e-formatos/codificador-de-url')

export default function Page() {
	return <ToolPage id="computacao/codificadores-e-formatos/codificador-de-url" component={CodificadorDeUrl} />
}
