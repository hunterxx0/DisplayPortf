import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { deleteUser } from '../../apis/deleteUser';
import { useAuth } from '../../contexts/user-context';

// missing a loading component

const DeleteAccount = ({ role, dbUser = {}, name = '' }) => {
  const [isOpenDanger, setIsOpenDanger] = useState(false);
  const { user, logout } = useAuth();

  const handleClickDeleteUser = () => {
    deleteUser(user?.me?.id)
      .then(() => logout())
      .catch(console.error);
  };
  return (user?.me?.role === role && user?.me?.id === dbUser?._id) ||
    (user?.me?.role === 'seller' && user?.me?.name === name) ? (
    <div className="flex w-full flex-col items-center">
      <div className="mt-4 flex w-full flex-col items-center gap-4  shadow-sm shadow-red-400 sm:w-1/2 lg:w-1/4">
        <div className="flex items-center justify-between">
          <p className="w-full px-4 py-1 text-center  font-sans text-xl uppercase text-red-400 ">
            danger zone
          </p>
          <FontAwesomeIcon
            className="cursor-pointer text-white hover:text-red-600"
            onClick={() => setIsOpenDanger((prev) => !prev)}
            icon={isOpenDanger ? faCaretUp : faCaretDown}
          />
        </div>
        {isOpenDanger ? (
          <div className="w-full">
            <p className="text-cairo w-full p-4 text-sm text-white">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
            <div className="w-full text-center">
              <button
                onClick={handleClickDeleteUser}
                className="w-full whitespace-nowrap py-2 font-sans text-sm text-white shadow-sm shadow-red-600 
                          hover:bg-transparent hover:text-red-600"
              >
                delete your account
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  ) : null;
};

export default DeleteAccount;
