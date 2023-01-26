import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userOffline from '../../assets/user-offline.png';
import userOnline from '../../assets/user-online.png';
import { useAuth } from '../../contexts/user-context';
import { client } from '../../Utils/stream';
import UserCard from './UserCard';

const MessageModal = ({ setIsSendingMessage, messageRecipient, isUser }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const { user } = useAuth();
  const [isUserOnline, setIsUserOnline] = useState(false);

  const handleClickMessage = async () => {
    try {
      const channel = await client.channel('messaging', {
        members: [messageRecipient.id, user?.me?.id],
      });
      //await channel.create();
      const state = await channel.watch();
      // console.log(state);
      const channelMessage = await channel.sendMessage({
        text: `${message}`,
        mentioned_users: [messageRecipient.id],
      });

      setConversation((prev) => {
        if (prev) return [...prev, channelMessage?.message];
        return [channelMessage?.message];
      });
      setMessage('');
      navigate('/messages');
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    let isSubscribed = true;

    const queryChannels = async () => {
      const filter = {
        type: 'messaging',
        members: { $in: [messageRecipient.id] },
      };
      const sort = [{ last_message_at: -1 }];
      const channel = await client.queryChannels(filter, sort, {
        watch: true,
        state: true,
        presence: true,
      });
      console.log(channel?.[0]?.state);
      console.log(channel?.[0]?.state?.watchers?.[messageRecipient.id]?.online);
      setIsUserOnline(
        channel?.[0]?.state?.watchers?.[messageRecipient.id]?.online
      );

      if (isSubscribed) {
        setConversation(channel?.[0]?.state.messageSets?.[0]?.messages);
      }
    };

    queryChannels().catch(console.error);

    return () => {
      isSubscribed = false;
    };
  }, [message, messageRecipient.id]);

  return (
    <div className="relative flex h-full max-h-screen w-full max-w-7xl overflow-auto rounded-md bg-gray-900 font-cairo sm:h-3/4 sm:w-3/4 md:w-1/2">
      <FontAwesomeIcon
        className="absolute right-0 top-0 mr-1 cursor-pointer transition hover:text-orange-600"
        onClick={() => setIsSendingMessage(false)}
        icon={faClose}
        size="2x"
      />
      <div className="m-2 flex">
        <Tooltip title={isUserOnline ? 'online' : 'offline'}>
          <img
            className="h-4 w-4"
            src={isUserOnline ? userOnline : userOffline}
            alt="status"
          />
        </Tooltip>
        <UserCard item={messageRecipient} isUser={isUser} />
      </div>
      <div className="w-full p-2 font-cairo">
        <div className="p-4">
          {conversation?.map((msg) => (
            <div key={msg?.id} className="flex gap-4 space-y-4">
              <div className="flex flex-col items-center justify-center p-4">
                <img
                  className="h-8 w-8 rounded-full object-contain"
                  src={msg?.user?.image !== undefined ? msg?.user?.image : ''}
                  alt="avatar"
                />
                <h1 className="font-cairo text-xs capitalize opacity-60">
                  {msg?.user?.name}
                </h1>
              </div>
              <p
                className={`w-full font-sans ${
                  user?.me?.id !== msg?.user?.id
                    ? 'bg-green-300 text-black'
                    : null
                } rounded-md p-4 shadow-sm shadow-black`}
              >
                {msg?.text}
              </p>
            </div>
          ))}
        </div>

        <textarea
          rows="8"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Hey I would like to..."
          className="w-full rounded-md bg-transparent p-2 italic shadow-sm shadow-black placeholder:text-sm placeholder:opacity-60"
        />
        <button
          className="text-md my-1 mb-4 w-full cursor-pointer rounded-md bg-green-500 py-1 px-2 shadow-sm  shadow-green-500 
        hover:opacity-80"
          onClick={handleClickMessage}
        >
          send message
        </button>
      </div>
    </div>
  );
};

export default MessageModal;
