import { useMutation, useQueryClient } from 'react-query';
import { createInventoryRecord, updateInventoryRecord, deleteInventoryRecord } from '../services/routes/inventory';
import { updateInventory } from '../models';

export const useCreateInventoryRecord = () => {
  const queryClient = useQueryClient();
  return useMutation(createInventoryRecord, {
    onSuccess: () => {
      queryClient.invalidateQueries('inventory');
    },
  });
};

export const useUpdateInventoryRecord = () => {
    const queryClient = useQueryClient();
    return useMutation((data: { id: string, inventory: updateInventory }) => updateInventoryRecord(data.id, data.inventory), {
      onSuccess: () => {
        queryClient.invalidateQueries('inventory');
      },
    });
  };
  

export const useDeleteInventoryRecord = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteInventoryRecord, {
    onSuccess: () => {
      queryClient.invalidateQueries('inventory');
    },
  });
};
