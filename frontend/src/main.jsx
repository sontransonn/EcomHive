import React from 'react'
import './index.css'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'

import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster toastOptions={{
        position: 'top-right',
        style: {
          background: 'white',
          color: 'black'
        }
      }} />
    </BrowserRouter>
  </React.StrictMode>,
)
