import { useCallback, useEffect, useRef, useState } from 'react';
import { getItemsByPage } from '../apis/getItemsByPage';

export const useFetchItems = (url) => {
  const [items, setItems] = useState([]);
  const [searchedItems, setSearchedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const page = useRef(1);

  const fetchItems = useCallback(async () => {
    try {
      const data = await getItemsByPage(`${url}/page/${page.current}`);
      page.current = data?.nextPage;
      if (data?.data) {
        setItems((prev) => [...prev, ...data?.data]);
        setSearchedItems((prev) => [...prev, ...data?.data]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return {
    items,
    page,
    isLoading,
    fetchItems,
    searchedItems,
    setSearchedItems,
  };
};
