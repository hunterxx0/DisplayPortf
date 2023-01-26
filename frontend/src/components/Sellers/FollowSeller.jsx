import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { Tooltip } from '@mui/material';
import { useState } from 'react';
import { userFollowSeller } from '../../apis/userFollowSeller';
import { userUnfollowSeller } from '../../apis/userUnfollowSeller';
import useGetUser from '../../hooks/useGetUser';

const FollowSeller = ({ user, seller }) => {
  const {
    user: u,
    setUser,
    isLoading: isLoadingUser,
  } = useGetUser(user?.me?.id);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleClickUserFollowSeller = () => {
    setIsLoading(true);
    userFollowSeller(user?.me?.id, seller.name)
      .then((user) => setUser(user))
      .catch((err) => {
        setIsError(true);
        setError(err);
      })
      .finally(() => setIsLoading(false));
  };
  const handleClickUserUnfollowSller = () => {
    setIsLoading(true);
    userUnfollowSeller(user?.me?.id, seller.name)
      .then((user) => setUser(user))
      .catch((err) => {
        setIsError(true);
        setError(err);
      })
      .finally(() => setIsLoading(false));
  };

  if (isLoadingUser || isLoading) return null;

  if (isError && error?.response?.status !== 409)
    return <div>unexpected error, please refresh!</div>;

  return (
    <div>
      {u?.following?.includes(seller?.name) ? (
        <button
          className="absolute top-0 right-0 m-2 rounded-md px-2  py-0.5 font-cairo text-sm text-white shadow-sm shadow-black hover:opacity-80"
          onClick={handleClickUserUnfollowSller}
        >
          <Tooltip title="unfollow seller">
            <PersonRemoveIcon className="text-orange-200" fontSize="small" />
          </Tooltip>
        </button>
      ) : (
        <button
          className="absolute top-0 right-0 m-2 rounded-md px-2  py-0.5 font-cairo text-sm text-white shadow-sm shadow-black hover:opacity-80"
          onClick={handleClickUserFollowSeller}
        >
          <Tooltip title="follow seller">
            <PersonAddIcon className="text-orange-200" fontSize="small" />
          </Tooltip>
        </button>
      )}
    </div>
  );
};

export default FollowSeller;
