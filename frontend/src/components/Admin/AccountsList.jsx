import {
  faEllipsisVertical,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEvents } from '../../hooks/useEvents';
import { useFetchItems } from '../../hooks/useFetchItems';
import { API_ENDPOINTS } from '../../Utils/constants';
import LoadingSpinner from '../../Utils/LoadingSpinner';
import LoadingWithModal from '../../Utils/LoadingWithModal';
import ModalOverlay from '../../Utils/ModalOverlay';
import { client } from '../../Utils/stream';
import BanModal from './BanModal';
import MessageModal from './MessageModal';
import UserCard from './UserCard';

const AccountsList = ({ type = 'user' }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const isUser = type === 'user';
  const { openMenu, setOpenMenu } = useEvents();
  const [banningUser, setBanningUser] = useState(null);
  const [isBanningUser, setIsBanningUser] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState([]);
  const [BannedUser, setBannedUser] = useState(null);
  const [messageRecipient, setMessageRecipient] = useState(null);
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  const {
    items,
    page,
    fetchItems,
    isLoading,
    setSearchedItems,
    searchedItems,
  } = useFetchItems(
    isUser ? `${API_ENDPOINTS.users}` : `${API_ENDPOINTS.sellers}`
  );

  const action = (snackbarId) => (
    <div className="flex gap-x-2">
      <button
        onClick={() => {
          closeSnackbar(snackbarId);
        }}
      >
        Dismiss
      </button>
    </div>
  );

  const handleChange = (e) => {
    setSearchedItems(() =>
      items.filter((item) => {
        if (isUser) return item.username.includes(e.target.value);
        return item.name.includes(e.target.value);
      })
    );
  };

  if (isLoading) return <LoadingWithModal />;

  return (
    <div className="w-full">
      <div className=" my-8 flex w-full justify-center">
        <div className="relative mt-2 w-72">
          <input
            className="w-full rounded-md bg-transparent  bg-gray-900 p-2 shadow-md shadow-black outline-none placeholder:text-sm placeholder:opacity-70"
            placeholder={`Search the currently loaded ${
              isUser ? 'users' : 'sellers'
            }...`}
            onChange={handleChange}
          />
          <FontAwesomeIcon
            className="absolute top-1/2 right-0 -translate-x-1/2 -translate-y-1/2"
            icon={faSearch}
          />
        </div>
      </div>
      <InfiniteScroll
        dataLength={searchedItems.length}
        next={fetchItems}
        hasMore={!!page.current}
        loader={<LoadingSpinner />}
      >
        {!page.current ? (
          <p className="w-full p-2 text-right font-sans text-xs text-orange-200">
            {searchedItems.length} {isUser ? 'users' : 'sellers'}
          </p>
        ) : null}
        <div className="grid grid-cols-1 place-items-center justify-center justify-items-center gap-x-16 gap-y-20 overflow-auto p-4 font-sans sm:grid-cols-3 md:grid-cols-4">
          {!searchedItems.length && !page.current ? (
            <div>No {isUser ? 'users' : 'sellers'} available!</div>
          ) : (
            searchedItems.map((item) => {
              console.log(item);
              const user = {
                id: item?._id || item.id,
                image: item?.avatarURL || item.image,
                name: isUser ? item.username : item.name,
              };
              return (
                <div className="group flex gap-2 p-4" key={user.id}>
                  <UserCard item={user} unreadMessages={unreadMessages} />
                  <button
                    className="btn__menu relative hidden self-start group-hover:block"
                    onClick={async () => {
                      const response = await client.queryUsers({
                        id: user.id,
                        banned: true,
                      });
                      if (response?.users?.length) setBannedUser(user.id);
                      else setBannedUser(null);

                      setOpenMenu((prev) =>
                        user.id !== prev ? user.id : null
                      );
                    }}
                  >
                    <FontAwesomeIcon
                      className="text-white hover:opacity-80"
                      icon={faEllipsisVertical}
                    />
                    <ul
                      className={`absolute right-0 gap-2 py-2 text-left  ${
                        openMenu === user.id ? 'flex' : 'hidden'
                      }  w-28 flex-col bg-gray-900 text-xs shadow-sm shadow-black`}
                    >
                      {BannedUser === null ? (
                        <li
                          className="p-2 hover:bg-gray-600"
                          onClick={() => {
                            setIsBanningUser(true);
                            setBanningUser(user);
                          }}
                        >
                          Ban user
                        </li>
                      ) : (
                        <li
                          className="p-2 hover:bg-gray-600"
                          onClick={async () => {
                            try {
                              await client.unbanUser(user.id);
                            } catch (err) {
                              console.error(err);
                            } finally {
                              enqueueSnackbar(`${user.name} is unbanned`, {
                                action,
                              });
                            }
                          }}
                        >
                          Unban User
                        </li>
                      )}

                      <li
                        className="p-2 hover:bg-gray-600"
                        onClick={() => {
                          setIsSendingMessage(true);
                          setMessageRecipient(user);
                        }}
                      >
                        Message user
                      </li>
                    </ul>
                  </button>
                </div>
              );
            })
          )}
        </div>
      </InfiniteScroll>

      {isBanningUser ? (
        BannedUser === null ? (
          <ModalOverlay IsOpen={isBanningUser} setIsOpen={setIsBanningUser}>
            <BanModal
              setIsBanningUser={setIsBanningUser}
              banningUser={banningUser}
              isUser={isUser}
            />
          </ModalOverlay>
        ) : null
      ) : null}

      {isSendingMessage ? (
        <ModalOverlay IsOpen={isSendingMessage} setIsOpen={setIsSendingMessage}>
          <MessageModal
            setIsSendingMessage={setIsSendingMessage}
            messageRecipient={messageRecipient}
            isUser={isUser}
          />
        </ModalOverlay>
      ) : null}
    </div>
  );
};

export default AccountsList;
