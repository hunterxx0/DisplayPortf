import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

import React from 'react';
import { useParams } from 'react-router-dom';
import useGetUser from '../../../hooks/useGetUser';
import LoadingSpinner from '../../../Utils/LoadingSpinner';
import NotifMain from './NotifMain';

const ReadNotifs = () => {
  const { username: userId } = useParams();
  const { user, isLoading } = useGetUser(userId);

  if (isLoading) return <LoadingSpinner />;

  if (user?.notifications?.every((notif) => notif.read === 'notRead'))
    return (
      <div className="flex items-center gap-x-4 font-cairo">
        <SentimentVeryDissatisfiedIcon />{' '}
        <p>you haven't read any of your notifications!</p>
      </div>
    );

  return (
    <NotifMain
      userId={userId}
      read={true}
      notifications={user?.notifications?.filter(
        (notification) => notification.read === 'read'
      )}
    />
  );
};

export default ReadNotifs;
