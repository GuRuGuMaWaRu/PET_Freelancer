/** @jsxImportSource @emotion/react */
import React from "react";
import styled from "@emotion/styled";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

interface IProps {
  currentPage: number;
  numberOfPages: number;
  paginationCallback: (page: number) => void;
}

const SPaginationContainer = styled.div({
  display: "flex",
  justifyContent: "space-between",
  marginTop: "1rem",
});

const Pagination: React.FC<IProps> = ({
  currentPage,
  numberOfPages,
  paginationCallback,
}) => {
  console.log("currentPage:", currentPage);
  console.log("numberOfPages:", numberOfPages);

  let pages: { page: number; next_previous?: boolean }[] = [];

  if (numberOfPages <= 9) {
    pages = Array(numberOfPages)
      .fill(1)
      .map((_, index) => ({ page: index + 1 }));
  } else {
    if (currentPage <= 5) {
      pages = [
        ...Array(7)
          .fill(1)
          .map((_, index) => ({ page: index + 1 })),
        { page: 8, next_previous: true },
        { page: numberOfPages },
      ];
    } else if (currentPage >= numberOfPages - 4) {
      pages = [
        { page: 1 },
        { page: 2, next_previous: true },
        ...Array(7)
          .fill(1)
          .map((_, index) => ({ page: numberOfPages - index }))
          .reverse(),
      ];
    } else {
      pages = [
        { page: 1 },
        { page: currentPage - 3, next_previous: true },
        { page: currentPage - 2 },
        { page: currentPage - 1 },
        { page: currentPage },
        { page: currentPage + 1 },
        { page: currentPage + 2 },
        { page: currentPage + 3, next_previous: true },
        { page: numberOfPages },
      ];
    }
  }

  return (
    <SPaginationContainer>
      <button
        aria-label="Previous page"
        onClick={() => paginationCallback(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <MdOutlineArrowBackIos />
      </button>
      <div>
        {pages.map((item, index) => (
          <button
            key={item.page}
            css={{
              backgroundColor: `${
                currentPage === item.page ? "tomato" : "#fff"
              }`,
            }}
            onClick={() => paginationCallback(item.page)}
            aria-label={`{Select page ${item.page}}`}
          >
            {item.next_previous ? "..." : item.page}
          </button>
        ))}
      </div>
      <button
        aria-label="Next page"
        onClick={() => paginationCallback(currentPage + 1)}
        disabled={currentPage === numberOfPages}
      >
        <MdOutlineArrowForwardIos />
      </button>
    </SPaginationContainer>
  );
};

export { Pagination };
