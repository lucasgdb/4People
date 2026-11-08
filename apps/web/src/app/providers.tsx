'use client'

import { SubmitShortcut, ToastProvider } from '@4people/ui'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode, useState } from 'react'
import { ScrollToTop } from '@/components/scroll-to-top'
import { ServiceWorker } from '@/components/service-worker'

export function Providers({ children }: { children: ReactNode }) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: { staleTime: 5 * 60_000, retry: 1, refetchOnWindowFocus: false },
				},
			}),
	)

	return (
		<QueryClientProvider client={queryClient}>
			<ToastProvider>
				<ScrollToTop />
				<ServiceWorker />
				<SubmitShortcut />
				{children}
			</ToastProvider>
		</QueryClientProvider>
	)
}
