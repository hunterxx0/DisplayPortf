import { useEffect, useState } from 'react';
import { getFollowing } from '../apis/getFollowing';

export const useGetFollowing = (uid) => {
  const [sellers, setSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (uid)
      getFollowing(uid)
        .then((sellers) => setSellers(sellers))
        .catch((err) => {
          setError(err);
          setIsError(true);
        })
        .finally(() => setIsLoading(false));
  }, [uid]);

  return { sellers, isLoading, error, isError };
};
