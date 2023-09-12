import { Box, Button, VStack, HStack, Text } from '@chakra-ui/react'
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
    <Box bg="gray.800" p={5} color="gray.100" borderRadius="md">
      <Text fontSize="2xl" fontWeight="bold">
        Inventory Management
      </Text>
      <VStack spacing={5} align="start">
        {productsData.map(
          (product) => product && <ProductInventory key={product.id} product={product} />
        )}
      </VStack>
    </Box>
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
    <Box bg="gray.700" p={5} borderRadius="md" boxShadow="sm">
      <Text fontSize="xl" fontWeight="bold">
        {product.name}
      </Text>
      {inventoryData ? (
        <HStack spacing={5} my={4}>
          <Text>Current Quantity: {inventoryData.quantity}</Text>
          <Button onClick={handleIncreaseQuantity} bg="purple.700" color="white">
            Increase Quantity
          </Button>
          <Button
            onClick={handleDecreaseQuantity}
            disabled={inventoryData.quantity <= 0}
            bg="purple.700"
            color="white"
          >
            Decrease Quantity
          </Button>
          <Button onClick={handleDeleteInventory} bg="purple.700" color="white">
            Delete Inventory
          </Button>
        </HStack>
      ) : (
        <HStack spacing={5} my={4}>
          <Text>No inventory record</Text>
          <Button onClick={handleAddInventory} bg="purple.700" color="white">
            Add Inventory
          </Button>
        </HStack>
      )}
    </Box>
  )
}

export default InventoryManagementPage
