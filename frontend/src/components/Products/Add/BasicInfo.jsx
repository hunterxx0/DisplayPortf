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
import { useTheme } from '@mui/material/styles';
import { React, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useStyles from '../../../Utils/useStyles';
import useUtils from '../../../Utils/useUtils';

const BasicInfo = ({ product, setProduct, setIsAddingProduct }) => {
  const { CATEGORIES } = useUtils();
  const { getStyles, MenuProps } = useStyles();
  const theme = useTheme();
  const [newTag, setNewTag] = useState('');
  const [tags, setTags] = useState([]); // can only add to this

  const [newImageUrl, setNewImageUrl] = useState('');

  const [selectedImage, setSelectedImage] = useState(0);

  const handleImageSelect = (idx) => {
    setSelectedImage(idx);
  };

  const handleChangeNewUrl = (event) => {
    setNewImageUrl(event.target.value);
  };

  const handleChange = (event) => {
    setProduct((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleChangeTags = (event) => {
    if (newTag.length && !tags.includes(newTag)) {
      setTags((prev) => [...prev, newTag]);
      setProduct((prev) => ({
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
      setProduct((prev) => {
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
    setProduct((prev) => {
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
      className={`relative mb-10 flex flex-col-reverse gap-10 bg-orange-200 py-16 px-24 font-sans shadow-sm shadow-gray-400 md:flex-row`}
    >
      <div
        className={`flex ${
          product?.pics_url.length ? 'flex-shrink-0 gap-4 md:w-1/2' : ''
        }  flex-col justify-center`}
      >
        <div>
          <img
            className=""
            src={
              product?.pics_url[selectedImage]
                ? product.pics_url[selectedImage]
                : product.pics_url[0]
            }
            alt=""
          />
        </div>

        <div className="flex flex-wrap gap-1">
          {product?.pics_url.map((url, idx) => (
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
        className={`flex w-full ${
          product?.pics_url.length ? 'flex-shrink-0   md:w-1/2' : ''
        } flex-col items-center gap-y-8`}
      >
        <div className="w-full text-3xl md:w-full">
          <div className="flex flex-col items-center ">
            <div>
              <input
                className="w-[250px] rounded-md bg-orange-300 p-2 font-cairo text-black shadow-sm shadow-black placeholder:font-cairo 
                 placeholder:text-black md:w-full"
                placeholder="product title..."
                value={product.title}
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
              value={product.category}
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
                value={product.tags}
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
              // type="file"
              // multiple
              className="m-2 w-full rounded-md bg-orange-300 p-2 text-black shadow-sm shadow-black placeholder:font-cairo placeholder:text-black"
              placeholder="add an image url"
              value={newImageUrl}
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
            className="absolute top-0 right-0  rounded-md 
                    p-0.5 font-cairo font-extrabold  hover:opacity-80"
            style={{ color: 'rgb(26,21,21)' }}
            onClick={() => {
              setIsAddingProduct(false);
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
            className="absolute top-0 right-10  rounded-md 
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
