import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Assurez-vous que l'élément 'root' existe dans le DOM
const rootElement = document.getElementById('root')

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
} else {
  console.error("L'élément 'root' n'a pas été trouvé dans le DOM. Vérifiez votre HTML.")
}
