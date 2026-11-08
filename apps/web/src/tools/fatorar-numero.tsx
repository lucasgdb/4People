'use client'

import { Badge } from '@4people/ui'
import { Fragment } from 'react'
import { factorize } from '@/lib/algorithms/number-theory'
import { numeric } from '@/lib/schemas'
import { SingleInputTool } from './_shared/single-input-tool'
import { OutputValue } from './_shared/tool-layout'

const field = numeric({ integer: true, min: 1, max: Number.MAX_SAFE_INTEGER })

/** Prime factorization, written with powers (360 = 2³ × 3² × 5). */
export default function FactorizeNumber() {
	return (
		<SingleInputTool
			field={field}
			numeric={{ integer: true, min: 1, max: Number.MAX_SAFE_INTEGER }}
			label="Número"
			placeholder="Ex: 360"
			submitLabel="Fatorar"
			compute={(value) => ({ value, ...factorize(value) })}
			toText={({ value, factors, powers }) =>
				`${value} = ${factors.join(' × ')} = ${powers.map(({ base, exponent }) => (exponent > 1 ? `${base}^${exponent}` : base)).join(' × ')}`
			}
			render={({ value, factors, powers }) => (
				<div className="flex flex-col gap-3">
					<OutputValue>
						{value} ={' '}
						{powers.map(({ base, exponent }, index) => (
							<Fragment key={base}>
								{index > 0 ? ' × ' : ''}
								{base}
								{exponent > 1 ? <sup>{exponent}</sup> : null}
							</Fragment>
						))}
					</OutputValue>
					<p className="text-fg-muted text-sm">Fatores: {factors.join(' × ')}</p>
					{factors.length === 1 && value > 1 ? (
						<Badge tone="success" className="w-fit">
							{value} é primo
						</Badge>
					) : null}
				</div>
			)}
		/>
	)
}
