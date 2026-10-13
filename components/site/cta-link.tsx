import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'inverse' | 'inverse-outline'

const variants: Record<Variant, string> = {
  primary: 'bg-navy text-white border-navy hover:bg-navy-800 hover:border-navy-800',
  secondary: 'bg-white text-navy border-navy hover:bg-surface',
  inverse: 'bg-white text-navy border-white hover:bg-cyan-soft hover:border-cyan-soft',
  'inverse-outline': 'bg-transparent text-white border-white hover:bg-white/10',
}

interface CtaLinkProps {
  href: string
  children: React.ReactNode
  variant?: Variant
  arrow?: boolean
  className?: string
}

export function CtaLink({ href, children, variant = 'primary', arrow = true, className }: CtaLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group/cta inline-flex min-h-11 items-center justify-center gap-2 border px-5 py-2.5 text-sm font-semibold transition-colors',
        variants[variant],
        className,
      )}
    >
      <span>{children}</span>
      {arrow && (
        <ArrowRight
          className="size-4 transition-transform group-hover/cta:translate-x-0.5 motion-reduce:transition-none"
          aria-hidden="true"
        />
      )}
    </Link>
  )
}

export function TextLink({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group/text inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-link underline-offset-4 hover:underline',
        className,
      )}
    >
      <span>{children}</span>
      <ArrowRight
        className="size-4 transition-transform group-hover/text:translate-x-0.5 motion-reduce:transition-none"
        aria-hidden="true"
      />
    </Link>
  )
}
