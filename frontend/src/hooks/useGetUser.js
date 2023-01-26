import { useEffect, useState } from 'react';
import getUser from '../apis/getUser';

const useGetUser = (uid) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUser(uid)
      .then((user) => setUser(user))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));

    return () => setUser({});
  }, [uid]);

  return { user, setUser, isLoading };
};

export default useGetUser;
