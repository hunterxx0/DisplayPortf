import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useOutletContext, useParams } from 'react-router-dom';
import { deleteAllRecentlyViewedProducts } from '../../apis/deleteAllRecentlyViewedProducts';
import { deleteRecentlyViewedProduct } from '../../apis/deleteRecentlyViewedProduct';
import { useGetUserViewedProducts } from '../../hooks/useGetUserViewedProducts';
import LoadingSpinner from '../../Utils/LoadingSpinner';
import ModalOverlay from '../../Utils/ModalOverlay';
import ProductViewed from './historyItem';

const ProductsViewed = () => {
  const { username } = useParams();
  const { user, u } = useOutletContext();

  const {
    products = [],
    setProducts,
    isLoading,
  } = useGetUserViewedProducts(user?.recently_viewed);

  const handleClickClearAll = () => {
    deleteAllRecentlyViewedProducts(username)
      .then((products) => setProducts(products))
      .catch(console.error);
  };

  const handleClick = (productId) => {
    deleteRecentlyViewedProduct(productId, username)
      .then(() =>
        setProducts((prev) =>
          prev.filter((product) => productId !== product._id)
        )
      )
      .catch(console.error);
  };

  if (isLoading)
    return (
      <ModalOverlay>
        <LoadingSpinner />
      </ModalOverlay>
    );
  return (
    <div
      className="container m-0 w-screen rounded-b-lg p-2 shadow-md shadow-gray-900 sm:mb-4 md:w-full"
      style={{ backgroundColor: '#231f20' }}
    >
      {u?.me?.role === 'user' ? (
        <div className="flex items-center justify-end gap-1">
          <p className="font-cairo text-xs font-thin text-orange-200">
            clear all
          </p>
          <DeleteOutlineIcon
            className="cursor-pointer text-center text-orange-200 hover:text-orange-600"
            onClick={handleClickClearAll}
          />
        </div>
      ) : null}
      <div className="grid w-full gap-6 md:grid-cols-2  lg:grid-cols-4">
        {products.length
          ? products?.map((product) => (
              <ProductViewed
                product={product}
                user={u}
                handleClick={handleClick}
              />
            ))
          : ''}
      </div>
    </div>
  );
};

export default ProductsViewed;
