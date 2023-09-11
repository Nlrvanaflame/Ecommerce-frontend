import { type } from "os";

export interface Inventory {
    id: string;
    product_id: string;
    quantity: number;
    last_updated: Date; 
  }
  

export type updateInventory = Pick<Inventory,'product_id' | 'quantity'>

export type updateInventoryQuantity = {
  quantity: number;
};


