import { NewSupplier, Supplier } from "../../models"
import api from "../api"




// Suppliers
export const getSuppliers = () => api.get<Supplier[]>('/suppliers')
export const createSupplier = (data: NewSupplier) => api.post('/suppliers', data)
export const deleteSupplier = (id: string) => api.delete(`/suppliers/${id}`)