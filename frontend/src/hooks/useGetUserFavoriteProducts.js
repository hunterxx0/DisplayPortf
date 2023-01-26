import { useEffect, useState } from 'react';
import getUserFavoriteProducts from '../apis/getUserFavoriteProducts';

const useGetUserFavoriteProducts = (favorites) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getUserFavoriteProducts(favorites)
      .then((prods) => {
        setProducts(prods);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, [favorites]);

  return { products, setProducts, isLoading };
};

export default useGetUserFavoriteProducts;
