import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { APP_ROUTER } from './routes/routes'
import 'swiper/css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={APP_ROUTER} />
  </StrictMode>,
)
