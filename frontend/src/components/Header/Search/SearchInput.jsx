import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from 'react';
import useGetProductByCategoryAndByPage from '../../../hooks/useGetProductByCategoryAndByPage';
import SearchResults from './SearchResults';

const CATEGORIES = ['all', 'Electronics', 'Sport', 'Art', 'Design'];

const SearchInput = ({
  user,
  showSearchModal = false,
  showSearchDraw = () => {},
  focus = false,
}) => {
  const [dropdownIsOpen, setDropDownIsOpen] = useState(false);
  const [categoryOption, setCategoryOption] = useState('all');
  const [search, setSearch] = useState('');
  const [recentlySearched, setRecentlySearched] = useState('');
  const { results } = useGetProductByCategoryAndByPage(search, categoryOption);

  const handleDropdown = () => {
    setDropDownIsOpen((prev) => !prev);
  };

  const handleOptionChange = (e) => {
    setCategoryOption(
      `${e.target.textContent[0]}${e.target.textContent.toLowerCase().slice(1)}`
    );
    setDropDownIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRecentlySearched(search);
  };

  const handleChange = (e) => {
    if (e.target.value !== search) setSearch(e.target.value);
  };
  // fixes a bug but makes the search unpleasant
  // if (loading)
  //   return (
  //     <ModalOverlay>
  //       <LoadingSpinner />
  //     </ModalOverlay>
  //   );

  return !showSearchModal ? (
    <div className="relative flex items-center">
      <input
        placeholder="Search..."
        className="w-8 cursor-pointer rounded-lg bg-transparent  p-0.5 shadow-sm shadow-black 
        outline-none placeholder:py-1 placeholder:px-8 placeholder:font-cairo  hover:shadow-orange-200
          sm:w-full"
        onClick={showSearchDraw}
        style={{ backgroundColor: '#1a1515' }}
      />
      <SearchIcon
        className="text-orange-20 absolute left-[1rem] top-1/2 -translate-x-1/2  -translate-y-1/2 cursor-pointer text-orange-200"
        fontSize="small"
        onClick={showSearchDraw}
      />
    </div>
  ) : (
    <div
      className="bg-zinc-900 flex h-screen w-full max-w-7xl flex-col  
              self-start rounded-lg  shadow-sm shadow-black"
    >
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="relative flex flex-col-reverse sm:flex-row">
          {/* <label
            htmlFor="search-dropdown"
            className="sr-only mb-2 text-sm font-medium  "
          >
            All
          </label> */}
          <button
            onClick={handleDropdown}
            className="z-10 inline-flex w-1/2 flex-shrink-0 items-center rounded-tl-lg 
           bg-gray-900 
          bg-transparent py-2.5 px-4 text-center font-cairo text-xl font-medium text-orange-200 hover:bg-orange-200
           hover:text-gray-900 sm:w-fit
          "
            type="button"
          >
            {categoryOption}{' '}
            <svg
              aria-hidden="true"
              className="ml-1 h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div
            className={`z-10  m-0 flex outline-none ${
              dropdownIsOpen ? 'block' : 'hidden'
            }  w-44`}
          >
            <ul
              className=" top-0 whitespace-nowrap bg-black py-1 text-sm text-orange-200"
              aria-labelledby="dropdown-button"
            >
              {CATEGORIES.map((category) => (
                <li key={category}>
                  <button
                    type="button"
                    onClick={handleOptionChange}
                    className="inline-flex w-full  py-2 px-4 hover:bg-orange-200 hover:text-gray-900"
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative w-full ">
            <p
              className="absolute top-1/2 right-0 -translate-x-1/2 -translate-y-1/2 cursor-pointer px-1.5 py-1 font-cairo text-sm font-bold text-orange-200 shadow-sm shadow-gray-800  hover:opacity-80"
              onClick={showSearchDraw}
            >
              ESC
            </p>
            <input
              type="search"
              id="search-dropdown"
              className="z-20 block w-full rounded-tr-lg  bg-black bg-transparent
             py-6 px-14 text-lg text-orange-200
            outline-none "
              placeholder="Search Products, Brands..."
              required
              autoFocus
              autoComplete="off"
              value={search}
              onChange={handleChange}
            />
            <button
              className="focus:ring-orange-30 absolute top-0 -left-2 rounded-r-lg  p-6 text-xl font-medium
             text-orange-200 hover:opacity-80"
              type="submit"
            >
              <svg
                aria-hidden="true"
                className="h-7 w-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>

      <SearchResults
        recentlySearched={recentlySearched}
        setSearch={setSearch}
        results={results}
        user={user}
        showSearchDraw={showSearchDraw}
      />
    </div>
  );
};

export default SearchInput;
