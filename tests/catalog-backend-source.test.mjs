import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const source = await readFile(new URL('../lib/data/catalog.ts', import.meta.url), 'utf8')

test('catalog has no static sample fallback on formal product and category reads', () => {
  assert.doesNotMatch(source, /return\s+categoryRecords\b/)
  assert.doesNotMatch(source, /return\s+productRecords\b/)
})

test('related products are resolved from the backend catalog', () => {
  const relatedProductsBody = source.slice(source.indexOf('export async function getRelatedProducts'))
  assert.doesNotMatch(relatedProductsBody, /productRecords/)
  assert.match(relatedProductsBody, /await getProducts/)
})
