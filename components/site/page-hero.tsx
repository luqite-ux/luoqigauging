import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export interface Crumb {
  label: string
  href?: string
}

interface PageHeroProps {
  title: string
  intro?: string
  eyebrow?: string
  crumbs?: Crumb[]
  children?: React.ReactNode
}

export function PageHero({ title, intro, eyebrow, crumbs, children }: PageHeroProps) {
  return (
    <header className="grid-paper border-b border-rule">
      <div className="mx-auto max-w-[90rem] px-5 py-10 sm:px-8 md:py-14 lg:px-10">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-muted">
              <li>
                <Link href="/" className="inline-flex min-h-8 items-center hover:text-navy hover:underline">
                  Home
                </Link>
              </li>
              {crumbs.map((crumb, index) => (
                <li key={`${crumb.label}-${index}`} className="inline-flex items-center gap-1.5">
                  <ChevronRight className="size-3.5 text-rule-strong" aria-hidden="true" />
                  {crumb.href ? (
                    <Link href={crumb.href} className="inline-flex min-h-8 items-center hover:text-navy hover:underline">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="font-medium text-navy">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {eyebrow && (
          <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-link">{eyebrow}</p>
        )}
        <h1 className="mt-3 max-w-3xl text-balance text-4xl font-semibold leading-[1.1] text-navy md:text-5xl">
          {title}
        </h1>
        {intro && <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted md:text-lg">{intro}</p>}
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
    </header>
  )
}
