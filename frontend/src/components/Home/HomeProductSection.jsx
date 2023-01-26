import React, { useRef } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import useUtils from '../../Utils/useUtils';
import WithToggle from '../HOC/WithToggle';
import ProductCard from '../Products/ProductCard';
import './HomeExplore.css';

const HomeProductSection = ({ title, products, user, u, noLinks = false }) => {
  const elContainer = useRef();
  const { SORT, TITLES } = useUtils();
  const ProductCardWithToggle = WithToggle(ProductCard);

  const HandleScrollLeft = () => {
    if (elContainer.current.scrollLeft) elContainer.current.scrollLeft -= 290;
  };

  const HandleScrollRight = () => {
    elContainer.current.scrollLeft += 290;
  };

  return (
    <>
      <div className="md:py-4">
        <div className="flex w-full  flex-col items-center justify-between whitespace-normal p-8 sm:flex-row">
          <div className="flex items-center justify-between">
            <div className="w-full">
              <h2
                className="bg-gradient-to-br from-orange-700 to-white bg-clip-text text-center font-cairo text-2xl font-black uppercase 
                      text-orange-200 transition-all duration-75 hover:text-transparent"
              >
                {noLinks ? (
                  TITLES[title]
                ) : title !== 'Recently Viewed Products' ? (
                  <Link to={`products?sort=${SORT[title]}`} state={{ user, u }}>
                    {TITLES[title]}
                  </Link>
                ) : (
                  <Link to={`user/${user._id}/history`}>{TITLES[title]}</Link>
                )}
              </h2>
            </div>
          </div>
          {noLinks ? (
            ''
          ) : title !== 'Recently Viewed Products' ? (
            <>
              <Link to={`products?sort=${SORT[title]}`} state={{ user, u }}>
                <button
                  className="rounded-sm bg-transparent px-4 py-1 font-cairo text-orange-200 shadow-sm 
                      shadow-orange-200 hover:opacity-80"
                >
                  see more
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to={`/user/${user._id}/history`}>
                <button
                  className="rounded-sm bg-transparent px-4 py-1 font-cairo text-orange-200 shadow-sm 
                shadow-orange-200 hover:opacity-80"
                >
                  see more
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
      <div
        className="container w-screen rounded-b-lg bg-orange-400 p-2 px-0  sm:mb-8 md:max-w-7xl"
        style={{ backgroundColor: '#231f20' }}
      >
        <div className="flex flex-col font-serif tracking-widest shadow-sm "></div>
        <div className="relative flex items-center justify-center">
          <MdChevronLeft
            onClick={HandleScrollLeft}
            className="cursor-pointer text-orange-200 opacity-50 transition-all duration-300 ease-in-out hover:opacity-100 "
            size={40}
          />

          <div
            className="flex w-full max-w-7xl  overflow-x-scroll scroll-smooth  py-0 font-sans transition-all scrollbar-hide"
            ref={elContainer}
          >
            {/*mx-auto*/}
            <div className=" flex flex-nowrap items-center gap-x-1 md:gap-x-4">
              {products?.slice(0, 8).map((product, index) => (
                <ProductCardWithToggle
                  product={product}
                  user={user}
                  u={u}
                  key={product?._id || uuidv4()}
                  index={index}
                />
              ))}
            </div>
          </div>
          <MdChevronRight
            onClick={HandleScrollRight}
            className="cursor-pointer text-orange-200 opacity-50 transition-all duration-300 ease-in-out hover:opacity-100  "
            size={40}
          />
        </div>
      </div>
      <div className="p-4"></div>
    </>
  );
};

export default HomeProductSection;
