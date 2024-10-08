import React, { lazy, Suspense } from 'react'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

const App = lazy(() => import('./App'))

import store from './redux/store'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <Suspense fallback="loading...">
        <App />
      </Suspense>
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>,
)
