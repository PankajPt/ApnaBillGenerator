import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './pages/Home.jsx'
import FuelBillPage from './pages/FuelBillPage.jsx'
import { AboutPage } from './pages/About.jsx'
import { ContactPage } from './pages/Contact.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'));

const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
document.documentElement.classList.add(savedTheme);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='fuel-bill' element={<FuelBillPage />} />
      <Route path='about' element={<AboutPage />} />
      <Route path='contact' element={<ContactPage />} />
    </Route>
  )
)

root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)