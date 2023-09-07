import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGetProduct } from '../hooks/useGetProducts'
import { useUpdateProduct, useCreateProduct } from '../hooks/useProductMutations'
import { useGetSuppliers } from '../hooks/useGetSuppliers'

const ProductAddEditPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data: product, error, isLoading } = useGetProduct(id || '')
  const { data: suppliers, error: suppliersError, isLoading: suppliersLoading } = useGetSuppliers()

  const updateProduct = useUpdateProduct()
  const createProduct = useCreateProduct()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    supplier_id: suppliers ? suppliers[0]?.id : ''
  })

  useEffect(() => {
    if (product) {
      setFormData((prevState) => ({
        ...prevState,
        name: product.name,
        description: product.description,
        price: product.price
      }))
    }
  }, [product])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const dataWithCorrectedPrice = {
      ...formData,
      price: Number(formData.price)
    }

    try {
      if (id) {
        await updateProduct.mutateAsync({
          id,
          data: dataWithCorrectedPrice
        })
      } else {
        await createProduct.mutateAsync(dataWithCorrectedPrice)
      }
      navigate('/products')
    } catch (error) {
      console.log('error:', error)
    }
  }

  if (isLoading || suppliersLoading) return <div>Loading...</div>
  if (error || suppliersError) return <div>Error loading data</div>

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Price ($):
          <input type="number" name="price" value={formData.price} onChange={handleChange} />
        </label>
      </div>

      {/* Conditionally render supplier dropdown when adding a new product */}
      {!id && (
        <div>
          <label>
            Supplier:
            <select name="supplier_id" onChange={handleChange}>
              <option value="">Select Supplier</option>
              {suppliers?.map((supplier) => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}

      <button type="submit">{id ? 'Save Changes' : 'Add Product'}</button>
    </form>
  )
}

export default ProductAddEditPage
