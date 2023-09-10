import React, { useState } from 'react'
import { useGetSuppliers } from '../hooks/useGetSuppliers'
import { useCreateSupplier, useDeleteSupplier } from '../hooks/useSupplierMutations'

const SupplierManagementPage = () => {
  const { data: suppliers, error, isLoading } = useGetSuppliers()
  const createSupplier = useCreateSupplier()
  const deleteSupplier = useDeleteSupplier()

  const [newSupplier, setNewSupplier] = useState({
    name: '',
    contact_info: '',
    location: ''
  })

  const handleAddSupplier = () => {
    createSupplier.mutate(newSupplier)
    setNewSupplier({ name: '', contact_info: '', location: '' }) // reset the input fields
  }

  const handleDeleteSupplier = (id: string) => {
    deleteSupplier.mutate(id)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setNewSupplier({ ...newSupplier, [field]: e.target.value })
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading data</div>

  return (
    <div>
      <h1>Supplier Management</h1>
      <div>
        <input
          type="text"
          value={newSupplier.name}
          onChange={(e) => handleChange(e, 'name')}
          placeholder="New Supplier Name"
        />
        <input
          type="text"
          value={newSupplier.contact_info}
          onChange={(e) => handleChange(e, 'contact_info')}
          placeholder="Contact Info"
        />
        <input
          type="text"
          value={newSupplier.location}
          onChange={(e) => handleChange(e, 'location')}
          placeholder="Location"
        />
        <button onClick={handleAddSupplier}>Add Supplier</button>
      </div>

      <ul>
        {suppliers?.map((supplier) => (
          <li key={supplier.id}>
            {supplier.name} - {supplier.contact_info} - {supplier.location}
            <button onClick={() => handleDeleteSupplier(supplier.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SupplierManagementPage
