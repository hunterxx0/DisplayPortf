import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { ProductProvider } from '../../contexts/product-context';
import { useAuth } from '../../contexts/user-context';
import useGetMultiEndpoints from '../../hooks/useGetMultiEndpoints';
import LoadingSpinner from '../../Utils/LoadingSpinner';
import ModalOverlay from '../../Utils/ModalOverlay';
import ScrollToTop from '../../Utils/ScrollToTop';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import WithToggle from '../HOC/WithToggle';
import HomeProductSection from '../Home/HomeProductSection';
import EditProduct from './Edit/EditProduct';
import ProductInfo from './ProductInfo';
import ProductMoreInfo from './ProductMoreInfo';

const ProductProfile = () => {
  const { user: u } = useAuth();
  const { productId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const {
    product,
    setProduct,
    productsRelatedCategory,
    productsRelatedSeller,
    seller,
    user,
    setUser,
    isLoading,
  } = useGetMultiEndpoints(productId, u?.me);
  const ProductInfoWithToggle = WithToggle(ProductInfo);

  if (isLoading)
    return (
      <ModalOverlay>
        <LoadingSpinner />
      </ModalOverlay>
    );
  return (
    <>
      <Header className="max-w-7xl" sticky={true} />
      <div className="relative">
        <div className="m-auto flex w-full max-w-7xl flex-col items-center justify-center">
          <ProductProvider product={product} setProduct={setProduct}>
            {isEditing ? (
              <EditProduct
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                productId={productId}
              />
            ) : (
              <div
                className="p-2 shadow-md shadow-gray-900"
                style={{ backgroundColor: '#231f20' }}
              >
                <ProductInfoWithToggle
                  seller={seller}
                  user={user}
                  u={u?.me}
                  setUser={setUser}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  productId={productId}
                />
                <ProductMoreInfo />
              </div>
            )}
          </ProductProvider>

          <div className="py-4"></div>
          {!isEditing ? (
            <div
              className="p-2 shadow-md shadow-gray-900"
              style={{ backgroundColor: '#231f20' }}
            >
              {Object.keys({
                ...productsRelatedCategory,
                ...productsRelatedSeller,
              }).map((key) => (
                <HomeProductSection
                  title={key}
                  user={user}
                  u={u?.me}
                  products={
                    { ...productsRelatedCategory, ...productsRelatedSeller }[
                      key
                    ]
                  }
                  key={uuidv4()}
                  noLinks={true}
                />
              ))}
            </div>
          ) : null}
          <ScrollToTop />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductProfile;
