import { useTheme } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { editProduct } from '../../../apis/editProduct';
import { useProduct } from '../../../contexts/product-context';
import { useAuth } from '../../../contexts/user-context';
import useStyles from '../../../Utils/useStyles';
import BasicInfo from './BasicInfo';
import Characteristics from './Characteristics';
import Description from './Description';

const EditProduct = ({ isEditing, setIsEditing, productId }) => {
  const theme = useTheme();
  const { product, setProduct } = useProduct();
  const [changedProduct, setChangedProduct] = useState(product);
  const { user } = useAuth();
  const { MenuProps, getStyles } = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    enqueueSnackbar('Product is successfully edited!');

    editProduct(changedProduct, user, productId)
      .then(() => setProduct(changedProduct))
      .catch((err) => console.error(err.message));
  };

  return (
    <>
      <form className="w-full" onSubmit={handleSubmit}>
        <div>
          <h1
            className="bg-gradient-to-br from-orange-700 to-white bg-clip-text py-2 font-cairo text-2xl font-black uppercase 
                       text-transparent transition-all duration-75"
          >
            Editing product...
          </h1>
          <BasicInfo
            changedProduct={changedProduct}
            setChangedProduct={setChangedProduct}
            MenuProps={MenuProps}
            theme={theme}
            setIsEditing={setIsEditing}
            getStyles={getStyles}
          />
        </div>
        {/* ProductMoreInfo */}
        <div className="mx-auto mb-10 flex flex-col justify-center gap-10 font-sans md:flex-row ">
          <Characteristics
            changedProduct={changedProduct}
            setChangedProduct={setChangedProduct}
            MenuProps={MenuProps}
            getStyles={getStyles}
            theme={theme}
          />
          <Description
            changedProduct={changedProduct}
            setChangedProduct={setChangedProduct}
          />
        </div>
      </form>
    </>
  );
};

export default EditProduct;
