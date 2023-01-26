import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { useAuth } from '../../contexts/user-context';
import ModalOverlay from '../../Utils/ModalOverlay';
import NavBar from '../Home/NavBar';
import ProfileDraw from './ProfileDraw';
import SearchInput from './Search/SearchInput';

const Header = () => {
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [profileIsOpen, setProfileIsOpen] = useState(false);
  const { user } = useAuth();

  const isConnected = Object.keys(user).length ? true : false;
  const unreadMessages = user?.me?.total_unread_count;

  const showProfileDraw = (e) => {
    setProfileIsOpen(!profileIsOpen);
  };

  const showSearchDraw = (e) => {
    setShowSearchModal(!showSearchModal);
  };

  // if (!isLoading)
  return (
    <>
      <div
        className="w-full shadow-sm shadow-gray-800"
        style={{ backgroundColor: '#231f20' }}
      >
        <div className="flex w-full flex-col items-start lg:items-center">
          <div
            className={`z-20 flex w-full items-start justify-between gap-6 border-b-[1px] border-b-gray-800 px-2  py-2 lg:max-w-7xl`}
          >
            <div className="flex  items-center gap-1">
              <div className="m-auto flex flex-col items-center">
                <Link className="hover:rotate-180 hover:animate-spin" to="/">
                  <img
                    className="h-8 w-8 sm:h-10 sm:w-10"
                    src={logo}
                    alt="logo"
                  />
                </Link>
                <span
                  className=" m-auto cursor-default
          fill-transparent stroke-white stroke-2 text-center font-cairo text-xs 
          uppercase tracking-widest text-orange-300 shadow-amber-300 drop-shadow-md "
                >
                  Display
                </span>
              </div>
            </div>
            {!isConnected && profileIsOpen && (
              <ModalOverlay IsOpen={profileIsOpen} setIsOpen={setProfileIsOpen}>
                <ProfileDraw
                  profileIsOpen={profileIsOpen}
                  showProfileDraw={showProfileDraw}
                />
              </ModalOverlay>
            )}
            <div className="flex flex-col sm:flex-row-reverse sm:gap-4">
              <div className=" relative flex gap-4">
                {showSearchModal ? (
                  <ModalOverlay
                    IsOpen={showSearchDraw}
                    setIsOpen={setShowSearchModal}
                  >
                    <SearchInput
                      showSearchModal={showSearchModal}
                      showSearchDraw={showSearchDraw}
                      focus={true}
                      user={user}
                    />
                  </ModalOverlay>
                ) : (
                  <SearchInput showSearchDraw={showSearchDraw} />
                )}
                <div className="flex flex-col justify-center">
                  <button onClick={showProfileDraw}>
                    {!isConnected ? (
                      <FontAwesomeIcon
                        className="text-4xl text-orange-300"
                        icon={faUserCircle}
                      />
                    ) : (
                      <div className=" relative m-2 inline-block">
                        <img
                          className="h-10 w-10 rounded-full object-cover shadow-md shadow-black sm:h-14 sm:w-14"
                          src={user?.me?.image}
                          alt="avatar"
                        />
                        {unreadMessages ? (
                          <div
                            className="absolute -top-2 -right-3 rounded-[8px] py-1 px-3 font-cairo 
                          text-sm  text-white"
                            style={{ backgroundColor: '#f5424e' }}
                          >
                            {unreadMessages}
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                    )}
                    {isConnected && profileIsOpen && (
                      <ProfileDraw
                        unreadMessages={unreadMessages}
                        profileIsOpen={profileIsOpen}
                        showProfileDraw={showProfileDraw}
                      />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full max-w-7xl items-center">
            <div className="w-[75%]">
              <NavBar />
            </div>
          </div>
        </div>
      </div>
      <div className="py-4"></div>
    </>
  );
};

export default Header;
