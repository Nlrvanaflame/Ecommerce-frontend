import { Supplier } from "../../models"
import api from "../api"




// Suppliers
export const getSuppliers = () => api.get<Supplier[]>('/suppliers')
export const createSupplier = (data: Supplier) => api.post('/suppliers', data)
export const deleteSupplier = (id: string) => api.delete(`/suppliers/${id}`)