// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import ConsultaDeBancos from '@/tools/consulta-de-bancos'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/utilitarios/consulta-de-bancos')

export default function Page() {
	return <ToolPage id="computacao/utilitarios/consulta-de-bancos" component={ConsultaDeBancos} />
}
