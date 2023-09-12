import { Box, Button, Input, VStack, HStack, Text } from '@chakra-ui/react'

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
    <Box bg="gray.800" p={5} color="gray.100" borderRadius="md">
      <Text fontSize="2xl" fontWeight="bold">
        Supplier Management
      </Text>
      <HStack spacing={4} my={5}>
        <Input
          type="text"
          value={newSupplier.name}
          onChange={(e) => handleChange(e, 'name')}
          placeholder="New Supplier Name"
          bgColor="gray.700"
          color="white"
          maxWidth="200px"
        />
        <Input
          type="text"
          value={newSupplier.contact_info}
          onChange={(e) => handleChange(e, 'contact_info')}
          placeholder="Contact Info"
          bgColor="gray.700"
          color="white"
          maxWidth="200px"
        />
        <Input
          type="text"
          value={newSupplier.location}
          onChange={(e) => handleChange(e, 'location')}
          placeholder="Location"
          bgColor="gray.700"
          color="white"
          maxWidth="200px"
        />
        <Button onClick={handleAddSupplier} bg="purple.700" color="white" px={5}>
          Add Supplier
        </Button>
      </HStack>

      <VStack spacing={4} align="start">
        {suppliers?.map((supplier) => (
          <HStack key={supplier.id} spacing={4} w="full" bg="gray.700" p={4} borderRadius="md">
            <Text flex={1}>{supplier.name}</Text>
            <Text flex={1}>{supplier.contact_info}</Text>
            <Text flex={1}>{supplier.location}</Text>
            <Button onClick={() => handleDeleteSupplier(supplier.id)} colorScheme="red">
              Delete
            </Button>
          </HStack>
        ))}
      </VStack>
    </Box>
  )
}

export default SupplierManagementPage
