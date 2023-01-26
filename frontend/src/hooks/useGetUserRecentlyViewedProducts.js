import { useEffect, useState } from 'react';
import { getUserRecentlyViewedProducts } from '../apis/getUserRecentlyViewedProducts';

export const useGetUserRecentlyViewedProducts = (
  recentlyViewedProductsIds = [],
  role,
  isHome = false
) => {
  const [recentlyViewedProducts, setRecentlyViewedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (recentlyViewedProductsIds.length && role === 'user')
      getUserRecentlyViewedProducts(recentlyViewedProductsIds, isHome)
        .then((products) => {
          setRecentlyViewedProducts({
            'Recently Viewed Products': products.map((product) => product.data),
          });
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
  }, [recentlyViewedProductsIds, isHome, role]);

  return { recentlyViewedProducts, isLoading };
};
