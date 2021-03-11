import React, { ChangeEvent, ComponentProps } from 'react';
import ReactPaginate from 'react-paginate';
import classnames from 'classnames';

import { RegularText } from 'components/Common/CustomText';

interface PaginationProps {
  totalPages: number;
  handlePageClick?: (e: ChangeEvent<HTMLButtonElement>) => void;
}

const CustomPaginate: React.FC<PaginationProps & ComponentProps<'button'>> = ({ totalPages, handlePageClick }) => {
  return (
    <ReactPaginate
      previousLabel="<"
      nextLabel=">"
      breakLabel={'..'}
      pageCount={totalPages}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePageClick}
      containerClassName={'flex pl-0 list-none rounded border border-gray-300 block leading-tight relative'}
      pageLinkClassName={
        'relative block py-2 px-3 leading-tight bg-white border border-gray-200 text-gray-500 border-t-0 hover:bg-gray-200 no-underline cursor-pointer focus:outline-none'
      }
      activeLinkClassName={'text-blue-700'}
      previousLinkClassName="relative block py-2 px-3 leading-tight bg-white border border-gray-300 border-r-0 ml-0 rounded-l hover:bg-gray-200 focus:outline-none"
      nextLinkClassName="relative block py-2 px-3 leading-tight bg-white border border-gray-300  border-l-0 mr-0 rounded-l hover:bg-gray-200 focus:outline-none"
      disabledClassName="bg-gray-200 text-gray-600"
      activeClassName={'text-blue-700'}
    />
  );
};

export default CustomPaginate;
