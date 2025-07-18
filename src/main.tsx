// This would be a proper main.tsx for Biowell AI
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import './index.css'

// Performance monitoring
const MemoryMonitor = {
  init() {
    if ('memory' in performance) {
      setInterval(() => {
        const memory = (performance as any).memory
        if (memory.usedJSHeapSize / memory.totalJSHeapSize > 0.9) {
          console.warn('High memory usage detected')
        }
      }, 10000)
    }
  }
}

// Preload critical resources
const preloadCriticalResources = () => {
  // Preload critical fonts
  const fonts = [
    '/fonts/Inter-Variable.woff2',
  ]
  
  fonts.forEach(font => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'font'
    link.type = 'font/woff2'
    link.href = font
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
  })

  // Preload critical images
  const images = [
    '/logo.svg',
    '/hero-bg.webp'
  ]
  
  images.forEach(image => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = image
    document.head.appendChild(link)
  })
}

// Initialize performance optimizations
preloadCriticalResources()
MemoryMonitor.init()

// Enable React concurrent features
const root = ReactDOM.createRoot(document.getElementById('root')!, {
  unstable_enableAsyncRendering: true
})

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)

// Register service worker for PWA
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
  })
}

// Web Vitals reporting
if (import.meta.env.PROD) {
  import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
    onCLS(console.log)
    onFID(console.log)
    onFCP(console.log)
    onLCP(console.log)
    onTTFB(console.log)
  })
}