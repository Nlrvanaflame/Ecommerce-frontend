import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useGetProduct } from '../hooks/useGetProducts';
import { FormState } from '../models';

const useFormState = (id: string | undefined) => {
  const { data: product, error, isLoading } = useGetProduct(id || '');
  const { register, handleSubmit, setValue } = useForm<FormState>({
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      supplier_id: ''
    }
  });

  const validationRules = {
    name: { 
      required: { value: true, message: "Name is required" },
      maxLength: { value: 16, message: "Name cannot be more than 16 characters" },
      minLength: { value: 1, message: "Name cannot be empty" },
    },
    description: { 
      maxLength: { value: 250, message: "Description cannot be more than 250 characters" }
    },
    price: { 
      required: { value: true, message: "Price is required" },
      min: { value: 0, message: "Price cannot be negative" },
      pattern: { value: /^[0-9]*$/, message: "Price must be a number" }
    },
    supplier_id: { 
      required: { value: true, message: "Supplier ID is required" },
    }
  };

  const handleNumericInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (product) {
      setValue('name', product.name);
      setValue('description', product.description);
      setValue('price', product.price);
    }
  }, [product, setValue]);

  return { register, validationRules, handleSubmit, setValue, handleNumericInput, product, error, isLoading };
};

export default useFormState;

