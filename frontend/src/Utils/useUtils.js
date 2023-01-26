const useUtils = () => {
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? 'white' : 'black',
      padding: '.01rem',
      cursor: 'pointer',
    }),
    control: (_, { selectProps: { width } }) => ({
      // none of react-select's styles are passed to <Control />
      display: 'flex',
      opacity: '1',
      cursor: 'pointer',
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return { ...provided, opacity, transition };
    },
  };

  const REVIEW_RATING = 5;
  const REVIEW_PARTICIPANTS = 100;
  const RESPONSE_TIME = 48;

  const CATEGORIES = ['Electronics', 'Sport', 'Art', 'Design'];

  const options = [
    { value: 'latest', label: 'latest' },
    { value: 'popular', label: 'popular' },
    { value: 'viewed', label: 'viewed' },
  ];

  const sortWith = {
    latest: 'created_at',
    popular: 'favorite_count',
    viewed: 'views',
  };

  const TITLES = {
    'Latest Products': 'Latest products',
    'Most Popular Products': 'Trending products',
    'Recently Viewed Products': 'Recently visited products',
    'Most Viewed Products': 'Most viewed products',
    'Related Products': 'Related products',
    'Products From Same Seller': 'Products from the same seller',
  };

  const SORT = {
    'Latest Products': 'latest',
    'Most Popular Products': 'popular',
    'Most Viewed Products': 'viewed',
  };
  const PAGES = ['home', 'electronics', 'sport', 'art', 'design'];

  return {
    customStyles,
    options,
    sortWith,
    CATEGORIES,
    REVIEW_PARTICIPANTS,
    RESPONSE_TIME,
    REVIEW_RATING,
    TITLES,
    SORT,
    PAGES,
  };
};
export default useUtils;
