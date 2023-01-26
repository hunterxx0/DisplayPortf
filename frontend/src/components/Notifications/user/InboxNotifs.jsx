import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import React from 'react';
import { useParams } from 'react-router-dom';
import useGetUser from '../../../hooks/useGetUser';
import LoadingSpinner from '../../../Utils/LoadingSpinner';
import NotifMain from './NotifMain';

const InboxNotifs = () => {
  const { username: userId } = useParams();
  const { user, isLoading } = useGetUser(userId);

  if (isLoading) return <LoadingSpinner />;

  if (user?.notifications?.every((notif) => notif.read === 'read'))
    return (
      <div className="flex items-center gap-x-4 font-cairo">
        <CheckCircleOutlineIcon />
        <p>All caught up!</p>
      </div>
    );

  return (
    <NotifMain
      userId={userId}
      notifications={user?.notifications?.filter(
        (notification) => notification.read === 'notRead'
      )}
    />
  );
};

export default InboxNotifs;
