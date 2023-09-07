import { Product } from "../../models"
import api from "../api"



// Products
export const getProducts = () => api.get<Product[]>('/products')
export const getProduct = (id: string) => api.get<Product>(`/products/${id}`)
export const createProduct = (data: Product) => api.post('/products', data)
export const updateProduct = (id: string, data: Partial<Product>) =>
  api.put(`/products/${id}`, data)
export const deleteProduct = (id: string) => api.delete(`/products/${id}`)