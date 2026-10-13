import {notFound} from 'next/navigation'
import {PageHero} from '@/components/site/page-hero'
import {getApplication} from '@/lib/data/content'
export default async function ApplicationPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const a=await getApplication(slug);if(!a)notFound();return <><PageHero eyebrow="Application" title={a.name} intro={a.summary} crumbs={[{label:'Applications',href:'/applications'},{label:a.name}]}/><main className="mx-auto max-w-4xl px-5 py-14 sm:px-8"><h2 className="text-2xl font-semibold text-navy">Typical measurement tasks</h2><ul className="mt-6 grid gap-3">{a.tasks.map(x=><li key={x} className="border-l-2 border-link bg-steel p-4 text-ink-muted">{x}</li>)}</ul></main></>}
