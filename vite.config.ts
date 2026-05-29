import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap'

export default defineConfig({
  plugins: [
    react(),
    Sitemap({
      hostname: 'https://websolsoffttech.in',
      dynamicRoutes: [
        '/',
        '/about',
        '/services',
        '/portfolio',
        '/contact',
        '/faq',
        '/privacy-policy',
        '/terms-of-service',
        '/refund-policy'
      ]
    })
  ],
})