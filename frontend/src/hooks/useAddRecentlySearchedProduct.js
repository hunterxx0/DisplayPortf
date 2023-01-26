import { useEffect, useState } from 'react';
import { addRecentlySearchedProduct } from '../apis/addRecentlySearchedProduct';
import getUser from '../apis/getUser';

export const useAddRecentlySearchedProduct = (
  setnewUser,
  recentlySearched,
  user
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (user?.me?.role !== 'user') return;
    if (user?.me?.id.length && recentlySearched?.length) {
      setIsLoading(true);
      addRecentlySearchedProduct(recentlySearched, user.me.id)
        .then((user) => setnewUser(user))
        .catch(() => setIsError(true))
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(true);
      getUser(user?.me?.id)
        .then((resUser) => setnewUser(resUser))
        .finally(() => setIsLoading(false));
    }
  }, [recentlySearched, user]);

  return { isLoading, isError };
};
