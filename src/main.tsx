import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryMonitor, preloadCriticalResources, logBundleInfo } from './utils/performance'
import { BrowserRouter } from 'react-router-dom'
import './chartConfig'
import App from './App'
import './index.css'

// Initialize performance monitoring
if (import.meta.env.DEV) {
  MemoryMonitor.start();
}

// Preload critical resources
preloadCriticalResources();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
)

// Log bundle information
logBundleInfo();