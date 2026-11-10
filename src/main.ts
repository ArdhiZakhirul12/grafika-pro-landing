import { createApp, type Directive } from 'vue'
import App from './App.vue'
import { router } from './router'
import './styles/global.css'

// v-reveal: elemen muncul halus saat masuk layar. Nilai opsional = jeda dalam milidetik.
const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue
    entry.target.classList.add('is-visible')
    observer?.unobserve(entry.target)
  }
}, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' })
const reveal: Directive<HTMLElement, number | undefined> = {
  mounted(el, binding) {
    if (!observer) return
    el.classList.add('reveal')
    if (binding.value) el.style.setProperty('--reveal-delay', `${binding.value}ms`)
    observer.observe(el)
  },
  unmounted(el) { observer?.unobserve(el) },
}

createApp(App).use(router).directive('reveal', reveal).mount('#app')
