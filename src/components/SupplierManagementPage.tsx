// import { Box, Button, Input, VStack, HStack, Text } from '@chakra-ui/react'

// import React, { useState } from 'react'
// import { useGetSuppliers } from '../hooks/useGetSuppliers'
// import { useCreateSupplier, useDeleteSupplier } from '../hooks/useSupplierMutations'

// const SupplierManagementPage = () => {
//   const { data: suppliers, error, isLoading } = useGetSuppliers()
//   const createSupplier = useCreateSupplier()
//   const deleteSupplier = useDeleteSupplier()

//   const [newSupplier, setNewSupplier] = useState({
//     name: '',
//     contact_info: '',
//     location: ''
//   })

//   const handleAddSupplier = () => {
//     createSupplier.mutate(newSupplier)
//     setNewSupplier({ name: '', contact_info: '', location: '' }) // reset the input fields
//   }

//   const handleDeleteSupplier = (id: string) => {
//     deleteSupplier.mutate(id)
//   }

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
//     setNewSupplier({ ...newSupplier, [field]: e.target.value })
//   }

//   if (isLoading) return <div>Loading...</div>
//   if (error) return <div>Error loading data</div>

//   return (
//     <Box bg="gray.800" p={5} color="gray.100" borderRadius="md">
//       <Text fontSize="2xl" fontWeight="bold">
//         Supplier Management
//       </Text>
//       <HStack spacing={4} my={5}>
//         <Input
//           type="text"
//           value={newSupplier.name}
//           onChange={(e) => handleChange(e, 'name')}
//           placeholder="New Supplier Name"
//           bgColor="gray.700"
//           color="white"
//           maxWidth="200px"
//         />
//         <Input
//           type="text"
//           value={newSupplier.contact_info}
//           onChange={(e) => handleChange(e, 'contact_info')}
//           placeholder="Contact Info"
//           bgColor="gray.700"
//           color="white"
//           maxWidth="200px"
//         />
//         <Input
//           type="text"
//           value={newSupplier.location}
//           onChange={(e) => handleChange(e, 'location')}
//           placeholder="Location"
//           bgColor="gray.700"
//           color="white"
//           maxWidth="200px"
//         />
//         <Button onClick={handleAddSupplier} bg="purple.700" color="white" px={5}>
//           Add Supplier
//         </Button>
//       </HStack>

//       <VStack spacing={4} align="start">
//         {suppliers?.map((supplier) => (
//           <HStack key={supplier.id} spacing={4} w="full" bg="gray.700" p={4} borderRadius="md">
//             <Text flex={1}>{supplier.name}</Text>
//             <Text flex={1}>{supplier.contact_info}</Text>
//             <Text flex={1}>{supplier.location}</Text>
//             <Button onClick={() => handleDeleteSupplier(supplier.id)} bg="purple.700" color="white">
//               Delete
//             </Button>
//           </HStack>
//         ))}
//       </VStack>
//     </Box>
//   )
// }

// export default SupplierManagementPage

import {
  Box,
  Button,
  Input,
  VStack,
  HStack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useGetSuppliers } from '../hooks/useGetSuppliers'
import {
  useCreateSupplier,
  useDeleteSupplier,
  useEditSupplier
} from '../hooks/useSupplierMutations'
import { Supplier } from '../models'

const SupplierManagementPage = () => {
  const { data: suppliers, error, isLoading } = useGetSuppliers()
  const createSupplier = useCreateSupplier()
  const deleteSupplier = useDeleteSupplier()
  const editSupplier = useEditSupplier()

  const [newSupplier, setNewSupplier] = useState({
    name: '',
    contact_info: '',
    location: ''
  })

  const [currentSupplier, setCurrentSupplier] = useState<Supplier | null>(null)

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

  const handleEditSupplier = () => {
    if (currentSupplier) {
      editSupplier.mutate({ id: currentSupplier.id, data: currentSupplier })
      setCurrentSupplier(null)
    }
  }

  const handleEditClick = (supplier: Supplier) => {
    setCurrentSupplier(supplier)
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
            <Button onClick={() => handleEditClick(supplier)} bg="purple.700" color="white">
              Edit
            </Button>
            <Button onClick={() => handleDeleteSupplier(supplier.id)} bg="purple.700" color="white">
              Delete
            </Button>
          </HStack>
        ))}
      </VStack>

      {currentSupplier && (
        <Modal isOpen={currentSupplier !== null} onClose={() => setCurrentSupplier(null)}>
          <ModalOverlay />
          <ModalContent bgColor="gray.700">
            <ModalHeader>Edit Supplier</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <Input
                  type="text"
                  value={currentSupplier.name}
                  onChange={(e) => setCurrentSupplier({ ...currentSupplier, name: e.target.value })}
                  placeholder="Supplier Name"
                />
                <Input
                  type="text"
                  value={currentSupplier.contact_info}
                  onChange={(e) =>
                    setCurrentSupplier({ ...currentSupplier, contact_info: e.target.value })
                  }
                  placeholder="Contact Info"
                />
                <Input
                  type="text"
                  value={currentSupplier.location}
                  onChange={(e) =>
                    setCurrentSupplier({ ...currentSupplier, location: e.target.value })
                  }
                  placeholder="Location"
                />
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button color="white" bgColor="purple.600" mr={3} onClick={handleEditSupplier}>
                Save
              </Button>
              <Button color="white" bgColor="purple.600" onClick={() => setCurrentSupplier(null)}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  )
}

export default SupplierManagementPage
