/**
 * Shared class recipe for text-like controls (input, textarea, select trigger). Hover previews the
 * focus state (blue border, faint halo) and eases in with the DS motion token; focus then takes
 * over with the full ring. Read-only and disabled controls don't react to hover.
 *
 * Validation states keep their colour from rest to hover to focus, ring included:
 * - error: `aria-invalid="true"`, or `data-invalid` (set by a Base UI Field) → danger
 * - success: `data-success` (opt-in: a value confirmed correct, e.g. a valid CPF) → success
 */
export const controlClass = [
	'w-full rounded-control border border-border-strong bg-surface px-4 text-base text-fg outline-none placeholder:text-fg-subtle',
	'transition-[border-color,box-shadow,background-color] duration-(--ds-motion) ease-(--ease-out)',
	'hover:border-accent/55 hover:ring-[3px] hover:ring-accent/10',
	'focus-visible:border-accent focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring',
	'data-[success]:border-success data-[success]:hover:border-success data-[success]:hover:ring-success/10 data-[success]:focus-visible:border-success data-[success]:focus-visible:ring-success/30',
	'aria-invalid:border-danger aria-invalid:hover:border-danger aria-invalid:hover:ring-danger/10 aria-invalid:focus-visible:border-danger aria-invalid:focus-visible:ring-danger/30',
	'data-[invalid]:border-danger data-[invalid]:hover:border-danger data-[invalid]:hover:ring-danger/10 data-[invalid]:focus-visible:border-danger data-[invalid]:focus-visible:ring-danger/30',
	'read-only:bg-surface-muted read-only:hover:border-border-strong read-only:hover:ring-0',
	'disabled:opacity-60 disabled:hover:border-border-strong disabled:hover:ring-0',
].join(' ')
