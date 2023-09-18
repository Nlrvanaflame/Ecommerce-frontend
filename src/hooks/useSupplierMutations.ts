import { useMutation } from 'react-query';
import { createSupplier, deleteSupplier, editSupplier } from '../services/routes/supplier';
import queryClient from '..';  
import { NewSupplier } from '../models';



  export const useCreateSupplier = () => {
    return useMutation((newSupplier: NewSupplier) => createSupplier(newSupplier), {
      onSuccess: () => {
        queryClient.invalidateQueries('suppliers');
      },
    });
  };
  

export const useDeleteSupplier = () => {
  return useMutation(deleteSupplier, {
    onSuccess: () => {
      queryClient.invalidateQueries('suppliers');
    },
  });
};

export const useEditSupplier = () => {
  return useMutation(( { id, data }: { id: string, data: Partial<NewSupplier> } ) => editSupplier(id, data), {
    onSuccess: () => {
      queryClient.invalidateQueries('suppliers');
    },
  });
};

