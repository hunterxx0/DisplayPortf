import React, { useState } from 'react';
import { Avatar, Channel, MessageTeam } from 'stream-chat-react';
import { ChannelInner, CreateChannel, EditChannel } from '.';

const ChannelContainer = ({
  isCreating,
  setIsCreating,
  isEditing,
  setIsEditing,
  createType,
}) => {
  // get the channel members so while editing we can have them already checked

  if (isCreating) {
    return (
      <div className="channel__container">
        <CreateChannel createType={createType} setIsCreating={setIsCreating} />
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="channel__container">
        <EditChannel setIsEditing={setIsEditing} />
      </div>
    );
  }

  const EmptyState = () => (
    <div className="channel-empty__container">
      <p className="channel-empty__first">
        This is the beginning of your chat history.
      </p>
      <p className="channel-empty__second">
        Send messages, attachments, links, emojis, and more!
      </p>
    </div>
  );

  const CustomThreadHeader = ({ thread, closeThread }) => {
    const replyCount = thread?.reply_count;
    const threadParticipants = thread?.thread_participants || [];
    return (
      <div className="wrapper">
        <div className="participants-wrapper">
          {threadParticipants.map((participant) => (
            <div className="participant" key={participant.created_at}>
              <Avatar image={participant.image} name={participant.name} />
            </div>
          ))}
          <div className="reply-count">{replyCount} Replies</div>
        </div>
        <div onClick={(event) => closeThread(event)} className="close-button">
          <div className="left">
            <div className="right"></div>
          </div>
        </div>
      </div>
    );
  };

  const CustomThreadStart = (props) => {};

  return (
    <div className=" channel__container">
      <Channel
        EmptyStateIndicator={EmptyState}
        // Message={(messageProps, i) => <MessageTeam key={i} {...messageProps} />}
        ThreadHeader={CustomThreadHeader}
        ThreadStart={CustomThreadStart}
      >
        <ChannelInner setIsEditing={setIsEditing} />
      </Channel>
    </div>
  );
};

export default ChannelContainer;
