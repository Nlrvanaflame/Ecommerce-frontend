import { Inventory, updateInventory, updateInventoryQuantity } from "../../models"
import api from "../api"



export const getInventory = (productId: string) => api.get<Inventory>(`/inventory/${productId}`)
export const createInventoryRecord = (data: updateInventory) => api.post('/inventory', data)
export const updateInventoryRecord = (id: string, data: updateInventoryQuantity) =>
  api.put(`/inventory/${id}`, data)
export const deleteInventoryRecord = (id: string) => api.delete(`/inventory/${id}`)