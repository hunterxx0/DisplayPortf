import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment';
import { Link } from 'react-router-dom';
import UpdatedFieldsInfo from './UpdatedFieldsInfo';

const ProductUpdatedNotification = ({ notification, userId, read }) => {
  return (
    <div
      className="relative flex w-full  cursor-pointer items-center justify-between gap-x-2 rounded-md bg-gray-900 p-4 font-sans text-sm 
    tracking-wide shadow-sm shadow-black transition hover:bg-gray-800"
      key={notification.id}
    >
      <div>
        <div className=" flex gap-x-2">
          <div className="pointer-events-none absolute top-1/2 -left-5 -translate-x-1/2 -translate-y-1/2 rounded-full   p-1 shadow-sm shadow-black">
            <EditIcon className="text-orange-200" fontSize="small" />
          </div>
          <div>
            <Link
              to={`/seller/${notification.seller_name}`}
              className="capitalize text-orange-600 hover:text-orange-900"
            >
              {notification.seller_name}
            </Link>
            &nbsp;just changed their product&nbsp;
            <Link
              to={`/products/${notification.prodID}`}
              className="text-orange-600 transition hover:text-orange-900 hover:underline"
            >
              {notification.product_name}
            </Link>
            :&nbsp;
          </div>
        </div>
        {/* to be removed */}
        <UpdatedFieldsInfo
          notifId={notification.id}
          userId={userId}
          targets={notification.targets}
          read={read}
        />
      </div>
      <p className="whitespace-nowrap">
        {moment(new Date(notification.date)).fromNow()}
      </p>
    </div>
  );
};

export default ProductUpdatedNotification;
