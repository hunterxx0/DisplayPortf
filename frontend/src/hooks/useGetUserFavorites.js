import { useEffect, useState } from 'react';
import getUser from '../apis/getUser';

const useGetUserFavorites = (pathname, username) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const user = await getUser(username);
        setFavorites(user?.favorites);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [pathname, username]);

  return { favorites };
};

export default useGetUserFavorites;
