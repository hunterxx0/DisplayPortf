import AddIcon from '@mui/icons-material/Add';
import moment from 'moment';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setNotificationToRead } from '../../../apis/setNotificationToRead';

const ProductAddedNotification = ({ notification, userId }) => {
  useEffect(() => {
    if (notification.read === 'notRead')
      setNotificationToRead(userId, notification.id).catch(console.error);
  }, [userId, notification]);
  return (
    <div
      className="relative flex w-full cursor-pointer items-center justify-between rounded-md bg-gray-900 p-4 font-sans text-sm 
    tracking-wide shadow-sm shadow-black transition hover:bg-gray-800"
      key={notification.id}
    >
      <div className=" flex gap-x-2">
        <div className="pointer-events-none absolute top-1/2 -left-5 -translate-x-1/2 -translate-y-1/2 rounded-full  p-1 shadow-sm shadow-black">
          <AddIcon className="text-orange-200" fontSize="small" />
        </div>
        <div>
          <Link
            to={`/seller/${notification.seller_name}`}
            className="text-orange-600 hover:text-orange-900"
          >
            {notification.seller_name}
          </Link>
          &nbsp;just added a new product&nbsp;
          <Link
            to={`/products/${notification.prodID}`}
            className="text-orange-600 hover:text-orange-900"
          >
            {notification.product_name}
          </Link>
        </div>
      </div>
      <p>{moment(new Date(notification.date)).fromNow()}</p>
    </div>
  );
};

export default ProductAddedNotification;
