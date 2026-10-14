import assert from 'node:assert/strict'
import test from 'node:test'
import { renderToStaticMarkup } from 'react-dom/server'

import { SiteFooter } from '@/components/site/site-footer'

test('English footer shows only the English legal company name', async () => {
  const html = renderToStaticMarkup(await SiteFooter())

  assert.match(html, /Wuxi Luoqi Measuring Instruments Co\., Ltd\./)
  assert.doesNotMatch(html, /无锡市洛奇量仪有限公司/)
})
