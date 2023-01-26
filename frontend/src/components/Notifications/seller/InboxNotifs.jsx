import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetSeller } from '../../../hooks/useGetSeller';
import LoadingSpinner from '../../../Utils/LoadingSpinner';
import NotifMainSeller from './NotifMainSeller';

const InboxNotifs = () => {
  const { sellername: userId } = useParams();
  const { seller, isLoading } = useGetSeller(userId);

  if (isLoading) return <LoadingSpinner />;

  console.log(seller?.notifications?.filter((notif) => notif.read === 'read'));
  if (
    seller?.notifications?.length &&
    seller?.notifications?.every((notif) => notif.read === 'read')
  )
    return (
      <div className="flex items-center gap-x-4 font-cairo">
        <CheckCircleOutlineIcon />
        <p>All caught up!</p>
      </div>
    );

  return (
    <NotifMainSeller
      userId={seller._id}
      seller={seller}
      notifications={seller?.notifications?.filter(
        (notification) => notification.read === 'notRead'
      )}
    />
  );
};

export default InboxNotifs;
