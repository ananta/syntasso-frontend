import { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const usePaginatedList = ({
  pagination: _pagination,
  currentPage: _currentPage,
  searchQuery: _searchQuery,
  getDataApi,
  type,
  difficulty: _difficulty,
  status,
  tags,
  ...extras
}: any) => {
  const AuthState = useSelector((state) => state['Auth']);
  const [searchQuery, setSearchQuery] = useState(_searchQuery);
  const [difficulty, setDifficulty] = useState(_difficulty);
  const [pagination, setPagination] = useState(_pagination);

  const [items, setItems] = useState([]);

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPages] = useState(_currentPage);
  const [isItemsLoading, setItemsLoading] = useState(true);

  const handlePagination = (event: ChangeEvent<HTMLSelectElement>) => {
    setCurrentPages(1);
    setPagination(parseInt(event.target.value));
  };

  const handlePageClick = (page) => {
    setCurrentPages(parseInt(page) + 1);
  };

  const getData = async () => {
    const options = {
      token: AuthState.data.user.token,
      limit: pagination,
      page: currentPage,
      type,
      ...extras,
    };
    if (status && status.length > 0) {
      options['status'] = status;
    }
    if (searchQuery && searchQuery.length > 0) {
      options['query'] = searchQuery;
    }
    if (difficulty && difficulty.length > 0) {
      options['difficulty'] = difficulty;
    }
    if (extras && extras.bookmarkType) {
      options['bookmarkType'] = extras.bookmarkType;
    }
    if (tags && tags.length > 0) {
      options['tags'] = JSON.stringify(tags);
    }
    const dataRes = await getDataApi(options);
    if (!dataRes.isSuccess) throw new Error(dataRes.message);

    const { totalPages } = dataRes.response.data;

    setItems(dataRes.response.data[type]);
    setTotalPages(totalPages);
    setItemsLoading(false);
  };

  const handlePageInitiaiton = async () => {
    try {
      setItemsLoading(true);
      await getData();
    } catch (err) {
      toast.error(err.message);
      setItemsLoading(false);
    }
  };

  useEffect(() => {
    handlePageInitiaiton();
  }, []);

  useEffect(() => {
    handlePageInitiaiton();
  }, [searchQuery, difficulty, pagination, currentPage, tags]);

  //   handlePageInitiaiton();
  //   setCurrentPage(1);
  // }, [setSelectedTab, selectedTab]);

  return {
    isItemsLoading,
    handlePageClick,
    handlePagination,
    handlePageInitiaiton,
    currentPagination: pagination,
    totalPages,
    items,
    setDifficulty,
    setSearchQuery,
  };
};

export default usePaginatedList;
