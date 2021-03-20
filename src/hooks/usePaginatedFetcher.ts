import { useEffect, useState } from 'react';

const usePaginatedFetcher = ({ fetcherFunction, name, username, token, limit }) => {
  const [state, setState] = useState({
    currentPage: 1,
    data: [],
    totalPages: 1,
    isBusy: false,
  });

  const fetchData = async () => {
    try {
      setState((state) => ({
        ...state,
        isBusy: true,
      }));
      const dataRes = await fetcherFunction({
        username,
        token,
        limit,
        page: state.currentPage,
      });
      if (!dataRes.isSuccess) throw new Error(dataRes.message || dataRes.response.message);
      setState((state) => ({
        ...state,
        data: [...state.data, ...dataRes.response[name[0]][name[1]]],
        totalPages: dataRes.response[name[0]].totalPages,
        isBusy: false,
      }));
    } catch (err) {
      setState((state) => ({
        ...state,
        data: [],
        totalPages: 0,
        isBusy: false,
      }));
    }
  };
  const handleFetchMore = () => {
    if (!(state.totalPages <= state.currentPage))
      setState((state) => ({
        ...state,
        currentPage: state.currentPage + 1,
      }));
  };

  useEffect(() => {
    fetchData();
  }, [state.currentPage]);
  return {
    ...state,
    handleFetchMore,
  };
};

export default usePaginatedFetcher;
