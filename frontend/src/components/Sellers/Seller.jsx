import React from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/user-context';
import { useGetSeller } from '../../hooks/useGetSeller';
import LoadingSpinner from '../../Utils/LoadingSpinner';
import ModalOverlay from '../../Utils/ModalOverlay';
import ScrollToTop from '../../Utils/ScrollToTop';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import SellerHome from './SellerHome';

const Seller = () => {
  const { pathname } = useLocation();
  const { sellername } = useParams();
  const { seller, loading } = useGetSeller(sellername);
  const { user } = useAuth();

  const under =
    pathname.split('/').length > 3 ? pathname.split('/').slice(-1)[0] : null;

  if (loading)
    return (
      <ModalOverlay>
        <LoadingSpinner />
      </ModalOverlay>
    );
  return (
    <>
      <Header />
      <div className="m-auto mb-40 flex w-full flex-col items-center justify-center  gap-8 lg:max-w-7xl">
        <div className=" w-full p-4">
          <SellerHome seller={seller} />
        </div>
        <div
          className="text-md flex w-full justify-center  py-2 font-cairo shadow-sm  shadow-black md:gap-16"
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
          {user?.me?.role === 'seller' ? (
            <Link
              className={`flex items-center gap-x-2 px-4 py-1 text-white  ${
                under === 'plan' ? 'text-orange-400 shadow-xl shadow-black' : ''
              }`}
              to={{ pathname: 'plan' }}
            >
              <span className="">plan</span>
            </Link>
          ) : null}
          <Link
            className={`flex items-center gap-x-2 px-4 py-1 text-white  ${
              under === 'about' ? 'text-orange-400 shadow-xl shadow-black' : ''
            }`}
            to={{ pathname: 'about' }}
          >
            <span className="">about</span>
          </Link>
          <Link
            className={`flex items-center gap-x-2 px-4 py-1 text-white ${
              under === 'products'
                ? 'text-orange-400 shadow-xl shadow-black'
                : ''
            }`}
            to={{ pathname: 'products' }}
          >
            <span className="">products</span>
          </Link>
          {user?.me?.role === 'seller' && seller.name === user?.me?.name ? (
            <Link
              className={`flex items-center gap-x-2 px-4 py-1 text-white ${
                under === 'requests'
                  ? 'text-orange-400 shadow-xl shadow-black'
                  : ''
              }`}
              to={{ pathname: 'requests' }}
            >
              <span className="">requests</span>
            </Link>
          ) : null}
          {user?.me?.role === 'seller' && seller.name === user?.me?.name ? (
            <Link
              className={`flex items-center gap-x-2 px-4 py-1 text-white  ${
                under === 'followers'
                  ? 'text-orange-400 shadow-xl shadow-black'
                  : ''
              }`}
              to={`/seller/${seller.name}/followers`}
            >
              <span className="">followers</span>
            </Link>
          ) : null}
        </div>

        <ScrollToTop />
        <>
          <div className="relative m-4 h-full w-full max-w-7xl">
            <Outlet context={[seller]} />
          </div>
        </>
      </div>
      <Footer className="max-w-7xl" />
    </>
  );
};

export default Seller;
