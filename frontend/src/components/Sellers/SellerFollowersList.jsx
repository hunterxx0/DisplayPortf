import { Link, useOutletContext } from 'react-router-dom';
import { useGetSellerFollowers } from '../../hooks/useGetSellerFollowers';
import LoadingSpinner from '../../Utils/LoadingSpinner';

const SellerFollowersList = () => {
  const [seller] = useOutletContext();
  const { users, isLoading, error, isError } = useGetSellerFollowers(
    seller.name
  );

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>{error.message}</div>;
  return (
    <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-6">
      {users?.map((user) => (
        <div
          key={user._id}
          className="flex flex-col items-center justify-between gap-4 shadow-sm shadow-black"
        >
          <img src={user.avatarURL} alt="avatar" />
          <Link
            to={`/user/${user._id}`}
            className="whitespace-nowrap font-cairo text-sm  capitalize text-white"
          >
            {user.fullName}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SellerFollowersList;
