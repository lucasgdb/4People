// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import ConversorDeTimestamp from '@/tools/conversor-de-timestamp'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/desenvolvimento/conversor-de-timestamp')

export default function Page() {
	return <ToolPage id="computacao/desenvolvimento/conversor-de-timestamp" component={ConversorDeTimestamp} />
}
