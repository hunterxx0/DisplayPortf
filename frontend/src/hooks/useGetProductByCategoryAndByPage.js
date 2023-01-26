import { useEffect, useState } from 'react';
import getProductByCategoryAndByPage from '../apis/getProductByCategoryAndByPage';

const useGetProductByCategoryAndByPage = (search, categoryOption) => {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (search.length) {
      setLoading(true);
      getProductByCategoryAndByPage(search, categoryOption, page).then(
        (response) => {
          setResults(response.data);
          setLoading(false);
        }
      );
    } else setResults([]);
    return () => setResults([]);
  }, [search, categoryOption, page]);

  return { results, loading };
};

export default useGetProductByCategoryAndByPage;
