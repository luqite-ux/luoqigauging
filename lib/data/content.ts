import { defaultLocale, type Locale, type Localized } from '@/lib/locale'
import { getSupabaseClient, getTenantId, localized } from '@/lib/supabase'

export type IconKey =
  | 'car'
  | 'bearing'
  | 'motor'
  | 'hydraulic'
  | 'compressor'
  | 'machining'
  | 'drawing'
  | 'scheme'
  | 'build'
  | 'calibrate'
  | 'deliver'

export interface Application {
  slug: string
  icon: IconKey
  categorySlugs: string[]
  name: string
  summary: string
  tasks: string[]
}

export interface ProcessStep {
  key: string
  icon: IconKey
  title: string
  body: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface CapabilityGroup {
  slug: string
  title: string
  body: string
  points: string[]
}

export interface WorkshopPhoto {
  src: string
  alt: string
  caption: string
  group: string
}

export interface NewsArticle {
  slug: string
  title: string
  excerpt: string
  publishedAt: string
  body: string[]
  coverSrc?: string
  coverAlt?: string
}

const applicationRecords: Array<{
  slug: string
  icon: IconKey
  categorySlugs: string[]
  content: Localized<{ name: string; summary: string; tasks: string[] }>
}> = [
  {
    slug: 'automotive-components',
    icon: 'car',
    categorySlugs: ['pneumatic-gauges', 'pneumatic-measuring-heads', 'custom-inspection-fixtures'],
    content: {
      en: {
        name: 'Automotive components',
        summary:
          'Bore and shaft diameters on engine, transmission and chassis parts, and multi-feature checks on parts such as connecting rods.',
        tasks: ['Bore and shaft diameters', 'Connecting-rod combined checks', 'Machine-side comparison readings'],
      },
    },
  },
  {
    slug: 'bearings',
    icon: 'bearing',
    categorySlugs: ['pneumatic-gauges', 'standard-components', 'setting-rings-plug-gauges'],
    content: {
      en: {
        name: 'Bearings',
        summary:
          'Inner and outer ring diameters checked with pneumatic gauging and calibrated against matching setting rings and standards.',
        tasks: ['Inner ring bore', 'Outer ring diameter', 'Calibration with rings and standards'],
      },
    },
  },
  {
    slug: 'motors',
    icon: 'motor',
    categorySlugs: ['pneumatic-gauges', 'standard-components', 'custom-inspection-fixtures'],
    content: {
      en: {
        name: 'Electric motors',
        summary:
          'Shaft diameters and housing bores where fit matters, including stepped shafts that need several diameters checked together.',
        tasks: ['Shaft diameters', 'Housing bores', 'Multi-diameter checks'],
      },
    },
  },
  {
    slug: 'hydraulic-pneumatic',
    icon: 'hydraulic',
    categorySlugs: ['pneumatic-measuring-heads', 'setting-rings-plug-gauges'],
    content: {
      en: {
        name: 'Hydraulic and pneumatic components',
        summary:
          'Valve bores, spool and cylinder diameters, where small bore sizes call for purpose-made measuring heads.',
        tasks: ['Valve and sleeve bores', 'Spool and plunger diameters', 'Purpose-made small-bore heads'],
      },
    },
  },
  {
    slug: 'compressors',
    icon: 'compressor',
    categorySlugs: ['pneumatic-measuring-heads', 'setting-rings-plug-gauges', 'custom-inspection-fixtures'],
    content: {
      en: {
        name: 'Compressors',
        summary:
          'Cylinder bores, piston and shaft diameters, and dedicated fixtures for parts with several critical features.',
        tasks: ['Cylinder bores', 'Piston and shaft diameters', 'Dedicated multi-feature fixtures'],
      },
    },
  },
  {
    slug: 'precision-machining',
    icon: 'machining',
    categorySlugs: ['pneumatic-gauges', 'standard-components', 'custom-inspection-fixtures'],
    content: {
      en: {
        name: 'Precision machining and hardware',
        summary:
          'In-process and final checks beside the machine on turned and ground parts, with standards to keep the gauge set.',
        tasks: ['In-process diameter checks', 'Final inspection at the bench', 'Standards for routine gauge setting'],
      },
    },
  },
]

const processRecords: Array<{
  key: string
  icon: IconKey
  content: Localized<{ title: string; body: string }>
}> = [
  {
    key: 'drawing-review',
    icon: 'drawing',
    content: {
      en: {
        title: 'Drawing review',
        body: 'You send the part drawing, tolerances and the features to be measured. Engineers confirm what can be measured and how.',
      },
    },
  },
  {
    key: 'measuring-scheme',
    icon: 'scheme',
    content: {
      en: {
        title: 'Measuring scheme',
        body: 'Gauge type, measuring head layout and part location are agreed with you before any machining starts.',
      },
    },
  },
  {
    key: 'machining-assembly',
    icon: 'build',
    content: {
      en: {
        title: 'Machining and assembly',
        body: 'Heads, rings, standards and fixture bodies are machined and ground in our Wuxi workshop, then assembled.',
      },
    },
  },
  {
    key: 'calibration',
    icon: 'calibrate',
    content: {
      en: {
        title: 'Calibration',
        body: 'Finished tooling is checked against setting rings and standards in the inspection room before it ships.',
      },
    },
  },
  {
    key: 'delivery',
    icon: 'deliver',
    content: {
      en: {
        title: 'Delivery',
        body: 'Tooling is packed and dispatched. Standard orders typically take about 15 days; samples and production orders usually 15 to 25 days.',
      },
    },
  },
]

const faqRecords: Array<{ content: Localized<FaqItem> }> = [
  {
    content: {
      en: {
        question: 'Can you make a measuring head or fixture for my part?',
        answer:
          'Yes. Measuring heads and multi-parameter fixtures are made to your part drawing. Send the drawing, the tolerances and the features you need to inspect.',
      },
    },
  },
  {
    content: {
      en: {
        question: 'What quantity can I order?',
        answer:
          'State the quantity you need in your inquiry, from a single gauge or ring to a set. Order terms for each item are given in the quotation.',
      },
    },
  },
  {
    content: {
      en: {
        question: 'Can I get a data sheet or a sample drawing?',
        answer:
          'Yes. Ask in your inquiry and engineering will send the technical data or a sample drawing that applies to the item you are considering.',
      },
    },
  },
  {
    content: {
      en: {
        question: 'What is the lead time?',
        answer:
          'Standard orders typically take about 15 days. Samples and production orders usually take 15 to 25 days. The time for your item is confirmed in the quotation.',
      },
    },
  },
  {
    content: {
      en: {
        question: 'How is tooling inspected before delivery?',
        answer:
          'Finished measuring heads, rings and fixtures are checked against setting rings and standards in our inspection room before dispatch.',
      },
    },
  },
  {
    content: {
      en: {
        question: 'What should I include with an inquiry?',
        answer:
          'A drawing or sketch of the part, the diameters and tolerances to be measured, the quantity, and whether you already have a gauge that the heads must work with.',
      },
    },
  },
]

const capabilityRecords: Array<{
  slug: string
  content: Localized<{ title: string; body: string; points: string[] }>
}> = [
  {
    slug: 'machining',
    content: {
      en: {
        title: 'Machining and grinding',
        body: 'Measuring heads, rings, standards and fixture components are produced in our own workshop using grinding and spark-erosion machines.',
        points: ['Surface and cylindrical grinding', 'Spark-erosion machining', 'Parts made to your drawing'],
      },
    },
  },
  {
    slug: 'inspection',
    content: {
      en: {
        title: 'Inspection and calibration',
        body: 'A dedicated inspection room holds optical and bench instruments with setting rings and standards used to check finished tooling.',
        points: ['Optical projection inspection', 'Checks against setting rings and standards', 'Bench measurement of finished parts'],
      },
    },
  },
  {
    slug: 'assembly',
    content: {
      en: {
        title: 'Assembly and fixture building',
        body: 'Gauges, measuring heads and multi-station fixtures are assembled and set up as complete measuring solutions.',
        points: ['Air connections and gauge assembly', 'Multi-station fixture build', 'Master bars and rings supplied for setting'],
      },
    },
  },
]

const workshopRecords: Array<{
  src: string
  group: string
  alt: Localized<string>
  caption: Localized<string>
}> = [
  {
    src: '/images/workshop/spark-machining.jpg',
    group: 'machining',
    alt: { en: 'Spark-erosion machine with open work chamber and control cabinet in the workshop' },
    caption: { en: 'Spark-erosion machining station' },
  },
  {
    src: '/images/workshop/surface-grinding.jpg',
    group: 'machining',
    alt: { en: 'Surface grinding machine with further grinders in the background of the workshop' },
    caption: { en: 'Surface grinding machine and grinding area' },
  },
  {
    src: '/images/workshop/inspection-room.jpg',
    group: 'inspection',
    alt: { en: 'Inspection room with an optical projector, bench instruments and rings on the benches' },
    caption: { en: 'Inspection room with optical projector and bench instruments' },
  },
]

const newsRecords: Array<{
  slug: string
  publishedAt: string
  coverSrc?: string
  content: Localized<{ title: string; excerpt: string; body: string[]; coverAlt?: string }>
}> = []

function pickText<T>(value: Localized<T>, locale: Locale): T {
  return value[locale] ?? value[defaultLocale]
}

type PublishedContent = {
  title_i18n?: Localized<string>
  body_i18n?: Localized<string>
  items?: Array<{
    id?: string
    title_i18n?: Localized<string>
    text_i18n?: Localized<string>
    value?: string
    is_active?: boolean
  }>
}

async function getPublishedContent(keys: string[]): Promise<Map<string, PublishedContent>> {
  const db = getSupabaseClient()
  const tenantId = getTenantId()
  if (!db || !tenantId || keys.length === 0) return new Map()

  const { data, error } = await db
    .from('content_entries')
    .select('content_key,published_data')
    .eq('tenant_id', tenantId)
    .eq('status', 'published')
    .in('content_key', keys)

  if (error || !data) return new Map()
  return new Map(data.map((row) => [row.content_key, row.published_data as PublishedContent]))
}

function activeItems(content?: PublishedContent) {
  return (content?.items ?? []).filter((item) => item.is_active !== false)
}

export async function getApplications(locale: Locale = defaultLocale): Promise<Application[]> {
  const published = await getPublishedContent(applicationRecords.map((record) => `application-${record.slug}`))
  return applicationRecords.map((record) => ({
    slug: record.slug,
    icon: record.icon,
    categorySlugs: record.categorySlugs,
    ...(() => {
      const fallback = pickText(record.content, locale)
      const entry = published.get(`application-${record.slug}`)
      const items = activeItems(entry)
      return {
        name: entry?.title_i18n ? pickText(entry.title_i18n, locale) : fallback.name,
        summary: entry?.body_i18n ? pickText(entry.body_i18n, locale) : fallback.summary,
        tasks: items.length
          ? items.map((item) => item.title_i18n ? pickText(item.title_i18n, locale) : item.value ?? '').filter(Boolean)
          : fallback.tasks,
      }
    })(),
  }))
}

export async function getApplication(
  slug: string,
  locale: Locale = defaultLocale,
): Promise<Application | null> {
  const all = await getApplications(locale)
  return all.find((item) => item.slug === slug) ?? null
}

export async function getProcessSteps(locale: Locale = defaultLocale): Promise<ProcessStep[]> {
  const published = await getPublishedContent(processRecords.map((record) => `process-${record.key}`))
  return processRecords.map((record) => {
    const fallback = pickText(record.content, locale)
    const entry = published.get(`process-${record.key}`)
    return {
      key: record.key,
      icon: record.icon,
      title: entry?.title_i18n ? pickText(entry.title_i18n, locale) : fallback.title,
      body: entry?.body_i18n ? pickText(entry.body_i18n, locale) : fallback.body,
    }
  })
}

export async function getFaqs(locale: Locale = defaultLocale): Promise<FaqItem[]> {
  const published = await getPublishedContent(['faq-general'])
  const items = activeItems(published.get('faq-general'))
  if (items.length) {
    return items.map((item) => ({
      question: item.title_i18n ? pickText(item.title_i18n, locale) : '',
      answer: item.text_i18n ? pickText(item.text_i18n, locale) : item.value ?? '',
    })).filter((item) => item.question && item.answer)
  }
  return faqRecords.map((record) => pickText(record.content, locale))
}

export async function getCapabilityGroups(locale: Locale = defaultLocale): Promise<CapabilityGroup[]> {
  const published = await getPublishedContent(capabilityRecords.map((record) => `capability-${record.slug}`))
  return capabilityRecords.map((record) => {
    const fallback = pickText(record.content, locale)
    const entry = published.get(`capability-${record.slug}`)
    const items = activeItems(entry)
    return {
      slug: record.slug,
      title: entry?.title_i18n ? pickText(entry.title_i18n, locale) : fallback.title,
      body: entry?.body_i18n ? pickText(entry.body_i18n, locale) : fallback.body,
      points: items.length
        ? items.map((item) => item.title_i18n ? pickText(item.title_i18n, locale) : item.value ?? '').filter(Boolean)
        : fallback.points,
    }
  })
}

export async function getWorkshopPhotos(locale: Locale = defaultLocale): Promise<WorkshopPhoto[]> {
  return workshopRecords.map((record) => ({
    src: record.src,
    group: record.group,
    alt: pickText(record.alt, locale),
    caption: pickText(record.caption, locale),
  }))
}

export async function getNewsArticles(locale: Locale = defaultLocale): Promise<NewsArticle[]> {
  const db=getSupabaseClient(),tenantId=getTenantId()
  if(db&&tenantId){const {data,error}=await db.from('articles').select('slug,title,title_i18n,excerpt,excerpt_i18n,content,content_i18n,published_at,featured_image').eq('tenant_id',tenantId).eq('is_published',true).order('published_at',{ascending:false});if(!error&&data)return data.map(row=>({slug:row.slug,title:localized(row.title_i18n,locale,row.title),excerpt:localized(row.excerpt_i18n,locale,row.excerpt??''),body:[localized(row.content_i18n,locale,row.content??'')],publishedAt:row.published_at??'',coverSrc:row.featured_image,coverAlt:localized(row.title_i18n,locale,row.title)}))}
  return newsRecords
    .map((record) => {
      const text = pickText(record.content, locale)
      return {
        slug: record.slug,
        publishedAt: record.publishedAt,
        coverSrc: record.coverSrc,
        title: text.title,
        excerpt: text.excerpt,
        body: text.body,
        coverAlt: text.coverAlt,
      }
    })
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}

export async function getNewsArticle(
  slug: string,
  locale: Locale = defaultLocale,
): Promise<NewsArticle | null> {
  const all = await getNewsArticles(locale)
  return all.find((item) => item.slug === slug) ?? null
}
