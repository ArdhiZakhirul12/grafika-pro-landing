import { createServer } from 'vite'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { createRouter, createMemoryHistory } from 'vue-router'

// Build-time smoke test only. The deployed website requires no server rendering.
const server = await createServer({ server: { middlewareMode: true, hmr: false, watch: null }, appType: 'custom' })
try {
  const App = (await server.ssrLoadModule('/src/App.vue')).default
  const pages = [ ['/', 'Home', 'Percetakan'], ['/fitur', 'Features', 'Semua berawal'], ['/cara-kerja', 'Workflow', 'Pembuatan nota'], ['/solusi', 'Solutions', 'Digital Printing'], ['/harga', 'Pricing', 'Rp18.250.000'], ['/faq', 'Faq', 'Apa itu Grafika Pro'], ['/kontak', 'Contact', 'Siapkan Pesan'], ['/tidak-ada', 'NotFound', 'salah jalur'] ]
  const routes = await Promise.all(pages.map(async ([path, file]) => ({ path, component: (await server.ssrLoadModule(`/src/views/${file}.vue`)).default })))
  for (const [path, , expected] of pages) {
    const router = createRouter({ history: createMemoryHistory(), routes })
    await router.push(path === '/kontak' ? '/kontak?paket=Skala' : path)
    await router.isReady()
    const html = await renderToString(createSSRApp(App).use(router))
    assert(html.includes(expected), `${path}: expected content missing`)
    assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `${path}: must have one h1`)
    for (const [,src] of html.matchAll(/(?:src|href)="(\/(?:images|fonts|downloads)\/[^"#?]+)"/g)) assert(existsSync(`public${src}`), `${path}: missing asset ${src}`)
    if (path === '/kontak') { assert(html.includes('value="Skala" selected'), 'Selected plan not preserved'); assert(!html.includes('https://wa.me/'), 'Empty contact must not link to WhatsApp') }
    console.log(`PASS ${path}: content, heading, assets`)
  }
  const { plans } = await server.ssrLoadModule('/src/data/pricing.ts')
  assert.deepEqual(plans.map(p => [p.annual, p.monthly, p.setup]), [[5000000,500000,5000000],[9750000,975000,8000000],[18250000,1825000,15000000],[26750000,2675000,22000000]])
  const { whatsappUrl, contact } = await server.ssrLoadModule('/src/data/site.ts')
  assert.equal(whatsappUrl(), '')
  contact.whatsapp = '6281234567890'
  assert.equal(new URL(whatsappUrl('Halo & demo?')).searchParams.get('text'), 'Halo & demo?')
  contact.whatsapp = ''
  assert(existsSync('public/.htaccess'))
  assert(existsSync('public/favicon.png'))
  console.log('PASS catalog pricing, WhatsApp configuration, cPanel fallback, favicon')
} finally { await server.close() }
