'use client'

import { Alert, Badge, Button } from '@4people/ui'
import { useQuery } from '@tanstack/react-query'
import { CircleX, RefreshCw } from 'lucide-react'
import { z } from 'zod'
import { ResultCard, ToolLayout } from './_shared/tool-layout'

const IPIFY_URL = 'https://api.ipify.org?format=json'

const ipifyResponseSchema = z.object({ ip: z.union([z.ipv4(), z.ipv6()]) })

async function fetchPublicIp(): Promise<string> {
	const response = await fetch(IPIFY_URL, { headers: { Accept: 'application/json' } })
	if (!response.ok) throw new Error(`Falha na requisição (${response.status}).`)
	return ipifyResponseSchema.parse(await response.json()).ip
}

/** Public IP of this connection, asked to ipify from the browser. */
export default function MyIp() {
	const ipQuery = useQuery({ queryKey: ['my-ip', 'v4'], queryFn: fetchPublicIp })

	const ip = ipQuery.data
	const version = ip?.includes(':') ? 'IPv6' : 'IPv4'

	return (
		<ToolLayout className="max-w-3xl xl:grid-cols-1">
			<ResultCard
				title="Seu IP público"
				step={null}
				copyText={ip ?? ''}
				action={
					<Button
						variant="secondary"
						size="sm"
						onClick={() => ipQuery.refetch()}
						disabled={ipQuery.isFetching}
					>
						<RefreshCw className={ipQuery.isFetching ? 'animate-spin' : undefined} />
						{ipQuery.isFetching ? 'Atualizando…' : 'Atualizar'}
					</Button>
				}
			>
				{ipQuery.isPending ? (
					<div aria-busy="true" className="flex flex-col gap-3">
						<span className="sr-only">Consultando seu IP…</span>
						<span className="rounded-control bg-surface-sunken block h-[6.5rem] w-full" />
						<span className="bg-surface-sunken block h-4 w-2/3 rounded-full" />
					</div>
				) : ipQuery.isError ? (
					<Alert tone="danger">
						<CircleX />
						Não foi possível consultar seu IP. Verifique a conexão ou desative o bloqueador de
						anúncios e tente “Atualizar”.
					</Alert>
				) : (
					<div className="flex flex-col gap-3">
						<div className="rounded-control bg-surface-muted flex flex-col gap-2 px-6 py-5">
							<span className="flex items-center gap-2">
								<Badge tone="primary">{version}</Badge>
								<span className="text-fg-muted text-sm">Endereço que os sites veem</span>
							</span>
							<output
								translate="no"
								className="text-fg tabular text-[clamp(1.75rem,6vw,2.75rem)] leading-none font-extrabold tracking-[-0.02em] break-all select-all"
							>
								{ip}
							</output>
						</div>
						<p className="text-fg-muted text-sm leading-relaxed">
							É o IP da sua rede (roteador ou operadora), não o do aparelho. Ele muda com VPN, dados
							móveis ou outra rede Wi-Fi: use “Atualizar” depois de trocar.
						</p>
					</div>
				)}
			</ResultCard>
		</ToolLayout>
	)
}
