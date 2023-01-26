import React, { useEffect, useState } from 'react';
import {
  Avatar,
  MessageInput,
  MessageList,
  Thread,
  useChannelActionContext,
  useChannelStateContext,
  useChatContext,
  Window,
} from 'stream-chat-react';

import moment from 'moment';
import { ChannelInfo } from '../../assets/ChannelInfo';
import userOffline from '../../assets/user-offline.png';
import userOnline from '../../assets/user-online.png';

export const GiphyContext = React.createContext({});

const ChannelInner = ({ setIsEditing, setChannelMembers }) => {
  const [giphyState, setGiphyState] = useState(false);
  const { sendMessage } = useChannelActionContext();

  const overrideSubmitHandler = (message) => {
    let updatedMessage = {
      attachments: message.attachments,
      mentioned_users: message.mentioned_users,
      parent_id: message.parent?.id,
      parent: message.parent,
      text: message.text,
    };

    if (giphyState) {
      updatedMessage = { ...updatedMessage, text: `/giphy ${message.text}` };
    }

    if (sendMessage) {
      sendMessage(updatedMessage);
      setGiphyState(false);
    }
  };

  return (
    <GiphyContext.Provider value={{ giphyState, setGiphyState }}>
      <div style={{ display: 'flex', width: '100%' }}>
        <Window>
          <TeamChannelHeader setIsEditing={setIsEditing} />
          <MessageList />
          <MessageInput overrideSubmitHandler={overrideSubmitHandler} />
        </Window>
        <Thread />
      </div>
    </GiphyContext.Provider>
  );
};

const TeamChannelHeader = ({ setIsEditing }) => {
  const { channel, watcher_count, members, read, watchers } =
    useChannelStateContext();
  const { client } = useChatContext();

  const MessagingHeader = () => {
    const membersWithoutMe = Object.values(members).filter(
      ({ user }) => user.id !== client.userID
    );
    const [onlineUsers, setonlineUsers] = useState(
      Object.values(membersWithoutMe).filter(
        ({ user }) => user.online && user.id !== client.userID
      )
    );
    const [offlineUsers, setofflineUsers] = useState(
      Object.values(membersWithoutMe).filter(
        ({ user }) => !user.online && user.id !== client.userID
      )
    );

    // const [readAt, setReadAt] = useState(
    //   Object.keys(read).map((key) => {
    //     if (key !== client.userID) return read[key];
    //   })
    // );

    const additionalMembers = membersWithoutMe.length - 3;

    useEffect(() => {
      // console.log(channel);
      (async () => {
        await channel.watch({ presence: true });
        client.on((event) => {
          const { type } = event;
          // console.log("client event", event);
          // console.log(client.state);

          if (type === `user.watching.${'start' || 'stop'}`) {
            setonlineUsers(
              Object.values(client.state.users).filter(
                (user) =>
                  user.online &&
                  user.id === client.userID &&
                  user.id === membersWithoutMe[0]?.user_id
              )
            );

            setofflineUsers(
              Object.values(client.state.users).filter(
                (user) =>
                  !user.online &&
                  user.id !== client.userID &&
                  user.id === membersWithoutMe[0]?.user_id
              )
            );

            // const x = Object.keys(client.state.read).filter(
            //   (key) => key !== client.userID
            // );
            // console.log(x);
            // const y = client.state.read[x[0]];
            // setReadAt(moment(y, "YYYYMMDD").fromNow());
          }
        });
      })();
    }, []);

    if (channel.type === 'messaging') {
      // console.log(channel);
      // console.log(read);
      // console.log(readAt);
      // console.log("onlineUsers", onlineUsers);
      // console.log("offlineUser", offlineUsers);

      // Needs fixing
      const activeSince = () => {
        const users =
          onlineUsers.length > offlineUsers.length ? onlineUsers : offlineUsers;
        // console.log(users);
        const seen = new Date(users[0]?.user.last_active);

        return moment(seen, 'YYYYMMDD').fromNow();
      };

      return (
        <div className="team-channel-header__name-wrapper">
          {membersWithoutMe.map(({ user }, i) => (
            <div key={i} className="team-channel-header__name-multi">
              <Avatar
                image={user.image}
                name={user.name || user.id}
                size={32}
              />
              <p
                className="team-channel-header__name user"
                style={{ position: 'relative' }}
              >
                <img
                  src={onlineUsers?.length > 0 ? userOnline : userOffline}
                  alt=""
                  style={{
                    width: '15px',
                    height: '15px',
                    position: 'absolute',
                    right: '0%',
                  }}
                />
              </p>

              {`${activeSince()}`}
            </div>
          ))}

          {additionalMembers > 0 && (
            <p className="team-channel-header__name user">
              and {additionalMembers} more
            </p>
          )}
        </div>
      );
    }

    const getWatcherText = (watchers = 0) => {
      if (!watchers) return 'No users active';
      if (watchers === 1) return '1 active';
      return `${watchers} active`;
    };

    const isOwner =
      Object.values(members).filter((member) => member.role === 'owner')[0]
        ?.user_id === client.userID || false;
    return (
      <>
        <div className="team-channel-header__channel-wrapper">
          <p className="team-channel-header__name"># {channel.data.name}</p>
          <span
            style={{ display: isOwner ? 'flex' : 'none' }}
            onClick={() => setIsEditing(true)}
          >
            <ChannelInfo />
          </span>
        </div>
        <div className="team-channel-header__right">
          <p className="team-channel-header__right-text">
            {getWatcherText(onlineUsers?.length)}
          </p>
          {!onlineUsers?.length ? (
            ''
          ) : (
            <div className="participants-wrapper">
              {onlineUsers.map((user) => (
                <div className="participant" key={user.created_at}>
                  <Avatar image={user.image} name={user.name} />
                </div>
              ))}
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="team-channel-header__container">
      <MessagingHeader />
    </div>
  );
};

export default ChannelInner;
