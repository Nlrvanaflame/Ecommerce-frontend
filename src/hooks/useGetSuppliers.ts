import { useQuery } from 'react-query';
import { Supplier } from '../models/Supplier';
import { getSuppliers } from '../services/routes';

export const useGetSuppliers = () => {
    return useQuery<Supplier[], Error>('suppliers', () => getSuppliers().then(response => response.data));
  };