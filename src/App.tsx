import React from 'react'
import { createBrowserRouter, RouterProvider, Outlet, RouteObject } from 'react-router-dom'
import ProductPage from './components/ProductPage'
import ProductAddEditPage from './components/ProductAddEditPage'
import SupplierManagementPage from './components/SupplierManagementPage'
import InventoryManagementPage from './components/InventoryManagementPage'
import Navigation from './components/Navigation'

function App() {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: (
        <div>
          <h1>E-Commerce</h1>
          <Navigation />
          <hr />
          <Outlet />
        </div>
      ),
      children: [
        {
          path: 'products',
          element: <ProductPage />,
          children: [
            { path: 'add', element: <ProductAddEditPage /> },
            { path: 'edit/:id', element: <ProductAddEditPage /> }
          ]
        },
        {
          path: 'suppliers',
          element: <SupplierManagementPage />
        },
        {
          path: 'inventory',
          element: <InventoryManagementPage />
        }
      ]
    }
  ]

  const router = createBrowserRouter(routes)

  return <RouterProvider router={router} />
}

export default App
