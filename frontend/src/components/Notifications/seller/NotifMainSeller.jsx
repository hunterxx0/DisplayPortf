import ProductFavoritedNotification from './ProductFavoritedNotification';
import ProductFollowNotification from './ProductFollowNotification';
import ProductRequestedNotification from './ProductRequestedNotification';

const NotifMainSeller = ({
  notifications,
  seller,
  userId,
  sellerName,
  read,
}) => {
  return (
    <div className="flex w-full flex-col gap-4">
      {notifications?.map((notification) => {
        if (notification.Operation === 'request')
          return (
            <ProductRequestedNotification
              userId={userId}
              notification={notification}
              read={read}
              seller={seller}
            />
          );
        if (notification.Operation === 'favorite')
          return (
            <ProductFavoritedNotification
              userId={userId}
              notification={notification}
              read={read}
              seller={seller}
            />
          );

        if (notification.Operation === 'follow')
          return (
            <ProductFollowNotification
              userId={userId}
              notification={notification}
              read={read}
              seller={seller}
            />
          );
        return null;
      })}
    </div>
  );
};

export default NotifMainSeller;
