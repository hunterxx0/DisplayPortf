import { useEffect, useState } from 'react';
import { getFollowers } from '../apis/getFollowers';

export const useGetSellerFollowers = (sellerName) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getFollowers(sellerName)
      .then((users) => setUsers(users))
      .catch((err) => {
        setError(err);
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  }, [sellerName]);
  return { users, isLoading, error, isError };
};
