import ProductAddedNotification from './ProductAddedNotification';
import ProductUpdatedNotification from './ProductUpdatedNotification';

const NotifMain = ({ notifications, userId, read }) => {
  return (
    <div className="flex w-full flex-col gap-4">
      {notifications?.map((notification) => {
        if (notification.Operation === 'add')
          return (
            <ProductAddedNotification
              userId={userId}
              notification={notification}
              read={read}
            />
          );
        if (notification.Operation === 'update')
          return (
            <ProductUpdatedNotification
              userId={userId}
              notification={notification}
              read={read}
            />
          );
        return null;
      })}
    </div>
  );
};

export default NotifMain;
