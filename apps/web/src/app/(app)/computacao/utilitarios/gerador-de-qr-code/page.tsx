// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import GeradorDeQrCode from '@/tools/gerador-de-qr-code'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/utilitarios/gerador-de-qr-code')

export default function Page() {
	return <ToolPage id="computacao/utilitarios/gerador-de-qr-code" component={GeradorDeQrCode} />
}
