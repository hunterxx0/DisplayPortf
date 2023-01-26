import { useEffect, useState } from 'react';
import { getSeller } from '../apis/getSeller';

export const useGetSeller = (sellername) => {
  const [seller, setSeller] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sellername?.length) return;
    getSeller(sellername)
      .then((seller) => {
        setSeller(seller);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [sellername]);

  return { seller, loading };
};
