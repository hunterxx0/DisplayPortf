import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { FormHelperText, Input, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useProduct } from '../../../contexts/product-context';
import useUtils from '../../../Utils/useUtils';

const BasicInfo = ({
  changedProduct,
  setChangedProduct,
  MenuProps,
  theme,
  getStyles,
  setIsEditing,
}) => {
  const { CATEGORIES } = useUtils();
  const { product } = useProduct();
  const [newTag, setNewTag] = useState('');
  const [tags, setTags] = useState(product.tags); // can only add to this

  const [newImageUrl, setNewImageUrl] = useState('');

  const [selectedImage, setSelectedImage] = useState(0);

  const handleImageSelect = (idx) => {
    setSelectedImage(idx);
  };
  const handleChangeNewUrl = (event) => {
    event.preventDefault();
    setNewImageUrl(event.target.value);
  };

  const handleChange = (event) => {
    event.preventDefault();
    setChangedProduct((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleChangeTags = (event) => {
    if (newTag.length && !tags.includes(newTag)) {
      setTags((prev) => [...prev, newTag]);
      setChangedProduct((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag],
      }));
      setNewTag('');
    }
  };

  const handleImageAdd = (e) => {
    const isImage = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(newImageUrl);
    let idx;
    const isAlreadyThere = product.pics_url.includes(newImageUrl);
    if (newImageUrl && !isAlreadyThere && isImage) {
      setChangedProduct((prev) => {
        idx = prev.pics_url.length;
        return {
          ...prev,
          pics_url: [...prev.pics_url, newImageUrl],
        };
      });
      setSelectedImage(idx);
      setNewImageUrl('');
    }
  };

  const handleImageDelete = (url) => {
    let idx;
    setChangedProduct((prev) => {
      idx = prev.pics_url.length - 2 > 0 ? prev.pics_url.length - 2 : 0;
      return {
        ...prev,
        pics_url: prev.pics_url.filter((pic_url) => pic_url !== url),
      };
    });
    setSelectedImage(idx);
  };

  return (
    <div
      className={`relative mb-10 flex flex-col-reverse gap-10 bg-orange-200 py-16 px-24 font-sans shadow-sm shadow-gray-400 
      md:flex-row`}
    >
      <div
        className={`flex w-full ${
          changedProduct?.pics_url.length ? 'flex-shrink-0' : ''
        }  flex-col justify-center gap-4 md:w-1/2`}
      >
        <div>
          <img
            className=""
            src={
              changedProduct.pics_url[selectedImage]
                ? changedProduct.pics_url[selectedImage]
                : changedProduct.pics_url[0]
            }
            alt=""
          />
        </div>
        <div className="flex flex-wrap gap-1">
          {changedProduct.pics_url.map((url, idx) => (
            <div className="relative mx-auto" key={uuidv4()}>
              <img
                className={` h-16 w-24 cursor-pointer border-2 shadow-sm hover:border-gray-900 ${
                  selectedImage === idx ? 'border-4 border-gray-900' : ''
                } hover:shadow-lg`}
                src={url}
                alt=""
                onClick={() => {
                  handleImageSelect(idx);
                }}
              />
              <span className="absolute -top-1 -right-1 my-0.5 mx-1.5 text-lg">
                <DeleteOutlineIcon
                  className="cursor-pointer text-black hover:opacity-40"
                  onClick={() => handleImageDelete(url)}
                />
              </span>
            </div>
          ))}
        </div>
      </div>
      <div
        className={`flex  w-full ${
          changedProduct.pics_url.length ? 'flex-shrink-0 md:w-1/2' : ''
        } flex-col gap-8 `}
      >
        <div className="mx-auto w-[250px] self-start text-3xl md:w-full">
          <div className="flex flex-col gap-2">
            <div>
              <input
                className="w-full rounded-md  bg-orange-300 p-2 font-cairo shadow-sm shadow-black  placeholder:font-cairo"
                placeholder="product title..."
                value={changedProduct.title}
                name="title"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">
              Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={changedProduct.category}
              label="Category"
              name="category"
              onChange={handleChange}
            >
              {CATEGORIES.map((categ) => (
                <MenuItem key={categ} value={categ}>
                  {categ}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Choose the category</FormHelperText>
          </FormControl>
        </div>

        <div>
          <div className="flex">
            <div className="flex items-center">
              <Input
                placeholder="add a new tag"
                inputProps={{ 'aria-label': 'description' }}
                value={newTag}
                onChange={(e) => {
                  setNewTag(e.target.value);
                }}
              />
              <ControlPointIcon
                className="cursor-pointer hover:text-orange-600"
                onClick={handleChangeTags}
              />
            </div>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-chip-label">
                <span className="font-bold">Tags</span>
              </InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={changedProduct.tags}
                name="tags"
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {tags.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, tags, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="">
          <div className="flex items-center text-lg">
            <input
              className="m-2 w-full rounded-md bg-orange-300  p-2 shadow-sm shadow-black placeholder:font-cairo placeholder:text-black"
              placeholder="add an image url"
              onChange={handleChangeNewUrl}
              // onKeyDown={(event) => {
              //   console.log(event.target.value);
              //   if (event.key === 'Enter') {
              //     setNewImageUrl(event.target.value);
              //   }
              // }}
            />
            <AddCircleOutlineIcon
              className="cursor-pointer hover:text-orange-600"
              onClick={handleImageAdd}
            />
          </div>
        </div>
      </div>
      <div>
        <Tooltip title="Cancel">
          <button
            className="absolute top-0 right-0 rounded-md 
                    p-0.5 font-cairo font-extrabold  hover:opacity-80"
            style={{ color: 'rgb(26,21,21)' }}
            onClick={() => {
              setIsEditing(false);
            }}
          >
            <CancelOutlinedIcon
              className="text-black hover:text-orange-600"
              fontSize="large"
            />
          </button>
        </Tooltip>

        <Tooltip title="Save">
          <button
            type="submit"
            className="absolute top-0 right-10 rounded-md 
                    p-0.5 font-cairo font-extrabold  hover:opacity-80"
            style={{ color: 'rgb(26,21,21)' }}
          >
            <SaveOutlinedIcon
              className="text-black hover:text-orange-600"
              fontSize="large"
            />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default BasicInfo;
