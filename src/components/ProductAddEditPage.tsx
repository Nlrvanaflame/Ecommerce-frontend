import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useGetProduct } from '../hooks/useGetProducts'
import { useUpdateProduct, useCreateProduct } from '../hooks/useProductMutations'
import { useGetSuppliers } from '../hooks/useGetSuppliers'

interface FormData {
  name: string
  description: string
  price: number
  supplier_id: string
}

const ProductAddEditPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data: product, error, isLoading } = useGetProduct(id || '')
  const { data: suppliers, error: suppliersError, isLoading: suppliersLoading } = useGetSuppliers()

  const updateProduct = useUpdateProduct()
  const createProduct = useCreateProduct()

  const { register, handleSubmit, setValue } = useForm<FormData>()

  useEffect(() => {
    if (product) {
      setValue('name', product.name)
      setValue('description', product.description)
      setValue('price', product.price)
    }
  }, [product, setValue])

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>
          Name:
          <input {...register('name')} />
        </label>
      </div>
      <div>
        <label>
          Description:
          <input {...register('description')} />
        </label>
      </div>
      <div>
        <label>
          Price ($):
          <input {...register('price')} type="number" />
        </label>
      </div>
      {!id && (
        <div>
          <label>
            Supplier:
            <select {...register('supplier_id')} defaultValue="">
              <option value="" disabled>
                Select
              </option>
              {suppliers?.map((supplier) => (
                <option value={supplier.id} key={supplier.id}>
                  {supplier.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  )
}

export default ProductAddEditPage
