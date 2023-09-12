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
import { useTheme } from '@chakra-ui/react'

import { useGetProducts } from '../hooks/useGetProducts'
import { useDeleteProduct } from '../hooks/useProductMutations'

const ProductPage = () => {
  const theme = useTheme()
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
    <Container bg="gray.500" borderWidth="3px" borderColor="black">
      <Flex mb={5} as="nav" ml="-1.5">
        <Link to="add">
          <Button bg="purple.600" color="yellow.600" mr={2}>
            Add New Product
          </Button>
        </Link>
        <Link to="/suppliers">
          <Button bg="purple.600" color="yellow.600" mr={2}>
            Manage Suppliers
          </Button>
        </Link>
        <Link to="/inventory">
          <Button bg="purple.600" color="yellow.600">
            Handle Inventory
          </Button>
        </Link>
        <Spacer />
      </Flex>

      <VStack spacing={5} align="stretch" mb={5}>
        {products?.map((product) => (
          <Box key={product.id} p={5} shadow="md" borderWidth="3px" borderColor="black">
            <Heading fontSize="3xl" fontWeight="bold" color="black" textShadow="1px 1px 2px purple">
              {product.name}
            </Heading>
            <Text mt={4} fontSize="lg" lineHeight="1.6" color="gray.700">
              {product.description}
            </Text>
            <Text mt={4} fontSize="xl" fontWeight="medium" color="black">
              {product.price} $
            </Text>
            <HStack mt={4}>
              <Button colorScheme="blue" onClick={() => handleEdit(product.id!)}>
                Edit
              </Button>
              <Button colorScheme="red" onClick={() => handleDelete(product.id!)}>
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
