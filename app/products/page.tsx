import Link from 'next/link'
import { PageHero } from '@/components/site/page-hero'
import { ProductStage } from '@/components/site/product-image'
import { getCategories, getProducts } from '@/lib/data/catalog'

export const revalidate = 60
export default async function ProductsPage() {
  const [categories, products] = await Promise.all([getCategories(), getProducts()])
  return <><PageHero eyebrow="Product catalog" title="Pneumatic gauging and dedicated inspection systems" intro="Browse representative systems. Final configuration is confirmed against your drawing and inspection task." />
    <main className="mx-auto max-w-[90rem] px-5 py-14 sm:px-8 lg:px-10"><div className="mb-10 flex flex-wrap gap-2">{categories.map(c=><a key={c.slug} href={`#${c.slug}`} className="border border-rule px-4 py-2 text-sm font-medium text-navy hover:border-link">{c.name}</a>)}</div><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{products.map(p=><article id={p.categorySlug} key={p.slug} className="flex flex-col border border-rule p-4"><ProductStage image={p.image} sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"/><h2 className="mt-5 text-xl font-semibold text-navy">{p.name}</h2><p className="mt-2 flex-1 text-sm leading-6 text-ink-muted">{p.summary}</p><Link href={`/products/${p.slug}`} className="mt-5 font-semibold text-link">View details →</Link></article>)}</div></main></>
}
