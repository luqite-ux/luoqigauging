import { Wordmark } from '@/components/site/wordmark'
import { SiteNav } from '@/components/site/site-nav'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-white">
      <div className="relative mx-auto flex h-16 max-w-[90rem] items-center justify-between px-5 sm:px-8 lg:h-[72px] lg:px-10">
        <Wordmark />
        <SiteNav />
      </div>
    </header>
  )
}
