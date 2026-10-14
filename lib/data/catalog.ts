import { defaultLocale, type Locale } from '@/lib/locale'
import { getSupabaseClient, getTenantId, localized } from '@/lib/supabase'

export interface ProductImage { src: string; alt: string; stageScale: number }
export interface ProductCategory { slug: string; order: number; name: string; summary: string; measures: string; chooseWhen: string; image: ProductImage }
export interface ProductSpec { label: string; value: string }
export interface Product { slug: string; categorySlug: string; name: string; summary: string; description: string; measurementTasks: string[]; applicationSlugs: string[]; specs: ProductSpec[]; image: ProductImage; featured: boolean; sku: string; moq: string }

type JsonRecord = Record<string, unknown>

function localizedStringArray(value: unknown, locale: Locale): string[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return []
  const record = value as JsonRecord
  const selected = record[locale] ?? record[defaultLocale]
  return Array.isArray(selected) ? selected.filter((item): item is string => typeof item === 'string') : []
}

function stringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : []
}

function productImage(src: unknown, alt: string): ProductImage {
  return { src: typeof src === 'string' ? src : '', alt, stageScale: 1 }
}

export async function getCategories(locale: Locale = defaultLocale): Promise<ProductCategory[]> {
  const db = getSupabaseClient()
  const tenantId = getTenantId()
  if (!db || !tenantId) return []

  const [{ data: categories, error }, { data: products }] = await Promise.all([
    db.from('product_categories').select('slug,name,name_i18n,description,description_i18n,sort_order,extra_data').eq('tenant_id', tenantId).eq('is_active', true).order('sort_order'),
    db.from('products').select('category_slug,image_url,sort_order').eq('tenant_id', tenantId).eq('is_active', true).order('sort_order'),
  ])
  if (error || !categories) return []

  const firstImageByCategory = new Map<string, string>()
  for (const product of products ?? []) {
    if (product.category_slug && product.image_url && !firstImageByCategory.has(product.category_slug)) {
      firstImageByCategory.set(product.category_slug, product.image_url)
    }
  }

  return categories.map((row, index) => {
    const name = localized(row.name_i18n, locale, row.name)
    const extra = row.extra_data && typeof row.extra_data === 'object' ? (row.extra_data as JsonRecord) : {}
    const configuredImage = typeof extra.image_url === 'string' ? extra.image_url : undefined
    return {
      slug: row.slug,
      order: row.sort_order ?? index + 1,
      name,
      summary: localized(row.description_i18n, locale, row.description ?? ''),
      measures: typeof extra.measures === 'string' ? extra.measures : '',
      chooseWhen: typeof extra.choose_when === 'string' ? extra.choose_when : '',
      image: productImage(configuredImage ?? firstImageByCategory.get(row.slug), name),
    }
  })
}

export async function getCategory(slug: string, locale: Locale = defaultLocale): Promise<ProductCategory | null> {
  return (await getCategories(locale)).find((item) => item.slug === slug) ?? null
}

export async function getProducts(options: { categorySlug?: string; applicationSlug?: string; locale?: Locale } = {}): Promise<Product[]> {
  const { categorySlug, applicationSlug, locale = defaultLocale } = options
  const db = getSupabaseClient()
  const tenantId = getTenantId()
  if (!db || !tenantId) return []

  let query = db.from('products').select('slug,category_slug,name,name_i18n,description,description_i18n,overview_i18n,features_i18n,applications_i18n,specs,image_url,extra_data,sort_order').eq('tenant_id', tenantId).eq('is_active', true).order('sort_order')
  if (categorySlug) query = query.eq('category_slug', categorySlug)
  const { data, error } = await query
  if (error || !data) return []

  const products = data.map((row, index) => {
    const name = localized(row.name_i18n, locale, row.name)
    const extra = row.extra_data && typeof row.extra_data === 'object' ? (row.extra_data as JsonRecord) : {}
    const applicationSlugs = stringArray(extra.application_slugs)
    return {
      slug: row.slug,
      categorySlug: row.category_slug,
      name,
      summary: localized(row.description_i18n, locale, row.description ?? ''),
      description: localized(row.overview_i18n, locale, localized(row.description_i18n, locale, row.description ?? '')),
      measurementTasks: localizedStringArray(row.applications_i18n, locale),
      applicationSlugs,
      specs: row.specs && typeof row.specs === 'object' && !Array.isArray(row.specs) ? Object.entries(row.specs as JsonRecord).map(([label, value]) => ({ label, value: String(value) })) : [],
      image: productImage(row.image_url, name),
      featured: typeof extra.featured === 'boolean' ? extra.featured : index < 6,
      sku: typeof extra.sku === 'string' ? extra.sku : '',
      moq: typeof extra.moq === 'string' ? extra.moq : '',
    }
  })
  return applicationSlug ? products.filter((product) => product.applicationSlugs.includes(applicationSlug)) : products
}

export async function getProduct(slug: string, locale: Locale = defaultLocale): Promise<Product | null> {
  return (await getProducts({ locale })).find((item) => item.slug === slug) ?? null
}

export async function getFeaturedProducts(locale: Locale = defaultLocale): Promise<Product[]> {
  return (await getProducts({ locale })).filter((product) => product.featured)
}

export async function getRelatedProducts(product: Pick<Product, 'slug' | 'categorySlug'>, locale: Locale = defaultLocale, limit = 3): Promise<Product[]> {
  const products = (await getProducts({ locale })).filter((candidate) => candidate.slug !== product.slug)
  const sameCategory = products.filter((candidate) => candidate.categorySlug === product.categorySlug)
  const others = products.filter((candidate) => candidate.categorySlug !== product.categorySlug)
  return [...sameCategory, ...others].slice(0, limit)
}
