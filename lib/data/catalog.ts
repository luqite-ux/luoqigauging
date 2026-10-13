import { defaultLocale, type Locale, type Localized } from '@/lib/locale'
import { getSupabaseClient, getTenantId, localized } from '@/lib/supabase'

/*
 * Catalog data layer.
 * Every getter is async and takes a locale so the in-file arrays below can be
 * replaced by a database query without touching any page or component.
 * The records here are representative samples, not the full catalog.
 */

export interface ProductImage {
  src: string
  alt: string
  /** Enlarges the subject inside a square stage whose source photo has wide white margins. The subject always stays fully visible. */
  stageScale: number
}

export interface ProductCategory {
  slug: string
  order: number
  name: string
  summary: string
  measures: string
  chooseWhen: string
  image: ProductImage
}

export interface ProductSpec {
  label: string
  value: string
}

export interface Product {
  slug: string
  categorySlug: string
  name: string
  summary: string
  description: string
  measurementTasks: string[]
  applicationSlugs: string[]
  specs: ProductSpec[]
  image: ProductImage
  featured: boolean
}

interface CategoryRecord {
  slug: string
  order: number
  image: Omit<ProductImage, 'alt'> & { alt: Localized<string> }
  content: Localized<{ name: string; summary: string; measures: string; chooseWhen: string }>
}

interface ProductRecord {
  slug: string
  categorySlug: string
  applicationSlugs: string[]
  featured: boolean
  image: Omit<ProductImage, 'alt'> & { alt: Localized<string> }
  content: Localized<{
    name: string
    summary: string
    description: string
    measurementTasks: string[]
    specs: ProductSpec[]
  }>
}

const categoryRecords: CategoryRecord[] = [
  {
    slug: 'pneumatic-gauges',
    order: 1,
    image: {
      src: '/images/products/float-pneumatic-gauge.jpg',
      stageScale: 1.15,
      alt: {
        en: 'Column-type float pneumatic gauge with graduated scale, red index markers and air valve',
      },
    },
    content: {
      en: {
        name: 'Pneumatic Gauges',
        summary:
          'Float-type and digital pneumatic gauges that show dimensional change at an air measuring head as a clear on-scale reading.',
        measures: 'Internal and external diameters, with related form checks when paired with suitable measuring heads.',
        chooseWhen:
          'Operators need quick, repeatable comparison readings of bores and shafts beside the machine or at the inspection bench.',
      },
    },
  },
  {
    slug: 'pneumatic-measuring-heads',
    order: 2,
    image: {
      src: '/images/products/pneumatic-measuring-head.jpg',
      stageScale: 1.3,
      alt: {
        en: 'Pneumatic measuring head with brass air fittings beside two steel rings',
      },
    },
    content: {
      en: {
        name: 'Pneumatic Measuring Heads',
        summary:
          'Air plugs and measuring heads that carry the air nozzles to the feature being checked, matched to hole or shaft size.',
        measures: 'Bore or shaft diameter at the size and tolerance on your part drawing.',
        chooseWhen:
          'You already run a gauge and need heads for a new part size, or you are specifying a complete gauging set-up.',
      },
    },
  },
  {
    slug: 'standard-components',
    order: 3,
    image: {
      src: '/images/products/external-diameter-standard.jpg',
      stageScale: 1.1,
      alt: {
        en: 'Three ground steel external diameter standards with black inserts in graduated sizes',
      },
    },
    content: {
      en: {
        name: 'Standard Components',
        summary:
          'Reference pieces, including external diameter standards, used to set and check a gauging system at a known size.',
        measures: 'A fixed reference diameter for setting zero and verifying gauge response.',
        chooseWhen:
          'You need a master piece to set a gauge before measuring production parts, or to check it between shifts.',
      },
    },
  },
  {
    slug: 'setting-rings-plug-gauges',
    order: 4,
    image: {
      src: '/images/products/setting-ring.jpg',
      stageScale: 1.25,
      alt: {
        en: 'Three setting rings with green finished bodies and ground steel faces',
      },
    },
    content: {
      en: {
        name: 'Setting Rings & Plug Gauges',
        summary:
          'Setting rings and plug gauges for calibrating and verifying internal and external diameter measuring tools.',
        measures: 'Bore and shaft sizes used as calibration references for air gauges and other tools.',
        chooseWhen: 'You calibrate bore or shaft measuring tools to a defined diameter and want a matching reference.',
      },
    },
  },
  {
    slug: 'custom-inspection-fixtures',
    order: 5,
    image: {
      src: '/images/products/connecting-rod-fixture.jpg',
      stageScale: 1.3,
      alt: {
        en: 'Blue-based connecting-rod measuring fixture with a locating plate and two steel connecting-rod parts',
      },
    },
    content: {
      en: {
        name: 'Custom Inspection Fixtures',
        summary:
          'Non-standard measuring devices designed around your part, such as connecting-rod and multi-parameter outside diameter fixtures.',
        measures: 'Several dimensions and positions of one part, located and read in a single set-up.',
        chooseWhen:
          'One gauge cannot cover the features you need, or the part needs dedicated location for a repeatable reading.',
      },
    },
  },
]

const productRecords: ProductRecord[] = [
  {
    slug: 'qfb-float-pneumatic-gauge',
    categorySlug: 'pneumatic-gauges',
    applicationSlugs: ['automotive-components', 'bearings', 'precision-machining'],
    featured: true,
    image: categoryRecords[0].image,
    content: {
      en: {
        name: 'QFB Float-Type Pneumatic Gauge',
        summary:
          'A column-type float gauge with a graduated scale, adjustable index markers and an air supply valve, used with pneumatic measuring heads.',
        description:
          'The QFB float-type pneumatic gauge presents the reading from a connected measuring head against a graduated column. Adjustable index markers let the operator set the limits that matter for the part. It is paired with measuring heads sized to your hole or shaft and set with a matching ring or standard.',
        measurementTasks: [
          'Bore and shaft diameter comparison readings',
          'Quick limit checks with adjustable index markers',
          'Use with pneumatic measuring heads sized to your part',
        ],
        specs: [
          { label: 'Gauge type', value: 'Float-type, column scale' },
          { label: 'Works with', value: 'Pneumatic measuring heads, setting rings and standards' },
          { label: 'Range and graduation', value: 'Confirmed against your drawing at quotation' },
        ],
      },
    },
  },
  {
    slug: 'pneumatic-measuring-head',
    categorySlug: 'pneumatic-measuring-heads',
    applicationSlugs: ['automotive-components', 'hydraulic-pneumatic', 'compressors'],
    featured: true,
    image: categoryRecords[1].image,
    content: {
      en: {
        name: 'Pneumatic Measuring Head',
        summary:
          'Measuring heads with brass air connections, made to the hole or shaft size and tolerance of your part.',
        description:
          'Pneumatic measuring heads carry the air nozzles into the feature being measured and connect to a pneumatic gauge. Heads are made to the diameter and tolerance on your part drawing, and a matching setting ring is normally supplied for calibration.',
        measurementTasks: [
          'Internal diameter checks on bores',
          'External diameter checks with ring-type heads',
          'Matched sets with setting rings for calibration',
        ],
        specs: [
          { label: 'Connection', value: 'Brass air fittings to the gauge' },
          { label: 'Sizing', value: 'Made to the diameter and tolerance on your drawing' },
          { label: 'Calibration', value: 'Matching setting ring recommended' },
        ],
      },
    },
  },
  {
    slug: 'external-diameter-standard',
    categorySlug: 'standard-components',
    applicationSlugs: ['bearings', 'motors', 'precision-machining'],
    featured: true,
    image: categoryRecords[2].image,
    content: {
      en: {
        name: 'External Diameter Standard',
        summary:
          'Ground reference pieces in graduated sizes for setting and verifying external diameter gauging.',
        description:
          'External diameter standards give a gauging set-up a known size to be set against. They are supplied in the sizes you specify and are used at the machine or in the inspection room to set zero and to check the gauge between production runs.',
        measurementTasks: [
          'Setting zero on external diameter gauges',
          'Verifying gauge response between runs',
          'Reference sizes for a family of similar parts',
        ],
        specs: [
          { label: 'Form', value: 'Ground reference pieces with black inserts' },
          { label: 'Sizes', value: 'Supplied to the diameters you specify' },
          { label: 'Tolerance', value: 'Confirmed against your drawing at quotation' },
        ],
      },
    },
  },
  {
    slug: 'setting-ring',
    categorySlug: 'setting-rings-plug-gauges',
    applicationSlugs: ['bearings', 'compressors', 'hydraulic-pneumatic'],
    featured: false,
    image: categoryRecords[3].image,
    content: {
      en: {
        name: 'Setting Ring',
        summary:
          'Setting rings for calibrating internal diameter measuring tools to a defined bore size.',
        description:
          'Setting rings provide a precise bore reference for calibrating internal diameter measuring tools, including pneumatic measuring heads. Rings are made to the size you specify and are usually ordered together with the measuring head they will calibrate.',
        measurementTasks: [
          'Calibrating pneumatic measuring heads and bore gauges',
          'Periodic verification of internal diameter tools',
          'Matched ring and plug sets',
        ],
        specs: [
          { label: 'Form', value: 'Ring with ground bore' },
          { label: 'Sizes', value: 'Made to the diameter you specify' },
          { label: 'Tolerance', value: 'Confirmed against your drawing at quotation' },
        ],
      },
    },
  },
  {
    slug: 'connecting-rod-measuring-fixture',
    categorySlug: 'custom-inspection-fixtures',
    applicationSlugs: ['automotive-components', 'compressors'],
    featured: true,
    image: categoryRecords[4].image,
    content: {
      en: {
        name: 'Connecting-Rod Combined Measuring Fixture',
        summary:
          'A dedicated fixture that locates a connecting rod and measures several features in one set-up.',
        description:
          'This fixture is built around the connecting rod: a locating plate holds the part while measuring elements read the features that matter for the drawing. The layout is designed for each rod and the dimensions to be inspected.',
        measurementTasks: [
          'Locating a connecting rod for repeatable measurement',
          'Combined checks of several features in one set-up',
          'Layout designed around your drawing',
        ],
        specs: [
          { label: 'Type', value: 'Custom multi-parameter fixture' },
          { label: 'Features measured', value: 'Defined from your part drawing' },
          { label: 'Output', value: 'Pneumatic or other readout, agreed with you' },
        ],
      },
    },
  },
  {
    slug: 'multi-parameter-od-measuring-fixture',
    categorySlug: 'custom-inspection-fixtures',
    applicationSlugs: ['motors', 'precision-machining', 'automotive-components'],
    featured: true,
    image: {
      src: '/images/products/multi-parameter-fixture.jpg',
      stageScale: 1.25,
      alt: {
        en: 'Blue-based outside diameter measuring fixture with several steel measuring stations and two ground master bars',
      },
    },
    content: {
      en: {
        name: 'Multi-Parameter Outside Diameter Fixture',
        summary:
          'A bench fixture with several measuring stations for checking more than one outside diameter on a part.',
        description:
          'The multi-parameter outside diameter fixture places several measuring stations on one base so that a part can be checked at more than one diameter without re-setting. Ground master bars are supplied to set the stations.',
        measurementTasks: [
          'Checking several outside diameters in one placement',
          'Stepped shafts and similar multi-diameter parts',
          'Master bars supplied to set each station',
        ],
        specs: [
          { label: 'Type', value: 'Custom multi-station bench fixture' },
          { label: 'Stations', value: 'Number and spacing set by your part' },
          { label: 'Setting', value: 'Ground master bars' },
        ],
      },
    },
  },
]

function viewCategory(record: CategoryRecord, locale: Locale): ProductCategory {
  const text = record.content[locale] ?? record.content[defaultLocale]
  return {
    slug: record.slug,
    order: record.order,
    ...text,
    image: {
      src: record.image.src,
      stageScale: record.image.stageScale,
      alt: record.image.alt[locale] ?? record.image.alt[defaultLocale],
    },
  }
}

function viewProduct(record: ProductRecord, locale: Locale): Product {
  const text = record.content[locale] ?? record.content[defaultLocale]
  return {
    slug: record.slug,
    categorySlug: record.categorySlug,
    applicationSlugs: record.applicationSlugs,
    featured: record.featured,
    ...text,
    image: {
      src: record.image.src,
      stageScale: record.image.stageScale,
      alt: record.image.alt[locale] ?? record.image.alt[defaultLocale],
    },
  }
}

export async function getCategories(locale: Locale = defaultLocale): Promise<ProductCategory[]> {
  const db = getSupabaseClient(), tenantId = getTenantId()
  if (db && tenantId) {
    const { data, error } = await db.from('product_categories').select('slug,name,name_i18n,description,description_i18n,sort_order,extra_data').eq('tenant_id',tenantId).eq('is_active',true).order('sort_order')
    if (!error && data?.length) return data.map((row, index) => ({ slug: row.slug, order: row.sort_order ?? index + 1, name: localized(row.name_i18n, locale, row.name), summary: localized(row.description_i18n, locale, row.description ?? ''), measures: '', chooseWhen: '', image: categoryRecords.find((item)=>item.slug===row.slug)?.image ? viewCategory(categoryRecords.find((item)=>item.slug===row.slug)!,locale).image : {src:'/images/products/float-pneumatic-gauge.jpg',alt:localized(row.name_i18n,locale,row.name),stageScale:1} }))
  }
  return categoryRecords
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((record) => viewCategory(record, locale))
}

export async function getCategory(
  slug: string,
  locale: Locale = defaultLocale,
): Promise<ProductCategory | null> {
  return (await getCategories(locale)).find((item)=>item.slug===slug) ?? null
}

export async function getProducts(
  options: { categorySlug?: string; applicationSlug?: string; locale?: Locale } = {},
): Promise<Product[]> {
  const { categorySlug, applicationSlug, locale = defaultLocale } = options
  const db = getSupabaseClient(), tenantId = getTenantId()
  if (db && tenantId) {
    let query = db.from('products').select('slug,category_slug,name,name_i18n,description,description_i18n,overview_i18n,features_i18n,applications_i18n,specs,image_url,extra_data,sort_order').eq('tenant_id',tenantId).eq('is_active',true).order('sort_order')
    if (categorySlug) query = query.eq('category_slug',categorySlug)
    const { data, error } = await query
    if (!error && data?.length) return data.map((row,index) => ({ slug:row.slug,categorySlug:row.category_slug,name:localized(row.name_i18n,locale,row.name),summary:localized(row.description_i18n,locale,row.description??''),description:localized(row.overview_i18n,locale,localized(row.description_i18n,locale,row.description??'')),measurementTasks:Array.isArray((row.applications_i18n as Record<string,unknown>)?.[locale])?(row.applications_i18n as Record<string,string[]>)[locale]:[],applicationSlugs:[],specs:row.specs&&typeof row.specs==='object'&&!Array.isArray(row.specs)?Object.entries(row.specs as Record<string,unknown>).map(([label,value])=>({label,value:String(value)})):[],image:{src:row.image_url,alt:localized(row.name_i18n,locale,row.name),stageScale:1},featured:index<6 }))
  }
  return productRecords
    .filter((record) => !categorySlug || record.categorySlug === categorySlug)
    .filter((record) => !applicationSlug || record.applicationSlugs.includes(applicationSlug))
    .map((record) => viewProduct(record, locale))
}

export async function getProduct(
  slug: string,
  locale: Locale = defaultLocale,
): Promise<Product | null> {
  return (await getProducts({locale})).find((item)=>item.slug===slug) ?? null
}

export async function getFeaturedProducts(locale: Locale = defaultLocale): Promise<Product[]> {
  return (await getProducts({locale})).filter((record) => record.featured)
}

export async function getRelatedProducts(
  product: Pick<Product, 'slug' | 'categorySlug'>,
  locale: Locale = defaultLocale,
  limit = 3,
): Promise<Product[]> {
  const sameCategory = productRecords.filter(
    (record) => record.slug !== product.slug && record.categorySlug === product.categorySlug,
  )
  const others = productRecords.filter(
    (record) => record.slug !== product.slug && record.categorySlug !== product.categorySlug,
  )
  return [...sameCategory, ...others].slice(0, limit).map((record) => viewProduct(record, locale))
}
