import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Wordmark({ tone = 'light', className }: { tone?: 'light' | 'dark'; className?: string }) {
  const dark = tone === 'dark'
  return (
    <Link
      href="/"
      aria-label="LUOQI Gauging, home"
      className={cn('group/logo inline-flex min-h-11 items-center gap-3', className)}
    >
      <span
        aria-hidden="true"
        className={cn(
          'grid size-9 place-items-center font-mono text-sm font-medium tracking-tight',
          dark ? 'bg-white text-navy' : 'bg-navy text-white',
        )}
      >
        LQ
      </span>
      <span className="flex items-baseline gap-2" aria-hidden="true">
        <span className={cn('text-xl font-bold tracking-[0.14em]', dark ? 'text-white' : 'text-navy')}>LUOQI</span>
        <span
          className={cn(
            'border-l pl-2 text-sm font-medium tracking-wide',
            dark ? 'border-white/40 text-cyan' : 'border-rule-strong text-link',
          )}
        >
          Gauging
        </span>
      </span>
    </Link>
  )
}
