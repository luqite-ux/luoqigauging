import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Check } from 'lucide-react'
import { PageHero } from '@/components/site/page-hero'
import { Reveal } from '@/components/site/reveal'
import { SiteIcon } from '@/components/site/icon-map'
import { getCapabilityGroups, getProcessSteps, getWorkshopPhotos } from '@/lib/data/content'

export default async function CapabilitiesPage() {
  const [groups, steps, workshop] = await Promise.all([
    getCapabilityGroups(),
    getProcessSteps(),
    getWorkshopPhotos(),
  ])
  const photoByGroup = new Map(workshop.map((photo) => [photo.group, photo]))

  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        title="From requirement review to calibrated inspection tooling"
        intro="A practical workflow built around your part, its critical feature and the environment where the measurement takes place."
      />

      <main>
        <section className="bg-white">
          <div className="mx-auto max-w-[90rem] px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <Reveal className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-link">Workshop capability</p>
              <h2 className="max-w-4xl text-3xl font-semibold leading-tight text-navy sm:text-5xl">
                The making, checking and assembly stages stay connected.
              </h2>
            </Reveal>

            <div className="mt-12 space-y-6 lg:mt-16">
              {groups.filter((group) => photoByGroup.has(group.slug)).map((group, index) => {
                const photo = photoByGroup.get(group.slug)!
                const reverse = index % 2 === 1

                return (
                  <Reveal key={group.slug} as="article">
                    <div
                      data-capability-panel
                      className="grid overflow-hidden border border-rule bg-surface lg:min-h-[29rem] lg:grid-cols-2"
                    >
                      <div className={`relative min-h-72 overflow-hidden bg-surface-deep ${reverse ? 'lg:order-2' : ''}`}>
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          sizes="(min-width: 1024px) 50vw, 100vw"
                          className="object-cover transition-transform duration-700 hover:scale-[1.025]"
                        />
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-navy/90 px-5 py-4 text-sm text-white">
                          {photo.caption}
                        </div>
                      </div>

                      <div className={`flex flex-col justify-center p-7 sm:p-10 lg:p-14 ${reverse ? 'lg:order-1' : ''}`}>
                        <div className="flex items-center gap-4">
                          <span className="font-mono text-xs tracking-[0.18em] text-link">0{index + 1}</span>
                          <span className="h-px w-12 bg-cyan" aria-hidden="true" />
                        </div>
                        <h3 className="mt-6 text-3xl font-semibold text-navy">{group.title}</h3>
                        <p className="mt-5 text-base leading-7 text-ink-muted">{group.body}</p>
                        <ul className="mt-7 grid gap-3">
                          {group.points.map((point) => (
                            <li key={point} className="flex items-start gap-3 text-sm leading-6 text-ink-muted">
                              <span className="mt-1 grid size-5 shrink-0 place-items-center bg-cyan-soft text-link">
                                <Check className="size-3.5" aria-hidden="true" />
                              </span>
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        <section className="bg-navy text-white">
          <div className="mx-auto max-w-[90rem] px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <Reveal className="max-w-4xl">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-cyan">Project route</p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-5xl">Five controlled stages from drawing to delivery.</h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/75">Each stage resolves a specific engineering question before the tooling moves forward.</p>
            </Reveal>

            <ol className="relative mt-12 grid gap-0 md:grid-cols-5">
              <span className="process-line absolute left-7 top-7 hidden h-px w-[calc(100%-3.5rem)] bg-white/30 md:block" aria-hidden="true" />
              <span className="process-line absolute bottom-7 left-7 top-7 w-px bg-white/30 md:hidden" aria-hidden="true" />
              {steps.map((step, index) => (
                <Reveal key={step.key} as="li" index={index} className="relative">
                  <div data-process-step className="relative grid grid-cols-[3.5rem_1fr] gap-5 py-5 md:block md:pr-7 md:pt-0">
                    <span className="process-node relative z-10 grid size-14 place-items-center border border-white/35 bg-navy text-cyan">
                      <SiteIcon name={step.icon} className="size-6" />
                    </span>
                    <div>
                      <span className="font-mono text-[0.68rem] tracking-[0.18em] text-cyan">STAGE 0{index + 1}</span>
                      <h3 className="mt-2 text-lg font-semibold text-white md:mt-5">{step.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-white/70">{step.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-cyan-soft">
          <Reveal className="mx-auto grid max-w-[90rem] gap-8 px-5 py-14 sm:px-8 md:grid-cols-[1fr_auto] md:items-center lg:px-10">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-link">Start with the drawing</p>
              <h2 className="mt-3 text-3xl font-semibold text-navy">Define the feature before selecting the gauge.</h2>
            </div>
            <Link href="/contact" className="inline-flex min-h-12 items-center justify-center gap-2 bg-navy px-6 font-semibold text-white hover:bg-navy-800">
              Request an engineering review <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </section>
      </main>
    </>
  )
}
