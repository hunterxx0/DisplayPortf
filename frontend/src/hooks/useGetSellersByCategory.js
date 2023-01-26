import { useEffect, useState } from 'react';
import getSellersByCategory from '../apis/getSellersByCategory';

const useGetSellersByCategory = (categoryname) => {
  const [loading, setLoading] = useState(false);
  const [sellerNames, setSellerNames] = useState([]);
  const [selectedSellers, setSelectedSellers] = useState([]);

  useEffect(() => {
    setLoading(true);
    getSellersByCategory(categoryname)
      .then((res) => {
        setLoading(false);
        let response = [];
        res
          .map((seller) => seller.seller_name)
          .forEach((seller) => {
            if (!response.includes(seller)) response.push(seller);
          });
        setSellerNames(response);
        setSelectedSellers(response);
      })
      .catch((err) => console.log(err));

    return () => {
      setSellerNames([]);
    };
  }, [categoryname]);
  return { loading, sellerNames, selectedSellers, setSelectedSellers };
};

export default useGetSellersByCategory;
