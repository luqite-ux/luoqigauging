import Link from 'next/link'
import { HeroCarousel } from '@/components/home/hero-carousel'
import { ProductStage } from '@/components/site/product-image'
import { Reveal } from '@/components/site/reveal'
import { SectionHeading } from '@/components/site/section-heading'
import { getFeaturedProducts } from '@/lib/data/catalog'
import { getApplications, getProcessSteps, getWorkshopPhotos } from '@/lib/data/content'

export default async function HomePage() {
  const [products, applications, steps, workshop] = await Promise.all([
    getFeaturedProducts(), getApplications(), getProcessSteps(), getWorkshopPhotos(),
  ])
  return <>
    <HeroCarousel />
    <section className="mx-auto max-w-[90rem] px-5 py-16 sm:px-8 lg:px-10">
      <SectionHeading eyebrow="Product systems" title="A practical route from the part feature to a repeatable shop-floor check" intro="Choose a pneumatic gauge, a matching measuring head, calibration standards, or a dedicated inspection fixture." />
      <div className="mt-9 grid gap-5 md:grid-cols-3">{products.map((product) => <Reveal key={product.slug}><Link href={`/products/${product.slug}`} className="group flex h-full flex-col border border-rule bg-white p-4 hover:border-link"><ProductStage image={product.image} sizes="(min-width: 768px) 33vw, 100vw" /><h3 className="mt-5 text-xl font-semibold text-navy">{product.name}</h3><p className="mt-2 flex-1 text-sm leading-6 text-ink-muted">{product.summary}</p><span className="mt-5 text-sm font-semibold text-link">View product →</span></Link></Reveal>)}</div>
    </section>
    <section className="bg-navy text-white"><div className="mx-auto max-w-[90rem] px-5 py-16 sm:px-8 lg:px-10"><SectionHeading eyebrow="Application fit" title="Built around the dimension you need to control" intro="Typical use cases are selected from the supplied catalog and customer questionnaire." tone="dark" /><div className="mt-9 grid gap-px bg-white/20 md:grid-cols-3">{applications.slice(0,6).map((item) => <Link key={item.slug} href={`/applications/${item.slug}`} className="bg-navy p-6 hover:bg-[#12365f]"><h3 className="text-lg font-semibold">{item.name}</h3><p className="mt-3 text-sm leading-6 text-white/75">{item.summary}</p></Link>)}</div></div></section>
    <section className="mx-auto grid max-w-[90rem] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:px-10"><div><SectionHeading eyebrow="How we work" title="Define, build and calibrate against the actual inspection task" /><ol className="mt-8 space-y-6">{steps.map((step,index)=><li key={step.key} className="grid grid-cols-[3rem_1fr] gap-4"><span className="font-mono text-sm text-link">0{index+1}</span><div><h3 className="font-semibold text-navy">{step.title}</h3><p className="mt-1 text-sm leading-6 text-ink-muted">{step.body}</p></div></li>)}</ol></div><div className="grid grid-cols-2 gap-3">{workshop.slice(0,3).map((photo,index)=><figure key={photo.src} className={index===0?'col-span-2':''}><img src={photo.src} alt={photo.alt} className="h-full min-h-48 w-full object-cover"/><figcaption className="mt-2 text-xs text-ink-muted">{photo.caption}</figcaption></figure>)}</div></section>
    <section className="border-y border-rule bg-steel"><div className="mx-auto flex max-w-[90rem] flex-col gap-6 px-5 py-12 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10"><div><h2 className="text-3xl font-semibold text-navy">Have a drawing or inspection requirement?</h2><p className="mt-2 text-ink-muted">Tell us the part, tolerance and measurement task. We will confirm the technical scope before manufacture.</p></div><Link href="/contact" className="inline-flex min-h-12 items-center justify-center bg-link px-6 font-semibold text-white hover:bg-navy">Request a quote</Link></div></section>
  </>
}
