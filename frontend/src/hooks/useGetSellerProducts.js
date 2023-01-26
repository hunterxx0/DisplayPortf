import { useEffect, useState } from 'react';
import getSellerProductsByName from '../apis/getSellerProductsByName';

export const useGetSellerProducts = (seller) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getSellerProductsByName(seller.name)
      .then((products) => setProducts(products))
      .catch((err) => console.error(err));
  }, [seller]);

  return { products, setProducts };
};
