import { useMutation } from 'react-query';
import { createSupplier, deleteSupplier } from '../services/routes/supplier';
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
