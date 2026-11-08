// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import GeradorDeNumerosAleatorios from '@/tools/gerador-de-numeros-aleatorios'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/utilitarios/gerador-de-numeros-aleatorios')

export default function Page() {
	return <ToolPage id="computacao/utilitarios/gerador-de-numeros-aleatorios" component={GeradorDeNumerosAleatorios} />
}
