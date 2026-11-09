import { buttonVariants } from '@4people/ui'
import { Wordmark } from '@/components/brand'
import { GithubIcon } from '@/components/github-icon'
import { REPOSITORY_URL } from '@/lib/site'
import { AllToolsMenu } from './mobile-nav'
import { PrimaryNav } from './primary-nav'
import { ToolSearch } from './tool-search'

/**
 * The translucent, blurred 64px top bar of every page: logo, the two areas (Computação, Matemática) with their
 * topics and tools in a panel, and the search. Below 1024px everything folds into the menu icon.
 */
export function SiteHeader() {
	return (
		<header className="bg-surface/75 sticky top-0 z-30 shadow-[inset_0_-1px_0_var(--color-border)] backdrop-blur-md backdrop-saturate-150">
			<div className="mx-auto flex h-16 w-full max-w-[1200px] items-center gap-4 px-4 sm:px-6 lg:gap-6">
				<div className="lg:hidden">
					<AllToolsMenu />
				</div>
				<Wordmark />
				<PrimaryNav className="hidden lg:block" />
				<ToolSearch className="ml-auto md:w-full md:max-w-[22rem]" />
				<a
					href={REPOSITORY_URL}
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Código-fonte do 4People no GitHub (abre em nova aba)"
					className={buttonVariants({
						variant: 'ghost',
						size: 'icon',
						className: 'shrink-0',
					})}
				>
					<GithubIcon className="size-5" />
				</a>
			</div>
		</header>
	)
}
