
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useGetProduct } from '../hooks/useGetProducts';
import { FormState } from '../models';

const useFormState = (id: string | undefined) => {
    const { data: product, error, isLoading } = useGetProduct(id || '');
    const { register, handleSubmit, setValue } = useForm<FormState>();
  
    useEffect(() => {
      if (product) {
        setValue('name', product.name);
        setValue('description', product.description);
        setValue('price', product.price);
      }
    }, [product, setValue]);
  
    return { register, handleSubmit,setValue, product, error, isLoading };
  };
  
  export default useFormState;