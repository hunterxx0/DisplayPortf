import React, { createContext, useContext } from 'react';

const ProductContext = createContext({});

const ProductProvider = (props) => {
  const { product, setProduct } = props;

  const productContextValue = { product, setProduct };
  return <ProductContext.Provider {...props} value={productContextValue} />;
};

const useProduct = () => useContext(ProductContext);

export { ProductProvider, useProduct };
