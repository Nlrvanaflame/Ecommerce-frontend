import { useState } from 'react'
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
  Spacer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter
} from '@chakra-ui/react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { useGetProducts } from '../hooks/useGetProducts'
import { useDeleteProduct } from '../hooks/useProductMutations'

const ProductPage = () => {
  const { data: products, error, isLoading } = useGetProducts()
  const { mutateAsync: deleteProduct } = useDeleteProduct()
  const [isModalOpen, setModalOpen] = useState(false)
  const [currentProductId, setCurrentProductId] = useState<string | null>(null)

  const navigate = useNavigate()

  const handleEdit = (id: string) => {
    navigate(`edit/${id}`)
  }

  const handleDelete = (id: string) => {
    setCurrentProductId(id)
    setModalOpen(true)
  }

  const confirmDelete = async () => {
    if (currentProductId) {
      try {
        await deleteProduct(currentProductId)
      } catch (error) {
        console.log('error:', error)
      }
    }

    setModalOpen(false)
    setCurrentProductId(null)
  }

  const chartData = products?.map((product) => ({
    name: product.name,
    price: product.price
  }))

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading products</div>

  return (
    <Flex direction="column" h="100vh" bg="gray.800" p={5}>
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

      <Flex flexGrow={1} justifyContent="space-between">
        <Box
          width="30%"
          height="75vh"
          bg="gray.700"
          borderRadius="md"
          boxShadow="xl"
          borderWidth="2px"
          borderColor="purple.600"
          p={5}
          m={3}
          overflowY="auto"
        >
          <VStack spacing={5} align="stretch">
            {products?.map((product) => (
              <Box
                key={product.id}
                p={5}
                bg="gray.700"
                borderRadius="md"
                boxShadow="lg"
                borderWidth="2px"
                borderColor="purple.600"
                width="60%"
                mx="auto"
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
        </Box>

        <Box
          width="35%"
          height="35vh"
          bg="gray.700"
          borderRadius="md"
          boxShadow="xl"
          borderWidth="2px"
          borderColor="purple.600"
          p={5}
          m={3}
        >
          {chartData && (
            <BarChart width={550} height={300} data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip contentStyle={{ backgroundColor: 'black', color: 'purple' }} />
              <Bar dataKey="price" fill="#8884d8" />
            </BarChart>
          )}
        </Box>
      </Flex>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <ModalOverlay />
        <ModalContent bg="gray.700">
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>This will permanently delete the item! Are you sure about that?</ModalBody>
          <ModalFooter>
            <Button color="black" bgColor="white" mr={2} onClick={confirmDelete}>
              Yes
            </Button>
            <Button color="white" bgColor="purple.600" onClick={() => setModalOpen(false)}>
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Outlet />
    </Flex>
  )
}

export default ProductPage
