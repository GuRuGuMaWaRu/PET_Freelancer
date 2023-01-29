/** @jsxImportSource @emotion/react */
import React from "react";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

interface IProps {
  currentPage: number;
  numberOfPages: number;
  paginationCallback: (page: number) => void;
}

const Pagination: React.FC<IProps> = ({
  currentPage,
  numberOfPages,
  paginationCallback,
}) => {
  return (
    <div
      css={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "1rem",
      }}
    >
      <button
        aria-label="Previous page"
        onClick={() => paginationCallback(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <MdOutlineArrowBackIos />
      </button>
      <div>
        {Array(numberOfPages)
          .fill(1)
          .map((_, index) => (
            <button
              key={index}
              css={{
                backgroundColor: `${
                  currentPage === index + 1 ? "tomato" : "#fff"
                }`,
              }}
              onClick={() => paginationCallback(index + 1)}
              aria-label={`{Select page ${index + 1}}`}
            >
              {index + 1}
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
    </div>
  );
};

export { Pagination };
