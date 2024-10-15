import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import HomePage from './pages/home/home.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HomePage />
  </StrictMode>,
)
