import { Link, useOutletContext } from 'react-router-dom';
import { useGetFollowing } from '../../hooks/useGetFollowing';
import LoadingSpinner from '../../Utils/LoadingSpinner';

const Following = () => {
  const { user } = useOutletContext();
  const { sellers, isLoading, error, isError } = useGetFollowing(user?._id);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>{error.message}</div>;
  return (
    <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-6">
      {sellers?.map((seller) => (
        <div
          key={seller.name}
          className="flex flex-col items-center justify-between gap-4 rounded-full shadow-sm shadow-black"
        >
          <img src={seller.avatarURL} alt="avatar" />
          <Link
            to={`/seller/${seller.name}`}
            className="whitespace-nowrap font-cairo text-sm  capitalize text-white"
          >
            {seller.name}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Following;
