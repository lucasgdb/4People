// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import DescritorDeCron from '@/tools/descritor-de-cron'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/desenvolvimento/descritor-de-cron')

export default function Page() {
	return <ToolPage id="computacao/desenvolvimento/descritor-de-cron" component={DescritorDeCron} />
}
