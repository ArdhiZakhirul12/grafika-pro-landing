export const contact = { whatsapp: '', email: '', domain: '' }
export const catalogUrl = '/downloads/katalog-grafika-pro-2026.pdf'
export const navigation = [
  { path: '/', label: 'Beranda' }, { path: '/fitur', label: 'Fitur' },
  { path: '/cara-kerja', label: 'Cara Kerja' }, { path: '/solusi', label: 'Solusi' },
  { path: '/harga', label: 'Harga' }, { path: '/faq', label: 'FAQ' },
]
export function whatsappUrl(message = 'Halo Grafika Pro, saya ingin mengetahui lebih lanjut dan menjadwalkan demo aplikasi Grafika Pro.') {
  return /^\d{10,15}$/.test(contact.whatsapp) ? `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}` : ''
}
