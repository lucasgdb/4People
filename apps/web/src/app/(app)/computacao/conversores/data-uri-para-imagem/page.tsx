// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import DataUriParaImagem from '@/tools/data-uri-para-imagem'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/conversores/data-uri-para-imagem')

export default function Page() {
	return <ToolPage id="computacao/conversores/data-uri-para-imagem" component={DataUriParaImagem} />
}
