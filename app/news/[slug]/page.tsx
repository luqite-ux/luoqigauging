import {notFound} from 'next/navigation'
import {PageHero} from '@/components/site/page-hero'
import {getNewsArticle} from '@/lib/data/content'
export const revalidate=60
export const dynamicParams=true
export default async function NewsArticlePage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const a=await getNewsArticle(slug);if(!a)notFound();return <><PageHero eyebrow={a.publishedAt} title={a.title} intro={a.excerpt} crumbs={[{label:'News',href:'/news'},{label:a.title}]}/><article className="article-prose mx-auto max-w-3xl px-5 py-14 sm:px-8">{a.body.map((p,i)=><p key={i}>{p}</p>)}</article></>}
