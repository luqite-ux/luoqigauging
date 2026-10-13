export const locales = ['en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

/** A value that has one entry per supported locale. Add a locale to `locales` and fill each record. */
export type Localized<T> = Record<Locale, T>

export function pick<T>(value: Localized<T>, locale: Locale = defaultLocale): T {
  return value[locale] ?? value[defaultLocale]
}
