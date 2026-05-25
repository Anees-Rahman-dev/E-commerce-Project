import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { store } from './redux/store.js'
import { Toaster } from "react-hot-toast"
import { ReactLenis } from 'lenis/react'
const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient} >
      <Provider store={store} >
        <BrowserRouter >
          <Toaster />
          <ReactLenis root options={{ lerp: 0.08, duration: 1.2 }}>
            <App />
          </ReactLenis>
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
)
