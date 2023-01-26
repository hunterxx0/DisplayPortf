import { useEffect, useState } from 'react';
import getSellerProductsByName from '../apis/getSellerProductsByName';

const UseGetSellerProductsByName = (seller) => {
  const [requestedProds, setRequestedProds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSellerProductsByName(seller.name).then((prods) => {
      setRequestedProds((prev) =>
        prods
          .filter((product) => product.requests.length)
          .map(
            (product) => [...prev, { product, requests: product.requests }][0]
          )
      );
      setLoading(false);
    });
  }, [seller]);

  return { requestedProds, loading };
};

export default UseGetSellerProductsByName;
