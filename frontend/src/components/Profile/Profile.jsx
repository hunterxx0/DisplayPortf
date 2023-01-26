import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/user-context';
import useGetUser from '../../hooks/useGetUser';
import ScrollToTop from '../../Utils/ScrollToTop';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import ProfileHome from './ProfileHome';

const Profile = () => {
  const { pathname } = useLocation();
  const { username } = useParams();
  const { user, logout } = useAuth();
  const { user: u, isLoading } = useGetUser(username);
  const under =
    pathname.split('/').length > 3 ? pathname.split('/').slice(-1)[0] : null;
  const isAvailable = user?.me?.role === 'user' && u?._id === user?.me?.id;

  if (!isLoading)
    return (
      <>
        <Header className="max-w-7xl" sticky={true} />
        <div className="m-auto mb-40 flex w-full flex-col items-center justify-center gap-8 lg:max-w-7xl">
          <ProfileHome user={u} u={user} />

          <div
            className="text-md flex w-full justify-center py-4 px-4 font-cairo shadow-sm  shadow-black md:gap-16"
            style={{ backgroundColor: '#231f20' }}
          >
            <Link
              className={`flex items-center gap-x-2 px-4 py-1 text-white  ${
                !under ? 'text-orange-400 shadow-xl shadow-black' : ''
              }`}
              to=""
            >
              <span className="">home</span>
            </Link>
            <Link
              className={`flex items-center gap-x-2 px-4 py-1 text-white  ${
                under === 'about'
                  ? 'text-orange-400 shadow-xl shadow-black'
                  : ''
              }`}
              to="about"
            >
              <span className="">about</span>
            </Link>
            {isAvailable ? (
              <>
                <Link
                  className={`flex items-center gap-x-2 px-4 py-1 text-white ${
                    under === 'favorites'
                      ? 'text-orange-400 shadow-xl shadow-black'
                      : ''
                  }`}
                  to={`favorites`}
                >
                  <span className="">favorites</span>
                </Link>
                <Link
                  className={`flex items-center gap-x-2 px-4 py-1 text-white ${
                    under === 'history'
                      ? 'text-orange-400 shadow-xl shadow-black'
                      : ''
                  }`}
                  to={`history`}
                >
                  <span className="">history</span>
                </Link>
                <Link
                  className={`flex items-center gap-x-2 px-4 py-1 text-white ${
                    under === 'requests'
                      ? 'text-orange-400 shadow-xl shadow-black'
                      : ''
                  }`}
                  to={`requests`}
                >
                  <span className="">requests</span>
                </Link>
                <Link
                  className={`flex items-center gap-x-2 px-4 py-1 text-white  ${
                    under === 'following'
                      ? 'text-orange-400 shadow-xl shadow-black'
                      : ''
                  }`}
                  to="following"
                >
                  <span className="">following</span>
                </Link>
              </>
            ) : null}
          </div>

          <ScrollToTop />
          <Outlet context={{ user: u, logout, u: user, isLoading }} />
        </div>
        <div>
          <div className="py-4"></div>
          <div
            className="w-full shadow-sm shadow-gray-800"
            style={{ backgroundColor: '#231f20' }}
          >
            <Footer className="max-w-7xl" />
          </div>
        </div>
      </>
    );
};

export default Profile;
