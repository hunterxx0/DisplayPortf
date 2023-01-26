import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/user-context';

// admin links
const AdminProfileDraw = () => {
  const { user } = useAuth();

  return (
    <>
      {/* <Link
          className="flex items-center gap-2 rounded-md border-r-4 border-l-4 border-r-orange-300 border-l-orange-300 px-2 hover:bg-gray-500"
          to={`/admin/${id}`}
        >
          <FontAwesomeIcon icon={faUser} size="sm" />
          <span className="">Profile</span>
        </Link> */}
      <Link
        className="flex items-center gap-2 rounded-md border-r-4 border-l-4 border-r-orange-300 border-l-orange-300 px-2 hover:bg-gray-500"
        to={`admin/${user?.me?.id}/dashboard`}
      >
        <FontAwesomeIcon icon={faUser} size="sm" />
        <span className="">Dashboard</span>
      </Link>
      {/* <Link
          className="flex items-center gap-2 rounded-md border-r-4 border-l-4 border-r-orange-300 border-l-orange-300 px-2 hover:bg-gray-500"
          to={`/notifications`}
        >
          <FontAwesomeIcon icon={faBell} size="sm" />
          <span className="">Notifications</span>
        </Link> */}
    </>
  );
};

export default AdminProfileDraw;
