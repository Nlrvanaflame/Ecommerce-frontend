import { useMutation } from 'react-query';
import { createProduct, updateProduct, deleteProduct } from '../services/routes/products';
import { Product } from '../models';
import queryClient from '..';

export const useCreateProduct = () => {
  return useMutation(createProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries('products');
    },
  });
};

export const useUpdateProduct = () => {
    return useMutation(({ id, data }: { id: string; data: Partial<Product> }) => updateProduct(id, data), {
      onSuccess: () => {
        queryClient.invalidateQueries('products');
      },
    });
  };
  

export const useDeleteProduct = () => {
  return useMutation(deleteProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries('products');
    },
  });
};
