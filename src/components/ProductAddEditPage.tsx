import {
  Box,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  Select,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'
import { useParams, useNavigate } from 'react-router-dom'
import { useUpdateProduct, useCreateProduct } from '../hooks/useProductMutations'
import { useGetSuppliers } from '../hooks/useGetSuppliers'
import useFormState from '../hooks/useFormState'

interface FormData {
  name: string
  description: string
  price: number
  supplier_id: string
}

const ProductAddEditPage = () => {
  const { isOpen, onClose } = useDisclosure({ isOpen: true })
  const { id } = useParams()
  const navigate = useNavigate()

  const { data: suppliers, error: suppliersError, isLoading: suppliersLoading } = useGetSuppliers()
  const { register, handleSubmit, setValue, error, isLoading } = useFormState(id)

  const updateProduct = useUpdateProduct()
  const createProduct = useCreateProduct()

  const onSubmit = async (data: FormData) => {
    try {
      if (id) {
        await updateProduct.mutateAsync({ id, data })
      } else {
        await createProduct.mutateAsync(data)
      }
      navigate('/products')
    } catch (error) {
      console.log('error:', error)
    }
  }

  if (isLoading || suppliersLoading) return <div>Loading...</div>
  if (error || suppliersError) return <div>Error loading data</div>

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg="gray.800" color="white" marginTop="200px">
        <ModalHeader>{id ? 'Edit Product' : 'Add Product'}</ModalHeader>
        <ModalCloseButton onClick={() => navigate('/products')} />
        <Box
          as="form"
          width="400px"
          margin="auto"
          mt={5}
          p={5}
          bg="gray.800"
          borderRadius="md"
          boxShadow="lg"
          color="white"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormControl mb={4}>
            <FormLabel>Name</FormLabel>
            <Input
              {...register('name')}
              placeholder="Product Name"
              bgColor="gray.700"
              color="white"
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Description</FormLabel>
            <Input
              {...register('description')}
              placeholder="Product Description"
              bgColor="gray.700"
              color="white"
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Price ($)</FormLabel>
            <NumberInput
              min={0}
              onChange={(valueAsString, valueAsNumber) => {
                setValue('price', valueAsNumber)
              }}
              bgColor="gray.700"
              color="white"
            >
              <Input {...register('price')} placeholder="Product Price" />
            </NumberInput>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Supplier</FormLabel>
            <Select
              {...register('supplier_id')}
              placeholder="Select supplier"
              bgColor="gray.700"
              color="white"
            >
              {suppliers?.map((supplier) => (
                <option
                  value={supplier.id}
                  key={supplier.id}
                  style={{ backgroundColor: '#2D3748', color: 'white' }}
                >
                  {supplier.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <Button type="submit" mt={4} bgColor="purple.600" color="white">
            {id ? 'Update Product' : 'Add Product'}
          </Button>
        </Box>
      </ModalContent>
    </Modal>
  )
}

export default ProductAddEditPage
