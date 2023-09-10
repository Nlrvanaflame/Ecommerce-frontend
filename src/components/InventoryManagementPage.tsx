import React from 'react'
import { useQuery } from 'react-query'
import { getInventory } from '../services/routes/inventory'

import { Product, Inventory } from '../models'
import { getProducts } from '../services/routes'

const InventoryManagementPage: React.FC = () => {
  const { data: productsData, error: productsError } = useQuery<Product[]>('products', () =>
    getProducts().then((res) => res.data)
  )

  if (productsError) {
    return <div>Error loading products</div>
  }

  if (!productsData) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Inventory Management</h1>
      {(productsData as Product[]).map(
        (product) => product && <ProductInventory key={product.id} product={product} />
      )}
    </div>
  )
}

interface ProductInventoryProps {
  product: Product
}

const ProductInventory: React.FC<ProductInventoryProps> = ({ product }) => {
  const { data: inventoryData, error: inventoryError } = useQuery<Inventory>(
    ['inventory', product.id],
    () => getInventory(product.id!).then((response) => response.data),
    {
      enabled: !!product.id
    }
  )

  if (inventoryError) {
    return <div>Error loading inventory for product {product.name}</div>
  }

  if (!inventoryData) {
    return <div>Loading inventory for product {product.name}...</div>
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <p>Current Quantity: {inventoryData.quantity}</p>
    </div>
  )
}

export default InventoryManagementPage
