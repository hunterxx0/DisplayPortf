import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetSeller } from '../../../hooks/useGetSeller';
import LoadingSpinner from '../../../Utils/LoadingSpinner';
import NotifMainSeller from './NotifMainSeller';

const ReadNotifs = () => {
  const { sellername: userId } = useParams();
  const { seller, isLoading } = useGetSeller(userId);

  if (isLoading) return <LoadingSpinner />;

  if (seller?.notifications?.every((notif) => notif.read === 'notRead'))
    return (
      <div className="flex items-center gap-x-4 font-cairo">
        <SentimentVeryDissatisfiedIcon />{' '}
        <p>you haven't read any of your notifications!</p>
      </div>
    );

  return (
    <NotifMainSeller
      userId={seller._id}
      read={true}
      notifications={seller?.notifications?.filter(
        (notification) => notification.read === 'read'
      )}
    />
  );
};

export default ReadNotifs;
