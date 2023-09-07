import { Link, useNavigate, Outlet } from 'react-router-dom'

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
    <div>
      <nav>
        <Link to="add">Add New Product |</Link>
        <Link to="/suppliers">Manage Suppliers |</Link>
        <Link to="/inventory">Handle Inventory |</Link>
      </nav>

      <div>
        {products?.map((product) => (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>{product.price} $ </p>
            <button onClick={() => handleEdit(product.id!)}>Edit</button>
            <button onClick={() => handleDelete(product.id!)}>Delete</button>
          </div>
        ))}
      </div>

      <Outlet />
    </div>
  )
}

export default ProductPage
