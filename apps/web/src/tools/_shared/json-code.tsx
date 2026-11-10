import { type JsonToken, jsonTokens } from '@/lib/algorithms/web'
import { OutputBlock } from './tool-layout'

/** One colour per kind of token: keys stand apart from values, and values by type. */
const TOKEN_CLASS: Record<JsonToken['kind'], string | undefined> = {
	key: 'text-accent-soft-fg font-medium',
	string: 'text-success',
	number: 'text-code-symbol',
	literal: 'text-danger',
	punctuation: 'text-fg-subtle',
	space: undefined,
}

/**
 * Pretty-printed JSON with coloured keys and values. A long line that wraps continues two columns
 * past its own indentation, under its key's text, instead of jumping to the left edge.
 */
export function JsonCode({ json, className }: { json: string; className?: string }) {
	return (
		<OutputBlock className={className}>
			<code translate="no">
				{json.split('\n').map((line, index) => {
					// Wrapped text hangs 2ch past the line's indentation.
					const hang = line.length - line.trimStart().length + 2
					return (
						<span
							// biome-ignore lint/suspicious/noArrayIndexKey: lines have no identity besides their position
							key={index}
							className="block"
							style={{ paddingLeft: `${hang}ch`, textIndent: `-${hang}ch` }}
						>
							{jsonTokens(line).map((token, position) => (
								<span
									// biome-ignore lint/suspicious/noArrayIndexKey: tokens have no identity besides their position
									key={position}
									className={TOKEN_CLASS[token.kind]}
								>
									{token.text}
								</span>
							))}
						</span>
					)
				})}
			</code>
		</OutputBlock>
	)
}
