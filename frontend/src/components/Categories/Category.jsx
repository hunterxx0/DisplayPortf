import React from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/user-context';
import useGetProductsBySellerNames from '../../hooks/useGetProductsBySellerNames';
import UseGetSellersByCategory from '../../hooks/useGetSellersByCategory';
import LoadingSpinner from '../../Utils/LoadingSpinner';
import ModalOverlay from '../../Utils/ModalOverlay';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import CategoryMain from './CategoryMain';
import CategorySideBar from './CategorySideBar';

const Category = () => {
  const { user } = useAuth();
  const { categoryname } = useParams();
  const category = `${categoryname[0].toUpperCase()}${categoryname
    .slice(1)
    .toLowerCase()}`;
  const { sellerNames, selectedSellers, setSelectedSellers } =
    UseGetSellersByCategory(category);

  const { loading, products } = useGetProductsBySellerNames(
    selectedSellers,
    category
  );

  if (loading)
    return (
      <ModalOverlay>
        <LoadingSpinner />
      </ModalOverlay>
    );
  return (
    <>
      <Header />
      <div className="flex justify-center text-orange-200">
        <div className="flex h-full w-full max-w-7xl flex-wrap justify-center gap-x-12 md:w-full md:justify-between lg:flex-nowrap">
          <CategorySideBar
            sellerNames={sellerNames}
            selectedSellers={selectedSellers}
            setSelectedSellers={setSelectedSellers}
            productTags={products.map((product) => product.tags)}
          />
          <CategoryMain products={products} u={user?.me} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Category;
