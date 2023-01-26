import React from 'react';
import { useProduct } from '../../contexts/product-context';

const ProductMoreInfo = () => {
  const { product } = useProduct();
  return (
    <div className="mx-auto mb-10 flex flex-col justify-center gap-10 font-sans md:flex-row ">
      <div className="mb-10 flex min-w-[50%]  flex-col-reverse gap-10 bg-orange-300 py-8 px-12 font-sans shadow-sm shadow-gray-400 md:flex-row lg:p-0">
        <div className="p-2">
          <div className="flex">
            <h1
              className="tracking-widefont-bold text-md mb-4 p-2 font-bold uppercase tracking-wide  after:right-0 
            after:my-0 after:block after:w-[6rem] after:border-b-4 after:border-black after:pt-1 sm:text-2xl"
            >
              Characteristics
            </h1>
          </div>
          <div className="grid grid-cols-1 content-between gap-6 p-4 ">
            {product?.characteristics &&
              Object.keys(product?.characteristics).map((property) => (
                <div
                  className="flex flex-wrap justify-between gap-2 border-b-8 border-b-orange-200 p-2 "
                  key={property}
                >
                  <span className="font-bold">{property}:</span>
                  <span>{product?.characteristics[property]}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="mb-10 flex min-w-[50%] flex-col-reverse  gap-10 bg-orange-300 py-8 px-12 font-sans shadow-sm shadow-gray-400 md:flex-row lg:p-0">
        <div className="p-2">
          <div className="flex flex-col gap-y-4">
            <h1
              className="text-md p-2 font-bold uppercase tracking-wide
              after:right-0 after:my-0 after:block after:w-[6rem] after:border-b-4 after:border-black after:pt-1 sm:text-2xl"
            >
              Description
            </h1>
            <div className="p-4 text-justify text-sm leading-loose tracking-wide lg:text-lg">
              {product.descriptions}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductMoreInfo;
