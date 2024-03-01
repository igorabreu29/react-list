import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { ListContextProvider } from './context/list-context.tsx'

import { RouterProvider } from 'react-router-dom'
import { router } from './router.tsx'
import { ThemeContextProvider } from './context/theme-context.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ListContextProvider>
      <ThemeContextProvider>
        <RouterProvider router={router} />
      </ThemeContextProvider>
    </ListContextProvider>
  </React.StrictMode>,
)
