import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const source = await readFile(new URL('../lib/data/catalog.ts', import.meta.url), 'utf8')
const homePageSource = await readFile(new URL('../app/page.tsx', import.meta.url), 'utf8')
const productImageSource = await readFile(new URL('../components/site/product-image.tsx', import.meta.url), 'utf8')
const productDetailSource = await readFile(new URL('../app/products/[slug]/page.tsx', import.meta.url), 'utf8')

test('catalog has no static sample fallback on formal product and category reads', () => {
  assert.doesNotMatch(source, /return\s+categoryRecords\b/)
  assert.doesNotMatch(source, /return\s+productRecords\b/)
})

test('related products are resolved from the backend catalog', () => {
  const relatedProductsBody = source.slice(source.indexOf('export async function getRelatedProducts'))
  assert.doesNotMatch(relatedProductsBody, /productRecords/)
  assert.match(relatedProductsBody, /await getProducts/)
})

test('homepage product placement revalidates backend content', () => {
  assert.match(homePageSource, /export const revalidate\s*=\s*60/)
})

test('products without customer imagery render a neutral non-image state', () => {
  assert.match(productImageSource, /image\.src\s*\?/)
  assert.match(productImageSource, /Image pending/)
})

test('product detail publishes supplied SKU and MOQ fields', () => {
  assert.match(productDetailSource, /Product code/)
  assert.match(productDetailSource, /Minimum order quantity/)
  assert.match(productDetailSource, /p\.sku/)
  assert.match(productDetailSource, /p\.moq/)
})
