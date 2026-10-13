import { cn } from '@/lib/utils'
import { Reveal } from '@/components/site/reveal'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  intro?: string
  id?: string
  tone?: 'light' | 'dark'
  className?: string
  children?: React.ReactNode
}

export function SectionHeading({ eyebrow, title, intro, id, tone = 'light', className, children }: SectionHeadingProps) {
  const dark = tone === 'dark'
  return (
    <Reveal className={cn('flex flex-col gap-6 md:flex-row md:items-end md:justify-between', className)}>
      <div className="max-w-2xl">
        <p
          className={cn(
            'font-mono text-xs font-medium uppercase tracking-[0.18em]',
            dark ? 'text-cyan' : 'text-link',
          )}
        >
          {eyebrow}
        </p>
        <div className={cn('mt-3 w-24', dark ? 'tick-rule-dark' : 'tick-rule')} aria-hidden="true" />
        <h2
          id={id}
          className={cn(
            'mt-5 text-balance text-3xl font-semibold leading-tight md:text-4xl',
            dark ? 'text-white' : 'text-navy',
          )}
        >
          {title}
        </h2>
        {intro && (
          <p className={cn('mt-4 text-base leading-relaxed md:text-lg', dark ? 'text-white/80' : 'text-ink-muted')}>
            {intro}
          </p>
        )}
      </div>
      {children && <div className="shrink-0">{children}</div>}
    </Reveal>
  )
}
