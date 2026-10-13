import type {MetadataRoute} from 'next'
import {site} from '@/lib/site'
import {getProducts} from '@/lib/data/catalog'
import {getNewsArticles} from '@/lib/data/content'
export default async function sitemap():Promise<MetadataRoute.Sitemap>{const [products,articles]=await Promise.all([getProducts(),getNewsArticles()]);const now=new Date();const pages=['','/products','/applications','/capabilities','/about','/news','/contact'].map(p=>({url:`${site.url}${p}`,lastModified:now}));return [...pages,...products.map(p=>({url:`${site.url}/products/${p.slug}`,lastModified:now})),...articles.map(a=>({url:`${site.url}/news/${a.slug}`,lastModified:a.publishedAt?new Date(a.publishedAt):now}))]}
