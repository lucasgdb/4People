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
	// Next's own trailing-slash redirect runs before `redirects`, which would add a hop to every old
	// link. It's off, so old URLs (with or without the slash) go straight to their page, and the
	// last rule strips the slash from everything else.
	skipTrailingSlashRedirect: true,
	redirects: async () => [
		...legacyRedirects(),
		{ source: '/:path+/', destination: '/:path+', permanent: true },
	],
	headers: async () => [
		{
			// Baseline security headers for every page. No script-src CSP: Next inlines its bootstrap
			// scripts, so only the directives that don't need nonces are set.
			source: '/:path*',
			headers: [
				{ key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
				{ key: 'X-Content-Type-Options', value: 'nosniff' },
				{ key: 'X-Frame-Options', value: 'DENY' },
				{ key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
				{
					key: 'Permissions-Policy',
					value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
				},
				{
					key: 'Content-Security-Policy',
					value: "frame-ancestors 'none'; base-uri 'self'; object-src 'none'; form-action 'self'",
				},
			],
		},
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
