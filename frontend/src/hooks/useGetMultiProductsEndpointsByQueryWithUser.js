import { useEffect, useState } from 'react';
import getMultiProductsEndpointsByQueryWithUser from '../apis/getMultiProductsEndpointsByQueryWithUser';

const useGetMultiProductsEndpointsByQueryWithUser = (u) => {
  const [isLoading, setIsLoading] = useState(true);
  const [latestProducts, setLatestProducts] = useState({});
  const [trendingProducts, setTrendingProducts] = useState({});
  const [mostViewedProducts, setMostViewedProducts] = useState({});
  const [user, setUser] = useState({});
  useEffect(() => {
    getMultiProductsEndpointsByQueryWithUser(u).then((res) => {
      setLatestProducts({ 'Latest Products': res[0].data });
      setTrendingProducts({ 'Most Popular Products': res[1].data });
      setMostViewedProducts({ 'Most Viewed Products': res[2].data });

      if (u && u?.role === 'user') setUser(res[3].data);
      setIsLoading(false);
    });
  }, [u]);
  return {
    isLoading,
    latestProducts,
    trendingProducts,
    mostViewedProducts,
    user,
  };
};

export default useGetMultiProductsEndpointsByQueryWithUser;
