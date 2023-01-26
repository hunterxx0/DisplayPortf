import { useEffect, useMemo, useRef, useState } from 'react';
import getProductsByPage from '../apis/getProductsByPage';
import useUtils from '../Utils/useUtils';

const useGetProductsByPage = (searchParams) => {
  const { sortWith } = useUtils();
  const page = useRef(0);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const LIMIT = useRef(20);
  const [searchOption, setSearchOption] = useState({
    value: searchParams.get('sort'),
    label: searchParams.get('sort'),
  });
  const params = useMemo(
    () => ({
      sort: sortWith[searchOption.value],
      limit: LIMIT.current,
      reverse: -1,
    }),
    [searchOption.value]
  );

  const getProductsNext = () =>
    getProductsByPage(page, params)
      .then((productsPage) => {
        setHasMore(!!productsPage.nextPage);
        page.current = productsPage.nextPage;
        if (productsPage?.data)
          setItems((prev) => [...prev, ...productsPage.data]);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    getProductsNext();

    return () => {
      page.current = 0;
      setItems([]);
    };
  }, [params]);

  return {
    items,
    isLoading,
    hasMore,
    setSearchOption,
    searchOption,
    getProductsNext,
  };
};

export default useGetProductsByPage;
