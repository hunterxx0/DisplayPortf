import React from 'react';
import { Link } from 'react-router-dom';
import useGetUser from '../../hooks/useGetUser';
import LoadingSpinner from '../../Utils/LoadingSpinner';

const RequestOverviewInfo = ({ userId }) => {
  const { user, isLoading } = useGetUser(userId);

  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="text-md grid  grid-cols-2 flex-col gap-4 p-4 font-cairo text-white">
      <div className="flex flex-col">
        <p className="text-orange-200">Request from:</p>
        <Link
          className="flex cursor-pointer gap-1 hover:opacity-80"
          to={`/user/${userId}`}
        >
          <img className="h-6 w-6" src={user.avatarURL} alt="avatar" />
          <p className="capitalize">{`${user.fullName}`}</p>
        </Link>
      </div>
      <div>
        <p className="text-orange-200">Phone number:</p>
        <p>{user.phone_number}</p>
      </div>
    </div>
  );
};

export default RequestOverviewInfo;
