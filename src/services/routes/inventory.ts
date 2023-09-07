import { Inventory, updateInventory } from "../../models"
import api from "../api"




// Inventory
export const getInventory = (productId: string) => api.get<Inventory[]>(`/inventory/${productId}`)
export const createInventoryRecord = (data: Inventory) => api.post('/inventory', data)
export const updateInventoryRecord = (id: string, data: updateInventory) =>
  api.put(`/inventory/${id}`, data)
export const deleteInventoryRecord = (id: string) => api.delete(`/inventory/${id}`)