export interface Supplier {
  id: string;
  name: string;
  contact_info: string;
  location: string;
}

 
export type NewSupplier = Omit<Supplier , 'id'>
