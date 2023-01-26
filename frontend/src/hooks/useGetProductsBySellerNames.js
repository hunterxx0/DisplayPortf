import { useEffect, useState } from 'react';
import getProductsBySellerNames from '../apis/getProductsBySellerNames';

const useGetProductsBySellerNames = (selectedSellers, category) => {
  const [products, setProducts] = useState([]);
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedSellers.length) {
      setIsLoading(true);
      getProductsBySellerNames(selectedSellers, category)
        .then((res) => {
          setIsLoading(false);
          // console.log(res);
          setProducts(res);
        })
        .catch((err) => console.log(err));
    }

    return () => setProducts([]);
  }, [selectedSellers, category]);

  return {
    loading,
    products,
    setProducts,
  };
};

export default useGetProductsBySellerNames;
