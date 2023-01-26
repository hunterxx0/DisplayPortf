import { useEffect, useState } from 'react';
import { getUserRecentlyViewedProducts } from '../apis/getUserRecentlyViewedProducts';

export const useGetUserViewedProducts = (viewedProductsIds) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!viewedProductsIds.length) {
      setIsLoading(false);
      return;
    }
    getUserRecentlyViewedProducts(viewedProductsIds)
      .then((prods) => {
        setProducts(prods);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, [viewedProductsIds]);

  return { products, setProducts, isLoading };
};
