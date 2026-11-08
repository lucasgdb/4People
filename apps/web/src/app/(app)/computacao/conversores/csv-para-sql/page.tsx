// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import CsvParaSql from '@/tools/csv-para-sql'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/conversores/csv-para-sql')

export default function Page() {
	return <ToolPage id="computacao/conversores/csv-para-sql" component={CsvParaSql} />
}
