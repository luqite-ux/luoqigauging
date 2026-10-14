import Link from 'next/link'
import { ArrowUpRight, Crosshair } from 'lucide-react'
import { PageHero } from '@/components/site/page-hero'
import { Reveal } from '@/components/site/reveal'
import { SiteIcon } from '@/components/site/icon-map'
import { getApplications } from '@/lib/data/content'

export default async function ApplicationsPage() {
  const items = await getApplications()

  return (
    <>
      <PageHero
        eyebrow="Applications"
        title="Inspection tasks across precision manufacturing"
        intro="Start with the part and the feature that must be controlled. Each application below shows where pneumatic gauging and purpose-built inspection tooling can fit."
      />

      <main>
        <section className="bg-white">
          <div className="mx-auto max-w-[90rem] px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <div className="grid gap-8 border-b border-rule pb-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <Reveal>
                <div className="flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.18em] text-link">
                  <Crosshair className="size-5" aria-hidden="true" />
                  Application index
                </div>
              </Reveal>
              <Reveal index={1}>
                <p className="max-w-3xl text-xl leading-8 text-ink-muted sm:text-2xl">
                  Six recurring manufacturing contexts, organized by the geometry and inspection task—not by a generic product catalogue.
                </p>
              </Reveal>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {items.map((item, index) => (
                <Reveal key={item.slug} as="article" index={index % 3} className="h-full">
                  <Link
                    data-application-card
                    href={`/applications/${item.slug}`}
                    className="lift group flex h-full min-h-[22rem] flex-col border border-rule bg-surface p-6 focus-visible:outline-navy sm:p-8"
                  >
                    <div className="flex items-start justify-between gap-5">
                      <span
                        data-application-icon
                        className="grid size-14 place-items-center border border-navy/15 bg-white text-navy transition-colors group-hover:bg-navy group-hover:text-white"
                      >
                        <SiteIcon name={item.icon} className="size-7" />
                      </span>
                      <span className="font-mono text-xs tracking-[0.18em] text-ink-muted">0{index + 1}</span>
                    </div>

                    <h2 className="mt-8 text-2xl font-semibold leading-tight text-navy">{item.name}</h2>
                    <p className="mt-4 text-sm leading-6 text-ink-muted">{item.summary}</p>

                    <div className="mt-7 border-t border-rule pt-5">
                      <p className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.16em] text-link">
                        Typical checks
                      </p>
                      <ul className="mt-3 space-y-2">
                        {item.tasks.slice(0, 2).map((task) => (
                          <li key={task} className="flex gap-3 text-sm text-ink-muted">
                            <span className="mt-[0.6rem] size-1 shrink-0 bg-cyan" aria-hidden="true" />
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <span className="mt-auto flex items-center gap-2 pt-8 font-semibold text-link">
                      Explore application
                      <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-navy text-white">
          <Reveal className="mx-auto grid max-w-[90rem] gap-8 px-5 py-14 sm:px-8 md:grid-cols-[1fr_auto] md:items-center lg:px-10">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan">Application review</p>
              <h2 className="mt-3 max-w-3xl text-3xl font-semibold sm:text-4xl">Have a drawing or an unusual inspection task?</h2>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/75">Send the feature, tolerance and inspection environment. We will review a suitable gauging route with you.</p>
            </div>
            <Link href="/contact" className="inline-flex min-h-12 items-center justify-center gap-2 bg-white px-6 font-semibold text-navy hover:bg-cyan-soft">
              Discuss your application <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </section>
      </main>
    </>
  )
}
