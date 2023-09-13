import { Link, useNavigate, Outlet } from 'react-router-dom'
import {
  Box,
  VStack,
  HStack,
  Button,
  Text,
  Heading,
  Container,
  Flex,
  Spacer
} from '@chakra-ui/react'

import { useGetProducts } from '../hooks/useGetProducts'
import { useDeleteProduct } from '../hooks/useProductMutations'

const ProductPage = () => {
  const { data: products, error, isLoading } = useGetProducts()
  const { mutateAsync: deleteProduct } = useDeleteProduct()

  const navigate = useNavigate()

  const handleEdit = (id: string) => {
    navigate(`edit/${id}`)
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id)
    } catch (error) {
      console.log('error:', error)
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading products</div>

  return (
    <Container bg="gray.800" p={5} borderRadius="md" boxShadow="xl">
      <Flex mb={5} as="nav" ml="-1.5">
        <Link to="add">
          <Button bg="purple.700" color="white" mr={2}>
            Add New Product
          </Button>
        </Link>
        <Link to="/suppliers">
          <Button bg="purple.700" color="white" mr={2}>
            Manage Suppliers
          </Button>
        </Link>
        <Link to="/inventory">
          <Button bg="purple.700" color="white">
            Handle Inventory
          </Button>
        </Link>
        <Spacer />
      </Flex>

      <VStack spacing={5} align="stretch" mb={5}>
        {products?.map((product) => (
          <Box
            key={product.id}
            p={5}
            bg="gray.700"
            borderRadius="md"
            boxShadow="lg"
            borderWidth="2px"
            borderColor="purple.600"
          >
            <Heading fontSize="2xl" fontWeight="bold" color="white">
              {product.name}
            </Heading>
            <Text mt={4} fontSize="lg" color="gray.200">
              {product.description}
            </Text>
            <Text mt={4} fontSize="xl" color="white">
              {product.price} $
            </Text>
            <HStack mt={4}>
              <Button bg="purple.700" color="white" onClick={() => handleEdit(product.id!)}>
                Edit
              </Button>
              <Button bg="purple.700" color="white" onClick={() => handleDelete(product.id!)}>
                Delete
              </Button>
            </HStack>
          </Box>
        ))}
      </VStack>

      <Outlet />
    </Container>
  )
}

export default ProductPage
