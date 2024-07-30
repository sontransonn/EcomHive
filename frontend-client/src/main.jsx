import React from 'react'
import './index.css'
import 'react-multi-carousel/lib/styles.css'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'

import App from './App.jsx'

import store from './redux/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <Toaster toastOptions={{
          position: 'top-right',
          style: {
            background: 'white',
            color: 'black'
          }
        }} />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)