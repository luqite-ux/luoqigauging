import Link from 'next/link'
import { Wordmark } from '@/components/site/wordmark'
import { mainNav, site } from '@/lib/site'
import { getCategories } from '@/lib/data/catalog'

export async function SiteFooter() {
  const categories = await getCategories()

  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-[90rem] px-5 py-14 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1.2fr_1.2fr]">
          <div>
            <Wordmark tone="dark" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/80">
              Pneumatic gauges, measuring heads, calibration standards and custom inspection fixtures, made in Wuxi,
              China.
            </p>
            <p className="mt-5 text-sm font-medium text-white">{site.legalNameEn}</p>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-cyan">Navigate</h2>
            <ul className="mt-4 flex flex-col">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-10 items-center text-sm text-white/80 hover:text-white hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Product families">
            <h2 className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-cyan">Product families</h2>
            <ul className="mt-4 flex flex-col">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/products/category/${category.slug}`}
                    className="inline-flex min-h-10 items-center text-sm text-white/80 hover:text-white hover:underline"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-cyan">Contact</h2>
            <address className="mt-4 flex flex-col gap-1 text-sm not-italic text-white/80">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex min-h-10 items-center font-medium text-white hover:underline"
              >
                {site.email}
              </a>
              <a href={site.phoneHref} className="inline-flex min-h-10 items-center hover:text-white hover:underline">
                {site.phoneDisplay}
              </a>
              <span className="mt-2 leading-relaxed">
                {site.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </address>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/20 pt-6 text-xs text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.legalNameEn} All rights reserved.
          </p>
          <p>luoqigauging.com</p>
        </div>
      </div>
    </footer>
  )
}
