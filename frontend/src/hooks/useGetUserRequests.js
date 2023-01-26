import { useEffect, useState } from 'react';
import getUser from '../apis/getUser';

export const useGetUserRequests = (uid) => {
  const [requestsIds, setRequestsIds] = useState([]);

  useEffect(() => {
    getUser(uid)
      .then((res) => {
        setRequestsIds(res.requests);
      })
      .catch((err) => console.log(err));
  }, [uid]);

  return { requestsIds };
};
