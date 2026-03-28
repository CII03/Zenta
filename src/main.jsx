import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ZentaLanding from './ZentaLanding.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ZentaLanding />
  </StrictMode>,
)
