import { useQuery } from 'react-query';
import { Product } from '../models/Product';
import { getProducts, getProduct } from '../services/routes/products';

export const useGetProducts = () => {
    return useQuery<Product[], Error>('products', () => getProducts().then(response => response.data));
  };
  
  export const useGetProduct = (productId: string) => {
    return useQuery<Product, Error>(['product', productId], () => getProduct(productId).then(response => response.data));
  };
  
