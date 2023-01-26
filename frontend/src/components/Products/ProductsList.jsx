import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Tooltip } from '@mui/material';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useLocation, useSearchParams } from 'react-router-dom';
import Select from 'react-select';
import useGetProductsByPage from '../../hooks/useGetProductsByPage';
import LoadingSpinner from '../../Utils/LoadingSpinner';
import ModalOverlay from '../../Utils/ModalOverlay';
import ScrollToTop from '../../Utils/ScrollToTop';
import useUtils from '../../Utils/useUtils';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import AddProduct from './Add/AddProduct';
import ProductCard from './ProductCard';

const ProductsList = ({ toggle, isVisible }) => {
  const { customStyles, options } = useUtils();
  const {
    state: { user, u },
  } = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  const [addingProduct, setIsAddingProduct] = useState(false);

  const {
    items,
    isLoading,
    hasMore,
    setSearchOption,
    searchOption,
    getProductsNext,
  } = useGetProductsByPage(searchParams);

  const handleQuery = (e) => {
    setSearchOption({
      value: e.value,
      label: e.value,
    });
    setSearchParams({ sort: e.value }, { state: { user, u } });
  };

  if (isLoading || !items.length)
    return (
      <ModalOverlay>
        <LoadingSpinner />
      </ModalOverlay>
    );

  return (
    <>
      <Header className="max-w-7xl" sticky={true} />
      <div className=" m-auto flex w-full flex-col items-center justify-center lg:max-w-7xl">
        {addingProduct ? (
          <AddProduct
            addingProduct={addingProduct}
            setIsAddingProduct={setIsAddingProduct}
          />
        ) : (
          <>
            <div className=" flex  items-center self-end ">
              <div className="flex w-full justify-end">
                <Select
                  styles={customStyles}
                  options={options}
                  value={searchOption}
                  onChange={handleQuery}
                />
              </div>
              {u?.role === 'seller' ? (
                <div>
                  <Tooltip title="Add product">
                    <button
                      className="rounded-md p-0.5 font-cairo font-extrabold  hover:opacity-80"
                      style={{ color: 'rgb(26,21,21)' }}
                      onClick={() => {
                        setIsAddingProduct(true);
                      }}
                    >
                      <AddCircleOutlineIcon
                        className="text-white hover:text-orange-600"
                        fontSize="large"
                      />
                    </button>
                  </Tooltip>
                </div>
              ) : null}
            </div>

            {items?.length ? (
              <div
                className="relative my-8 flex flex-col-reverse rounded-sm  shadow-md shadow-gray-900 drop-shadow-md lg:flex-row"
                style={{ backgroundColor: 'rgb(26,21,21)' }}
              >
                <InfiniteScroll
                  dataLength={items.length}
                  next={getProductsNext}
                  hasMore={hasMore}
                  loader={<h4>Loading...</h4>}
                >
                  <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-20 p-4 font-sans ">
                    {items.map((item, index) => {
                      return (
                        <ProductCard
                          product={item}
                          u={u}
                          user={user}
                          key={item._id}
                          itemId={item._id}
                          index={index}
                        />
                      );
                    })}
                  </div>
                </InfiniteScroll>
              </div>
            ) : (
              <div className="font-cairo text-orange-200">
                there are currently no products available!
              </div>
            )}
          </>
        )}

        <ScrollToTop />
      </div>
      <Footer />
    </>
  );
};

export default ProductsList;
