// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import GeradorDeLoremIpsum from '@/tools/gerador-de-lorem-ipsum'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/utilitarios/gerador-de-lorem-ipsum')

export default function Page() {
	return <ToolPage id="computacao/utilitarios/gerador-de-lorem-ipsum" component={GeradorDeLoremIpsum} />
}
