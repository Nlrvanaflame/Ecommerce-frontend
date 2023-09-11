import { useMutation, useQueryClient } from 'react-query';
import { createInventoryRecord, updateInventoryRecord, deleteInventoryRecord } from '../services/routes/inventory';
import { Inventory, updateInventory, updateInventoryQuantity } from '../models';

export const useInventoryMutations = () => {
  const queryClient = useQueryClient();

  const createInventoryMutation = useMutation(createInventoryRecord, {
    onSuccess: () => {
      queryClient.invalidateQueries('inventory');
    },
  });

  const updateInventoryMutation = useMutation(
    ({ id, data }: { id: string; data: updateInventoryQuantity }) => updateInventoryRecord(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('inventory');
      },
    }
  );
  

  const deleteInventoryMutation = useMutation(deleteInventoryRecord, {
    onSuccess: () => {
      queryClient.invalidateQueries('inventory');
    },
  });

  return {
    createInventoryMutation,
    updateInventoryMutation,
    deleteInventoryMutation,
  };
};
