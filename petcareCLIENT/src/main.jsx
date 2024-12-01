import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import AdminPets from './pages/AdminPets/adminPets'
import NotFound from './pages/NotFound/NotFound'
import Register from './pages/Login/Register'

// route handler entry point
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/adminPets',
    element: <AdminPets />
  },
  {
    path: '*',
    element: <NotFound/>
  },
  {
    path: '/Register',
    element: <Register/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
