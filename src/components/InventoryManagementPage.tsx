import React from 'react'
import { useQuery } from 'react-query'
import { getInventory } from '../services/routes/inventory'
import { Product, Inventory } from '../models'
import { getProducts } from '../services/routes'
import { useInventoryMutations } from '../hooks/useInventoryMutations'

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
      {productsData.map(
        (product) => product && <ProductInventory key={product.id} product={product} />
      )}
    </div>
  )
}

interface ProductInventoryProps {
  product: Product
}

const ProductInventory: React.FC<ProductInventoryProps> = ({ product }) => {
  const {
    data: inventoryData,
    error: inventoryError,
    isFetching
  } = useQuery<Inventory | null>(
    ['inventory', product.id],
    () =>
      getInventory(product.id!)
        .then((response) => response.data)
        .catch((error) => {
          if (error.response?.status === 404) {
            return null
          } else {
            throw error
          }
        }),
    {
      enabled: !!product.id,
      retry: 0,
      refetchOnWindowFocus: false,
      staleTime: Infinity
    }
  )

  const { createInventoryMutation, updateInventoryMutation, deleteInventoryMutation } =
    useInventoryMutations()

  const handleAddInventory = () => {
    createInventoryMutation.mutate({ product_id: product.id!, quantity: 0 })
  }

  const handleDeleteInventory = () => {
    if (inventoryData) {
      deleteInventoryMutation.mutate(inventoryData.id)
    }
  }

  const handleIncreaseQuantity = () => {
    if (inventoryData) {
      updateInventoryMutation.mutate({
        id: inventoryData.id,
        data: { quantity: inventoryData.quantity + 1 }
      })
    }
  }

  const handleDecreaseQuantity = () => {
    if (inventoryData) {
      updateInventoryMutation.mutate({
        id: inventoryData.id,
        data: { quantity: inventoryData.quantity - 1 }
      })
    }
  }

  if (inventoryError) {
    return <div>Error loading inventory for product {product.name}</div>
  }

  if (isFetching) {
    return <div>Loading inventory for product {product.name}...</div>
  }

  return (
    <div>
      <h2>{product.name}</h2>
      {inventoryData ? (
        <>
          <p>Current Quantity: {inventoryData.quantity}</p>
          <button onClick={handleIncreaseQuantity}>Increase Quantity</button>
          <button onClick={handleDecreaseQuantity} disabled={inventoryData.quantity <= 0}>
            Decrease Quantity
          </button>
          <button onClick={handleDeleteInventory}>Delete Inventory</button>
        </>
      ) : (
        <>
          <p>No inventory record</p>
          <button onClick={handleAddInventory}>Add Inventory</button>
        </>
      )}
    </div>
  )
}

export default InventoryManagementPage
