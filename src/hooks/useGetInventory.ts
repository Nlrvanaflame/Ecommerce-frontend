import { useQuery } from 'react-query';
import { getInventory } from '../services/routes/inventory';
import { Inventory } from '../models';

export const useGetInventory = (productId: string) => {
    return useQuery<Inventory, Error>(
      ['inventory', productId],
      () => getInventory(productId).then(response => response.data)
    );
  };
  
  
  

