import { Box, FormControl, FormLabel, Input, NumberInput, Select, Button } from '@chakra-ui/react'
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
    <Box
      as="form"
      width="400px"
      margin="auto"
      mt={5}
      p={5}
      borderWidth={1}
      borderRadius="md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormControl mb={4}>
        <FormLabel>Name</FormLabel>
        <Input {...register('name')} placeholder="Product Name" />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Description</FormLabel>
        <Input {...register('description')} placeholder="Product Description" />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Price ($)</FormLabel>
        <NumberInput
          min={0}
          onChange={(valueAsString, valueAsNumber) => {
            setValue('price', valueAsNumber)
          }}
        >
          <Input {...register('price')} placeholder="Product Price" />
        </NumberInput>
      </FormControl>

      {!id && (
        <FormControl mb={4}>
          <FormLabel>Supplier</FormLabel>
          <Select {...register('supplier_id')} placeholder="Select">
            {suppliers?.map((supplier) => (
              <option value={supplier.id} key={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </Select>
        </FormControl>
      )}

      <Button type="submit" colorScheme="blue">
        Submit
      </Button>
    </Box>
  )
}

export default ProductAddEditPage
