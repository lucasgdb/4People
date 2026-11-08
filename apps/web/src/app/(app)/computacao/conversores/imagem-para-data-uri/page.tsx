// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import ImagemParaDataUri from '@/tools/imagem-para-data-uri'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/conversores/imagem-para-data-uri')

export default function Page() {
	return <ToolPage id="computacao/conversores/imagem-para-data-uri" component={ImagemParaDataUri} />
}
