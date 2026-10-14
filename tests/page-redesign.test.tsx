import assert from 'node:assert/strict'
import test from 'node:test'
import { renderToStaticMarkup } from 'react-dom/server'

import ApplicationsPage from '@/app/applications/page'
import CapabilitiesPage from '@/app/capabilities/page'

test('applications presents six icon-led application cards', async () => {
  const html = renderToStaticMarkup(await ApplicationsPage())

  assert.equal((html.match(/data-application-card=/g) ?? []).length, 6)
  assert.equal((html.match(/data-application-icon=/g) ?? []).length, 6)
  assert.match(html, /Typical checks/)
})

test('capabilities pairs workshop evidence with a five-stage process', async () => {
  const html = renderToStaticMarkup(await CapabilitiesPage())

  assert.equal((html.match(/data-capability-panel=/g) ?? []).length, 3)
  assert.equal((html.match(/data-process-step=/g) ?? []).length, 5)
  assert.match(html, /inspection-room\.jpg/)
  assert.match(html, /data-capability-graphic="assembly"/)
})
