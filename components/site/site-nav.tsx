'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { mainNav, quoteCta } from '@/lib/site'

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function SiteNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
        {mainNav.map((item) => {
          const active = isActive(pathname, item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'relative inline-flex min-h-11 items-center px-3 text-sm font-medium transition-colors hover:text-link',
                active ? 'text-navy' : 'text-ink-muted',
              )}
            >
              {item.label}
              {active && <span className="absolute inset-x-3 bottom-1.5 h-0.5 bg-cyan" aria-hidden="true" />}
            </Link>
          )
        })}
        <Link
          href={quoteCta.href}
          className="ml-3 inline-flex min-h-11 items-center bg-navy px-5 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
        >
          {quoteCta.label}
        </Link>
      </nav>

      <button
        type="button"
        className="inline-flex size-11 items-center justify-center border border-rule-strong text-navy lg:hidden"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
      </button>

      <nav
        id="mobile-nav"
        aria-label="Mobile"
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-rule bg-white shadow-[0_18px_30px_-24px_rgb(11_37_69/0.5)] lg:hidden"
      >
        <ul className="mx-auto max-w-[90rem] px-5 py-2 sm:px-8">
          {mainNav.map((item) => {
            const active = isActive(pathname, item.href)
            return (
              <li key={item.href} className="border-b border-rule last:border-b-0">
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'flex min-h-12 items-center justify-between text-base font-medium',
                    active ? 'text-navy' : 'text-ink-muted',
                  )}
                >
                  {item.label}
                  {active && <span className="size-1.5 bg-cyan" aria-hidden="true" />}
                </Link>
              </li>
            )
          })}
          <li className="py-3">
            <Link
              href={quoteCta.href}
              className="flex min-h-12 items-center justify-center bg-navy text-sm font-semibold text-white"
            >
              {quoteCta.label}
            </Link>
          </li>
        </ul>
      </nav>
    </>
  )
}
