import {
  faArrowRightFromBracket,
  faBell,
  faMessage,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/user-context';
import getFormattedName from '../../Utils/formatFullname';
import Auth from '../Auth/Auth';

const ProfileDrawSeller = ({ showProfileDraw, role, unreadMessages }) => {
  const { user, logout } = useAuth();

  return !Object.keys(user).length ? (
    <>
      <div>
        <CloseIcon
          fontSize="large"
          className="absolute top-0 left-0 cursor-pointer text-white"
          onClick={() => {
            showProfileDraw();
          }}
        />
        <Auth showProfileDraw={showProfileDraw} />
      </div>
    </>
  ) : (
    <div
      className="absolute top-16 right-6 flex w-52 flex-col gap-4 rounded-sm bg-gray-900 text-left font-sans text-base font-medium text-white shadow-md 
   shadow-black"
    >
      <>
        <div
          className="flex flex-col items-center gap-2 p-2 
     after:my-0 after:mx-auto after:block after:w-11/12 after:border-b-2 after:border-b-orange-300 after:pt-1"
        >
          <Link
            className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-300 text-center shadow-sm shadow-black "
            to={`/seller/${user?.me?.name}`}
          >
            <img
              className="w-32 self-center rounded-full outline outline-orange-400"
              src={user?.me?.image}
              alt="avatar"
            />
          </Link>
          <span className="font-semibold">
            {getFormattedName(user?.me?.name)}
          </span>
        </div>

        <>
          {' '}
          <div
            className="flex flex-col gap-y-3 py-0 after:my-0 after:mx-auto after:block after:w-11/12 after:border-b-2 
                        after:border-b-orange-300 after:pt-1"
          >
            <Link
              className="flex items-center gap-2 rounded-md border-r-4 border-l-4 border-r-orange-300 border-l-orange-300 px-2 hover:bg-gray-500"
              to={{ pathname: `/seller/${user?.me?.name}` }}
            >
              <FontAwesomeIcon icon={faUser} size="sm" />
              <span className="">Profile</span>
            </Link>
            <Link
              className="flex items-center gap-2 rounded-md border-r-4 border-l-4 border-r-orange-300 border-l-orange-300 px-2 hover:bg-gray-500"
              to={`/seller/${user?.me?.name}/notifications`}
            >
              <FontAwesomeIcon icon={faBell} size="sm" />
              <span className="">Notifications</span>
            </Link>
            <Link
              className="flex items-center gap-2 rounded-md border-r-4 border-l-4 border-r-orange-300 border-l-orange-300 px-2 hover:bg-gray-500"
              to={`/messages`}
            >
              <FontAwesomeIcon icon={faMessage} size="sm" />
              <div className="flex w-full items-center justify-between">
                <span className="">Messages</span>
                {unreadMessages ? (
                  <div
                    className="rounded-[8px]  px-2 font-cairo 
                            text-sm  text-white"
                    style={{ backgroundColor: '#f5424e' }}
                  >
                    {unreadMessages}
                  </div>
                ) : (
                  ''
                )}
              </div>
            </Link>
          </div>
          <div
            onClick={logout}
            className="mb-4 flex items-center gap-2 rounded-md border-r-4 border-l-4 border-r-orange-300 border-l-orange-300 px-2 hover:bg-gray-500"
          >
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
            <span className="">Logout</span>
          </div>
        </>
      </>
    </div>
  );
};

export default ProfileDrawSeller;
