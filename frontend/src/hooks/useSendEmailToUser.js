import { useEffect, useState } from 'react';
import sendEmailToUser from '../apis/sendEmailToUser';

const useSendEmailToUser = (data) => {
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    if (Object.keys(data).length)
      sendEmailToUser(data)
        .then((res) => setIsSent(true))
        .catch((err) => console.error(err));
  }, [data]);
  return { isSent, setIsSent };
};

export default useSendEmailToUser;
