import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let client: SupabaseClient | null | undefined

export function getSupabaseClient() {
  if (client !== undefined) return client
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()
  client = url && key ? createClient(url, key, { auth: { persistSession: false } }) : null
  return client
}

export function getTenantId() {
  return process.env.NEXT_PUBLIC_TENANT_ID?.trim() || null
}

export function localized(value: unknown, locale: string, fallback = ''): string {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return fallback
  const map = value as Record<string, unknown>
  const candidate = map[locale] ?? map.en ?? Object.values(map).find((entry) => typeof entry === 'string' && entry.trim())
  return typeof candidate === 'string' ? candidate : fallback
}
