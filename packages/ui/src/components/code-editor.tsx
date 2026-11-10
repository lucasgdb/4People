'use client'

import { Field } from '@base-ui/react/field'
import {
	type ComponentProps,
	type KeyboardEvent,
	type ReactNode,
	type Ref,
	useMemo,
	useRef,
} from 'react'
import { cn } from '../lib/cn.ts'

const INDENT = '  '
const OPENERS: Record<string, string> = { '{': '}', '[': ']', '"': '"' }
const CLOSERS = new Set(['}', ']', '"'])

export type CodeEditorProps = Omit<ComponentProps<'textarea'>, 'value' | 'onChange' | 'ref'> & {
	value: string
	onValueChange: (value: string) => void
	/** Colours one line of code. Without it, the code shows as plain text. */
	highlight?: (line: string) => ReactNode
	/** Starting height in lines; the editor grows with its content up to 24rem, then scrolls. */
	rows?: number
	/** A bar above the code, inside the border (language, Format button, status). */
	toolbar?: ReactNode
	/** 1-based line to flag (a syntax error): its number turns red and the line gets a tint. */
	markedLine?: number
	ref?: Ref<HTMLTextAreaElement>
}

/** Replaces [start, end) through the browser's editing commands, so Ctrl+Z still undoes it. */
function replaceRange(
	textarea: HTMLTextAreaElement,
	start: number,
	end: number,
	text: string,
	selection?: [number, number],
) {
	textarea.focus()
	textarea.setSelectionRange(start, end)
	const done = text
		? document.execCommand('insertText', false, text)
		: document.execCommand('delete', false)
	if (!done) {
		// No execCommand (some test runners): edit directly and tell React about it.
		textarea.setRangeText(text, start, end, 'end')
		textarea.dispatchEvent(new Event('input', { bubbles: true }))
	}
	if (selection) textarea.setSelectionRange(...selection)
}

const lineStart = (text: string, index: number) => text.lastIndexOf('\n', index - 1) + 1
const lineEnd = (text: string, index: number) => {
	const end = text.indexOf('\n', index)
	return end < 0 ? text.length : end
}

/**
 * A small code editor: a transparent textarea over a coloured copy of its text, with line numbers.
 * Tab and Shift+Tab indent and outdent (Esc, then Tab, leaves the field), Enter keeps the line's
 * indentation and opens a block after `{` or `[`, brackets and quotes close themselves, and
 * Backspace removes an empty pair or one indentation step. Every edit goes through the browser's
 * undo history.
 */
export function CodeEditor({
	value,
	onValueChange,
	highlight,
	rows = 6,
	toolbar,
	markedLine,
	className,
	ref,
	onKeyDown,
	...props
}: CodeEditorProps) {
	const textareaRef = useRef<HTMLTextAreaElement | null>(null)
	// After Esc, Tab moves focus on (keyboard users must be able to leave the field).
	const tabReleased = useRef(false)
	const lines = useMemo(() => value.split('\n'), [value])
	const digits = String(lines.length).length

	function setRefs(element: HTMLTextAreaElement | null) {
		textareaRef.current = element
		if (typeof ref === 'function') ref(element)
		else if (ref) ref.current = element
	}

	function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
		onKeyDown?.(event)
		if (event.defaultPrevented || event.nativeEvent.isComposing) return
		const textarea = event.currentTarget
		const { selectionStart: start, selectionEnd: end, value: text } = textarea
		const before = text[start - 1] ?? ''
		const after = text[end] ?? ''
		const collapsed = start === end
		const plain = !event.ctrlKey && !event.metaKey && !event.altKey

		if (event.key === 'Escape') {
			tabReleased.current = true
			return
		}
		if (event.key !== 'Tab') tabReleased.current = false

		if (event.key === 'Tab' && plain && !tabReleased.current) {
			event.preventDefault()
			const multiline = text.slice(start, end).includes('\n')
			if (!event.shiftKey && !multiline) {
				replaceRange(textarea, start, end, INDENT)
				return
			}
			// Indent or outdent every line the selection touches. Several lines stay selected as a block;
			// on a single line the caret (or selection) just moves with the text.
			const from = lineStart(text, start)
			const to = lineEnd(text, end)
			const block = text.slice(from, to).split('\n')
			const changed = event.shiftKey
				? block.map((line) => line.replace(/^ {1,2}/, ''))
				: block.map((line) => INDENT + line)
			const result = changed.join('\n')
			if (result === text.slice(from, to)) return
			const shift = (changed[0] ?? '').length - (block[0] ?? '').length
			replaceRange(
				textarea,
				from,
				to,
				result,
				multiline
					? [from, from + result.length]
					: [Math.max(from, start + shift), Math.max(from, end + shift)],
			)
			return
		}

		if (event.key === 'Enter' && plain && !event.shiftKey) {
			event.preventDefault()
			const indent = /^[ \t]*/.exec(text.slice(lineStart(text, start), start))?.[0] ?? ''
			if ((before === '{' || before === '[') && collapsed) {
				const inner = `\n${indent}${INDENT}`
				const closes = after === OPENERS[before]
				replaceRange(textarea, start, end, closes ? `${inner}\n${indent}` : inner, [
					start + inner.length,
					start + inner.length,
				])
			} else replaceRange(textarea, start, end, `\n${indent}`)
			return
		}

		if (event.key === 'Backspace' && collapsed && plain && start > 0) {
			if (OPENERS[before] && OPENERS[before] === after) {
				event.preventDefault()
				replaceRange(textarea, start - 1, start + 1, '')
				return
			}
			const leading = text.slice(lineStart(text, start), start)
			if (leading.length > 0 && /^ +$/.test(leading)) {
				event.preventDefault()
				const step = leading.length % INDENT.length || INDENT.length
				replaceRange(textarea, start - step, start, '')
			}
			return
		}

		if (!plain || event.key.length !== 1) return

		// Typing the closer that is already there steps over it.
		if (CLOSERS.has(event.key) && collapsed && after === event.key) {
			event.preventDefault()
			textarea.setSelectionRange(start + 1, start + 1)
			return
		}
		const closer = OPENERS[event.key]
		if (!closer) return
		if (!collapsed) {
			// Wrap the selection, as editors do.
			event.preventDefault()
			const inner = text.slice(start, end)
			replaceRange(textarea, start, end, `${event.key}${inner}${closer}`, [
				start + 1,
				start + 1 + inner.length,
			])
			return
		}
		// Only pair where nothing would stick to it (end of line, before a space, comma or closer).
		if (!/^$|[\s,:}\]]/.test(after)) return
		if (event.key === '"' && /[\w"]/.test(before)) return
		event.preventDefault()
		replaceRange(textarea, start, end, `${event.key}${closer}`, [start + 1, start + 1])
	}

	const textareaProps: ComponentProps<'textarea'> = {
		...props,
		ref: setRefs,
		value,
		onChange: (event) => onValueChange(event.target.value),
		onKeyDown: handleKeyDown,
		onFocus: (event) => {
			tabReleased.current = false
			props.onFocus?.(event)
		},
		spellCheck: false,
		autoComplete: 'off',
		autoCorrect: 'off',
		autoCapitalize: 'off',
		wrap: 'soft',
		className: cn(
			'absolute inset-y-0 right-0 left-(--gutter) resize-none overflow-hidden bg-transparent py-2 pr-4',
			'font-mono text-[0.875rem] leading-6 [overflow-wrap:anywhere] whitespace-pre-wrap [tab-size:2]',
			// The coloured copy underneath shows the text; the textarea keeps the caret and selection.
			'caret-fg selection:bg-accent/25 text-transparent outline-none selection:text-transparent',
			'placeholder:text-fg-subtle',
		),
	}

	return (
		<div
			className={cn(
				'rounded-control border-border-strong bg-surface overflow-hidden border',
				'transition-[border-color,box-shadow] duration-(--ds-motion) ease-(--ease-out)',
				'hover:border-accent/55 hover:ring-accent/10 hover:ring-[3px]',
				'focus-within:border-accent focus-within:ring-ring focus-within:ring-4 focus-within:hover:ring-4',
				'has-[textarea[data-invalid]]:border-danger has-[textarea[data-invalid]]:focus-within:ring-danger/30',
				className,
			)}
		>
			{toolbar ? (
				<div className="border-rule bg-surface-muted flex min-h-10 flex-wrap items-center justify-between gap-2 border-b py-1 pr-1 pl-4">
					{toolbar}
				</div>
			) : null}
			<div className="max-h-[24rem] overflow-y-auto">
				<div
					className="relative py-2 font-mono text-[0.875rem] leading-6 [tab-size:2]"
					style={{
						minHeight: `calc(${rows} * 1.5rem + 1rem)`,
						// Line numbers column: the widest number plus 1rem of padding on each side.
						['--gutter' as string]: `calc(${Math.max(2, digits)}ch + 2rem)`,
					}}
				>
					<div aria-hidden="true" className="pointer-events-none">
						{lines.map((line, index) => (
							<div
								// biome-ignore lint/suspicious/noArrayIndexKey: a line has no identity besides its number
								key={index}
								className={cn('flex min-h-6', markedLine === index + 1 && 'bg-danger-soft')}
							>
								<span
									className={cn(
										'tabular w-(--gutter) shrink-0 px-4 text-right select-none',
										markedLine === index + 1 ? 'text-danger font-semibold' : 'text-fg-subtle',
									)}
								>
									{index + 1}
								</span>
								<span className="text-fg min-w-0 flex-1 pr-4 [overflow-wrap:anywhere] whitespace-pre-wrap">
									{highlight ? highlight(line) : line}
								</span>
							</div>
						))}
					</div>
					<Field.Control
						render={<textarea />}
						// Field.Control is typed for <input>; these are a textarea's props.
						{...(textareaProps as unknown as ComponentProps<typeof Field.Control>)}
					/>
				</div>
			</div>
		</div>
	)
}
