import path from 'node:path'
import type { NextConfig } from 'next'
import { legacyRedirects } from './src/catalog/legacy-routes.ts'

const nextConfig: NextConfig = {
	output: 'standalone',
	// Monorepo root, so the standalone bundle includes workspace packages (@4people/ui).
	outputFileTracingRoot: path.join(import.meta.dirname, '../..'),
	reactStrictMode: true,
	typedRoutes: true,
	transpilePackages: ['@4people/ui'],
	poweredByHeader: false,
	// Old English URLs → Portuguese routes.
	redirects: async () => legacyRedirects(),
	headers: async () => [
		{
			// The service worker must always be revalidated, or users keep an old one for a day.
			source: '/sw.js',
			headers: [
				{ key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
				{ key: 'Content-Type', value: 'application/javascript; charset=utf-8' },
			],
		},
	],
	typescript: {
		// Type-checking runs through the TypeScript 7 native compiler (`pnpm typecheck`),
		// which no longer exposes the JS API that `next build` relies on.
		ignoreBuildErrors: true,
	},
	experimental: {
		optimizePackageImports: ['lucide-react', '@4people/ui'],
	},
}

export default nextConfig
