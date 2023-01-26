import ClearIcon from '@mui/icons-material/Clear';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteAllRecentlySearchedProducts } from '../../../apis/deleteAllRecentlySearchedProducts';
import { deleteRecentlySearchedProduct } from '../../../apis/deleteRecentlySearchedProduct';
import { useAddRecentlySearchedProduct } from '../../../hooks/useAddRecentlySearchedProduct';
import DescriptionFormatted from '../../../Utils/DescriptionFormatted';
import LoadingSpinner from '../../../Utils/LoadingSpinner';
import ModalOverlay from '../../../Utils/ModalOverlay';

const SearchResults = ({
  user,
  results,
  recentlySearched,
  setSearch,
  showSearchDraw,
}) => {
  const [newUser, setNewUser] = useState(undefined);
  const { isLoading, isError } = useAddRecentlySearchedProduct(
    setNewUser,
    recentlySearched,
    user
  );

  const handleClickToClear = () => {
    deleteAllRecentlySearchedProducts(user?.me?.id)
      .then((user) => setNewUser(user))
      .catch(console.error);
  };

  const handleClick = (searchItemToRemove) => {
    deleteRecentlySearchedProduct(searchItemToRemove, user?.me?.id)
      .then((user) => setNewUser(user))
      .catch(console.error);
  };

  if (isLoading)
    return (
      <ModalOverlay>
        <LoadingSpinner />
      </ModalOverlay>
    );

  if (isError) return <div>Something went wrong!</div>;

  return (
    <>
      {newUser?.recently_searched?.length ? (
        <div className="flex flex-col">
          <p className="px-4 py-2  font-cairo text-white">
            you recently searched for:
          </p>

          <div className="w-100 flex flex-wrap items-center gap-4 px-4">
            {newUser?.recently_searched?.map((searched, index) => (
              <div key={index} className="group relative">
                <p
                  className="cursor-pointer whitespace-nowrap rounded-full px-4 font-cairo text-lg text-orange-200 
          shadow-md shadow-black hover:bg-blue-gray-800"
                  onClick={() => setSearch(searched)}
                >
                  {searched}
                </p>
                <p
                  className="absolute -right-2 -top-2  hidden text-white group-hover:block"
                  onClick={() => handleClick(searched)}
                >
                  <CloseIcon
                    className="cursor-pointer transition hover:text-orange-600"
                    fontSize="medium"
                  />
                </p>
              </div>
            ))}
            <button
              className="px-4 text-orange-200 hover:text-orange-600"
              onClick={handleClickToClear}
            >
              <ClearIcon fontSize="small" />
              <p className="font-cairo text-xs font-thin">clear all</p>
            </button>
          </div>
        </div>
      ) : (
        ''
      )}
      <div className="scrollbar flex flex-col gap-4 overflow-y-auto p-2 text-orange-200">
        {results.map((product) => (
          <Link
            to={`/products/${product._id}`}
            key={product._id}
            onClick={showSearchDraw}
          >
            <div className="flex cursor-pointer  flex-col bg-gray-900  shadow-sm shadow-black hover:bg-gray-800 sm:flex-row">
              <div className="w-32">
                <img
                  className="object-cover"
                  src={product.pics_url.length > 0 ? product.pics_url[0] : ''}
                  alt=""
                />
              </div>
              <div className="flex w-full flex-col  px-4">
                <div className="font-cairo text-2xl ">{product.title}</div>

                <div className="text-md py-2 text-justify font-sans text-white">
                  {product.descriptions.length > 10 ? (
                    <DescriptionFormatted description={product.descriptions} />
                  ) : (
                    product.descriptions
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default SearchResults;
