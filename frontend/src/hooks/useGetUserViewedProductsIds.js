import { useEffect, useState } from 'react';
import getUser from '../apis/getUser';

export const useGetUserViewedProductsIds = (pathname, username) => {
  const [viewedProductsIds, setViewedProductsIds] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const user = await getUser(username);
        setViewedProductsIds(user?.recently_viewed);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [pathname, username]);

  return { viewedProductsIds };
};
