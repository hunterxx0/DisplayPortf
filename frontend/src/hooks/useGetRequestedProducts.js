import { useEffect, useState } from 'react';
import { getRequestedProducts } from '../apis/getRequestedProducts';

export const useGetRequestedProducts = (requestIds) => {
  const [requestedProducts, setRequestsProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!requestIds.length) {
      setLoading(false);
      return;
    }
    getRequestedProducts().then((prods) => {
      setRequestsProducts((prev) => {
        let filtered = [];
        prods.forEach((product) => {
          const requests = product.requests.filter((req) =>
            requestIds.includes(req.id)
          );
          requests.length && filtered.push({ product, requests });
        });
        return filtered;
      });
      setLoading(false);
    });
  }, [requestIds]);

  return { requestedProducts, loading };
};
