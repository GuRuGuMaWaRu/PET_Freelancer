/** @jsxImportSource @emotion/react */
import React from "react";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import {
  SPaginationContainer,
  SPaginationButtons,
  SButton,
} from "./Pagination.styles";
import { getPages } from "./Pagination.helpers";

interface IProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<IProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  const pages = getPages(currentPage, totalPages);

  return (
    <SPaginationContainer>
      {totalPages > 0 && (
        <SButton
          aria-label="Previous page"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <MdOutlineArrowBackIos />
        </SButton>
      )}
      <SPaginationButtons>
        {pages.map((item) => (
          <SButton
            key={item.page}
            currentPage={currentPage}
            itemPage={item.page}
            onClick={() => setCurrentPage(item.page)}
            aria-label={`{Select page ${item.page}}`}
            disabled={currentPage === item.page}
          >
            {item.next_previous ? "..." : item.page}
          </SButton>
        ))}
      </SPaginationButtons>
      {totalPages > 0 && (
        <SButton
          aria-label="Next page"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          <MdOutlineArrowForwardIos />
        </SButton>
      )}
    </SPaginationContainer>
  );
};

export const MemoPagination = React.memo(Pagination);
