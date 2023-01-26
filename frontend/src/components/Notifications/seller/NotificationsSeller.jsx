import DoneIcon from '@mui/icons-material/Done';
import InboxIcon from '@mui/icons-material/Inbox';
import React, { useState } from 'react';
import ScrollToTop from '../../../Utils/ScrollToTop';
import Footer from '../../Footer/Footer';
import Header from '../../Header/Header';
import InboxNotifs from './InboxNotifs';
import ReadNotifs from './ReadNotifs';

const NotificationsSeller = () => {
  const [selectedMenu, setSelectedMenu] = useState(1);

  const handleClick = (val) => {
    if (val !== selectedMenu) setSelectedMenu(val);
  };

  return (
    <>
      <Header />
      <div
        className="mx-auto flex max-w-7xl flex-col gap-x-6 p-4 text-orange-200 md:flex-row"
        style={{ backgroundColor: '#231f20' }}
      >
        <div className="flex w-full  flex-col  gap-y-4 p-4 text-center font-cairo  md:w-[25%]">
          <div
            className={`flex cursor-pointer items-center gap-x-4 rounded-md p-2 capitalize duration-75 ease-linear  ${
              selectedMenu === 1 ? 'bg-orange-900' : 'hover:bg-gray-600'
            }`}
            onClick={() => handleClick(1)}
          >
            <InboxIcon /> Inbox
          </div>
          <div
            className={`flex cursor-pointer items-center gap-x-4 rounded-md p-2 capitalize  duration-75 ease-linear  ${
              selectedMenu === 2 ? 'bg-orange-900' : 'hover:bg-gray-600'
            }`}
            onClick={() => handleClick(2)}
          >
            <DoneIcon /> Done
          </div>
        </div>
        <div className="flex w-full justify-center gap-x-4 p-4 md:w-[75%]">
          {selectedMenu === 1 ? <InboxNotifs /> : <ReadNotifs />}
        </div>
      </div>
      <ScrollToTop />
      <Footer />
    </>
  );
};

export default NotificationsSeller;
