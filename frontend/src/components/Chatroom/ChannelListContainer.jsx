import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChannelList, useChatContext } from 'stream-chat-react';
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from '.';
import doubleLeft from '../../assets/double-left.png';
import doubleRight from '../../assets/double-right.png';
import logo from '../../assets/logo.svg';
import LogoutIcon from '../../assets/logout.png';

const SideBar = ({ client }) => {
  return (
    <div className="channel-list__sidebar">
      <div className="channel-list__sidebar__icon1">
        <div className="icon1__inner">
          <Link className="hover:rotate-180 hover:animate-spin" to="/">
            <img className="h-8 w-8 sm:h-12 sm:w-12" src={logo} alt="logo" />
          </Link>
        </div>
      </div>
      <div className="channel-list__sidebar__icon2 relative box-border  cursor-default transition-all hover:border-2 hover:border-orange-600">
        <div className="icon1__inner ">
          <img
            className="peer rounded-full object-cover"
            src={client.user?.image}
            alt="profile"
          />
          <div
            className="invisible absolute left-full bottom-full whitespace-nowrap rounded-lg rounded-bl-none
          bg-black px-2 text-center font-sans text-sm font-thin text-white opacity-60 transition-all 
         peer-hover:visible"
          >
            {client.user?.name}
          </div>
        </div>
      </div>
      {/* <div className="channel-list__sidebar__icon2">
        <div className="icon1__inner" onClick={logout}>
          <img src={LogoutIcon} alt="Logout" width="30" />
        </div>
      </div> */}
    </div>
  );
};

const CompanyHeader = () => (
  <div className="channel-list__header">
    <p className="channel-list__header__text text-center">
      <Link className="hover:rotate-180 hover:animate-spin" to="/">
        <span
          className="text-md mx-auto fill-transparent stroke-white stroke-2 font-sans uppercase tracking-widest  
        shadow-amber-300 drop-shadow-md"
        >
          Display
        </span>
      </Link>
    </p>
  </div>
);

const customChannelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type === 'team');
};

const customChannelMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === 'messaging');
};

const ChannelListContent = ({
  isCreating,
  setIsCreating,
  setCreateType,
  setIsEditing,
  setToggleContainer,
}) => {
  const { client } = useChatContext();

  const filters = { members: { $in: [client.userID] } };

  return (
    <>
      <SideBar client={client} />
      <div className="channel-list__list__wrapper">
        <CompanyHeader />
        <ChannelSearch setToggleContainer={setToggleContainer} />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelTeamFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="team"
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
              type="team"
            />
          )}
        />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelMessagingFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="messaging"
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
              type="messaging"
            />
          )}
        />
      </div>
    </>
  );
};

const ChannelListContainer = ({
  setCreateType,
  setIsCreating,
  setIsEditing,
}) => {
  const [toggleContainer, setToggleContainer] = useState(false);

  return (
    <>
      <div className="channel-list__container">
        <ChannelListContent
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />
      </div>

      <div
        className="channel-list__container-responsive"
        style={{
          left: toggleContainer ? '0%' : '-89%',
          backgroundColor: '#005fff',
        }}
      >
        <div
          className="channel-list__container-toggle"
          onClick={() =>
            setToggleContainer((prevToggleContainer) => !prevToggleContainer)
          }
          style={{
            backgroundImage: !toggleContainer
              ? `url(${doubleRight})`
              : `url(${doubleLeft})`,
          }}
        ></div>
        <ChannelListContent
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
          setToggleContainer={setToggleContainer}
        />
      </div>
    </>
  );
};

export default ChannelListContainer;
