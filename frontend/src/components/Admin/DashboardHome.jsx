import {
  faBan,
  faBuilding,
  faFlag,
  faMessage,
  faSignal,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { client } from '../../Utils/stream';

const DashboardHome = () => {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    const queryStats = async () => {
      const [
        { users },
        { users: bannedUsers },
        // { users: onlineUsers },
        { users: sellers },
        { users: bannedSellers },
        // { users: onlineSellers },
        channels,
      ] = await Promise.all([
        client.queryUsers({ role: 'user' }),
        client.queryUsers({ role: 'user', banned: true }),
        // client.queryUsers(
        //   { role: 'user', online: true },
        //   {},
        //   { presence: true }
        // ),
        client.queryUsers({ role: 'seller' }),
        client.queryUsers({ role: 'seller', banned: true }),
        // client.queryUsers(
        //   { role: 'seller', online: true },
        //   {},
        //   { presence: true }
        // ),
        client.queryChannels(),
      ]);
      console.log('users:', users);
      console.log('banned users:', bannedUsers);
      // console.log('online users:', onlineUsers);
      console.log('sellers:', sellers);
      console.log('banned sellers:', bannedSellers);
      // console.log('online sellers:', onlineSellers);
      console.log('channels:', channels);

      setCounts({
        users: users.length,
        // onlineUsers: onlineUsers.length,
        bannedUsers: bannedUsers.length,
        sellers: sellers.length,
        // onlineSellers: onlineSellers.length,
        bannedSellers: bannedSellers.length,
        channels: channels.length,
      });
    };

    queryStats();
  }, []);

  return (
    <div className="w-full p-4">
      <div className="flex flex-wrap justify-center gap-8 rounded-lg bg-gray-900 p-8 font-cairo  shadow-sm shadow-black">
        <div className="flex flex-1 flex-col gap-2 rounded-lg py-4 px-8 shadow-sm shadow-black">
          <h1 className="p-4 text-center font-cairo text-3xl font-bold ">
            Users
          </h1>
          <div className="flex flex-col items-center justify-center gap-4 whitespace-nowrap rounded-lg bg-gray-800 p-6 text-3xl shadow-md shadow-black">
            <Tooltip title="Users accounts" placement="left-end">
              <span>{counts?.users}</span>
            </Tooltip>
            <Tooltip title="accounts" placement="left-end">
              <FontAwesomeIcon color="orange" icon={faUser} size="sm" />
            </Tooltip>
          </div>
          {/* <div className="flex flex-col items-center justify-center gap-4 whitespace-nowrap rounded-lg bg-gray-800 p-6 text-3xl shadow-md shadow-black">
            <Tooltip title="Online Users" placement="left-end">
              <span>{counts?.onlineUsers}</span>
            </Tooltip>
            <Tooltip title="online" placement="left-end">
              <FontAwesomeIcon color="orange" size="sm" icon={faSignal} />
            </Tooltip>
          </div> */}
          <div className="flex flex-col items-center justify-center gap-4 whitespace-nowrap rounded-lg bg-gray-800 p-6 text-3xl shadow-md shadow-black">
            <Tooltip title="Banned users" placement="left-end">
              <span>{counts?.bannedUsers}</span>
            </Tooltip>
            <Tooltip title="bans" placement="left-end">
              <FontAwesomeIcon color="orange" size="sm" icon={faBan} />
            </Tooltip>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-2 rounded-lg py-4 px-8 shadow-sm shadow-black">
          <h1 className="p-4 text-center font-cairo text-3xl font-bold ">
            Sellers
          </h1>
          <div className="flex flex-col items-center justify-center gap-4 whitespace-nowrap rounded-lg bg-gray-800 p-6 text-3xl shadow-md shadow-black">
            <Tooltip title="Sellers accounts" placement="left-end">
              <span>{counts?.sellers}</span>
            </Tooltip>
            <Tooltip title="accounts" placement="left-end">
              <FontAwesomeIcon color="orange" size="sm" icon={faBuilding} />
            </Tooltip>
          </div>
          {/* <div className="flex flex-col items-center justify-center gap-4 whitespace-nowrap rounded-lg bg-gray-800 p-6 text-3xl shadow-md shadow-black">
            <Tooltip title="Online sellers" placement="left-end">
              <span>{counts?.onlineSellers}</span>
            </Tooltip>
            <Tooltip title="online" placement="left-end">
              <FontAwesomeIcon color="orange" size="sm" icon={faSignal} />
            </Tooltip>
          </div> */}
          <div className="flex flex-col items-center justify-center gap-4 whitespace-nowrap rounded-lg bg-gray-800 p-6 text-3xl shadow-md shadow-black">
            <Tooltip title="Banned sellers" placement="left-end">
              <span>{counts?.bannedSellers}</span>
            </Tooltip>
            <Tooltip title="bans" placement="left-end">
              <FontAwesomeIcon color="orange" size="sm" icon={faBan} />
            </Tooltip>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-2 rounded-lg py-4 px-8 shadow-sm shadow-black">
          <h1 className="whitespace-nowrap p-4 text-center font-cairo text-3xl font-bold ">
            Channels
          </h1>
          <div className="flex flex-col items-center justify-center gap-4 whitespace-nowrap rounded-lg bg-gray-800 p-6 text-3xl shadow-md shadow-black">
            <Tooltip title="Channels" placement="left-end">
              <span>{counts?.channels}</span>
            </Tooltip>
            <Tooltip title="channels" placement="left-end">
              <FontAwesomeIcon color="orange" size="sm" icon={faMessage} />
            </Tooltip>
          </div>
          {/* <div className="flex flex-col items-center justify-center gap-4 whitespace-nowrap rounded-lg bg-gray-800 p-6 text-3xl shadow-md shadow-black">
            <Tooltip title="Flagged messages" placement="left-end">
              <span>5</span>
            </Tooltip>
            <Tooltip title="message flags" placement="left-end">
              <FontAwesomeIcon color="orange" size="sm" icon={faFlag} />
            </Tooltip>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
