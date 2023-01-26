import { faEllipsisVertical, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useEvents } from '../../hooks/useEvents';
import LoadingSpinner from '../../Utils/LoadingSpinner';
import ModalOverlay from '../../Utils/ModalOverlay';
import { client } from '../../Utils/stream';
import BanModal from './BanModal';

const Flags = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [flags, setFlags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [banningUser, setBanningUser] = useState(null);
  const [isBanningUser, setIsBanningUser] = useState(false);
  const [BannedUser, setBannedUser] = useState(null);
  const [isUser, setIsUser] = useState(true);

  const { openMenu, setOpenMenu } = useEvents();

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

  const fetchFlags = async () => {
    try {
      setIsLoading(true);
      const channels = await client.queryChannels({}, { created_at: -1 });

      let messageFlags = [];

      for (const channel of channels) {
        const msgFlags = await client.queryMessageFlags({
          channel_cid: channel.cid,
          // is_reviewed: false,
        });

        msgFlags?.flags.length && messageFlags.push(...msgFlags?.flags);
      }
      console.log(messageFlags);
      setFlags(messageFlags);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFlags();
  }, []);

  useEffect(() => {}, []);

  return (
    <div className="w-full p-4">
      <div className="grid w-full grid-cols-7 justify-items-center p-2 font-cairo text-xl font-bold uppercase text-orange-200">
        <p>User</p>
        <p>Channel</p>
        <p>Message</p>
        <p>Last Update</p>
        <p>Flagged By</p>
        <p></p>
      </div>
      {!isLoading ? (
        <div className="p-2 font-cairo shadow-sm shadow-black">
          {flags.map((flag) => (
            <div
              key={uuidv4()}
              className="grid grid-cols-7 items-center justify-items-center gap-4 py-4 "
            >
              <div className="flex w-full flex-col items-center">
                <div className="h-16 w-16 flex-1 rounded-full p-2">
                  <img
                    className=" rounded-full object-cover shadow-sm shadow-black"
                    src={flag.message.user.image}
                    alt="avatar"
                  />
                </div>
                <p className="flex-1 text-red-500">{flag.message.user.name}</p>
              </div>
              <p>{flag.message.cid}</p>
              <p>
                {flag.message.text.substring(0, 10)}
                {flag.message.text.length > 10 ? '...' : null}
              </p>
              <p>{moment(new Date(flag.updated_at)).fromNow()}</p>
              <p>{flag.user.name}</p>
              <button className="hover:text-orange-600">
                <FontAwesomeIcon icon={faEye} />
              </button>
              <div className="relative text-sm">
                <button
                  className="btn__menu hover:text-orange-600"
                  onClick={async () => {
                    const response = await client.queryUsers({
                      id: flag.message.user.id,
                      banned: true,
                    });
                    if (response?.users?.length)
                      setBannedUser(flag.message.user.id);
                    else setBannedUser(null);

                    setOpenMenu((prev) =>
                      flag.message.id !== prev ? flag.message.id : null
                    );
                  }}
                >
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </button>
                {openMenu === flag.message.id ? (
                  <div className="absolute top-5 right-0  w-48 space-y-4 rounded-lg rounded-tr-none py-4 shadow-sm shadow-black">
                    {BannedUser === null ? (
                      <button
                        className="w-full text-lg font-bold transition hover:bg-red-500"
                        onClick={() => {
                          setIsBanningUser(true);
                          setBanningUser(flag.message.user);
                          setIsUser(flag.message.user.role);
                          setOpenMenu(null);
                        }}
                      >
                        ban user
                      </button>
                    ) : (
                      <button
                        className="w-full text-center text-lg font-bold transition hover:bg-red-500"
                        onClick={async () => {
                          try {
                            await client.unbanUser(flag.message.user.id);
                          } catch (err) {
                            console.error(err);
                          } finally {
                            enqueueSnackbar(
                              `${flag.message.user.name} is unbanned`,
                              {
                                action,
                              }
                            );
                            setOpenMenu(null);
                          }
                        }}
                      >
                        unban user
                      </button>
                    )}
                    <button
                      className="w-full text-center text-lg font-bold transition hover:bg-red-500"
                      onClick={async () => {
                        try {
                          await client.deleteUser(flag.message.user.id, {
                            delete_conversation_channels: true,
                            mark_messages_deleted: true,
                            hard_delete: true,
                          });
                          await fetchFlags();
                        } catch (err) {
                          console.error(err);
                        } finally {
                          enqueueSnackbar(
                            `${flag.message.user.name} account is deleted`,
                            {
                              action,
                            }
                          );
                          setOpenMenu(null);
                        }
                      }}
                    >
                      hard delete user
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <LoadingSpinner />
      )}

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
    </div>
  );
};

export default Flags;
