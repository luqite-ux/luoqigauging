import {notFound} from 'next/navigation'
import {PageHero} from '@/components/site/page-hero'
import {ProductStage} from '@/components/site/product-image'
import {getCategory,getProducts} from '@/lib/data/catalog'
import Link from 'next/link'
export const revalidate=60
export default async function CategoryPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const [category,products]=await Promise.all([getCategory(slug),getProducts({categorySlug:slug})]);if(!category)notFound();return <><PageHero eyebrow="Product family" title={category.name} intro={category.summary} crumbs={[{label:'Products',href:'/products'},{label:category.name}]}/><main className="mx-auto grid max-w-[90rem] gap-6 px-5 py-14 sm:px-8 md:grid-cols-2 lg:grid-cols-3 lg:px-10">{products.map(p=><Link key={p.slug} href={`/products/${p.slug}`} className="border border-rule p-4 hover:border-link"><ProductStage image={p.image} sizes="(min-width:1024px) 33vw, 100vw"/><h2 className="mt-4 text-lg font-semibold text-navy">{p.name}</h2><p className="mt-2 text-sm text-ink-muted">{p.summary}</p></Link>)}</main></>}
