import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import type { ReactNode } from 'react'

export const OG_SIZE = { width: 1200, height: 630 }

// OG images are prerendered at build time (generateStaticParams), where cwd is apps/web.
const font = (file: string) => readFile(join(process.cwd(), 'node_modules', file))

/** Shared Open Graph card: a white card on the blue-grey ground, the mark, title and one line. */
export async function renderOg({
	title,
	subtitle,
	icon,
}: {
	title: string
	subtitle: string
	icon?: ReactNode
}) {
	const [display, text, textBold] = await Promise.all([
		font('@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-800-normal.woff'),
		font('@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-500-normal.woff'),
		font('@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-700-normal.woff'),
	])

	return new ImageResponse(
		<div
			style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				background: '#f3f5fa',
				color: '#172033',
				padding: '64px 72px',
				fontFamily: 'Jakarta',
				borderBottom: '16px solid #2747c4',
			}}
		>
			<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
				<div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
					<svg width="56" height="56" viewBox="0 0 64 64" aria-hidden="true">
						<rect width="64" height="64" rx="18" fill="#2747c4" />
						<path
							d="M38.5 14 17.5 38.5h29M38.5 14v36"
							fill="none"
							stroke="#fff"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="7.5"
						/>
					</svg>
					<span style={{ fontSize: 40, fontWeight: 800 }}>4People</span>
				</div>
				{icon ? (
					<div
						style={{
							display: 'flex',
							color: '#2747c4',
							background: '#e8edfc',
							borderRadius: 32,
							padding: 24,
						}}
					>
						{icon}
					</div>
				) : null}
			</div>
			<div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
				<div
					style={{
						fontWeight: 800,
						fontSize: title.length > 22 ? 84 : 104,
						lineHeight: 1,
						letterSpacing: '-0.03em',
					}}
				>
					{title}
				</div>
				<div style={{ fontSize: 34, lineHeight: 1.3, color: '#4a5570', maxWidth: 960 }}>
					{subtitle}
				</div>
			</div>
		</div>,
		{
			...OG_SIZE,
			fonts: [
				{ name: 'Jakarta', data: display, weight: 800, style: 'normal' },
				{ name: 'Jakarta', data: text, weight: 500, style: 'normal' },
				{ name: 'Jakarta', data: textBold, weight: 700, style: 'normal' },
			],
		},
	)
}
