/** @jsxImportSource @emotion/react */
import React from "react";
import styled from "@emotion/styled";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import * as colors from "../styles/colors";

const SPaginationContainer = styled.div({
  display: "flex",
  justifyContent: "space-between",
  marginTop: "1rem",
});

const SPaginationButtons = styled.div({
  display: "flex",
  gap: ".3rem",
});

interface SButtonProps {
  disabled: boolean;
}

const SButton = styled.button<SButtonProps>(({ disabled }) => ({
  width: "3rem",
  padding: ".7rem",
  backgroundColor: "transparent",
  border: `2px solid ${disabled ? colors.disabled : colors.white}`,
  color: colors.white,
  transition: "all 0.2s",
  cursor: disabled ? "default" : "pointer",

  "&:hover": {
    transform: disabled ? "none" : "translateY(-2px)",
  },
  "& svg": {
    fill: disabled ? colors.disabled : colors.white,
    verticalAlign: "middle",
  },
}));

const getPages = (
  currentPage: number,
  totalPages: number,
): { page: number; next_previous?: boolean }[] => {
  if (totalPages <= 9) {
    return Array.from({ length: totalPages }, (_, index) => ({
      page: index + 1,
    }));
  }

  if (currentPage <= 5) {
    return [
      ...Array.from({ length: 7 }, (_, index) => ({ page: index + 1 })),
      { page: 8, next_previous: true },
      { page: totalPages },
    ];
  } else if (currentPage >= totalPages - 4) {
    return [
      { page: 1 },
      { page: 2, next_previous: true },
      ...Array.from({ length: 7 }, (_, index) => ({
        page: totalPages - index,
      })).reverse(),
    ];
  }

  return [
    { page: 1 },
    { page: currentPage - 3, next_previous: true },
    { page: currentPage - 2 },
    { page: currentPage - 1 },
    { page: currentPage },
    { page: currentPage + 1 },
    { page: currentPage + 2 },
    { page: currentPage + 3, next_previous: true },
    { page: totalPages },
  ];
};

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
            css={{
              backgroundColor: `${
                currentPage === item.page ? colors.text2 : "transparent"
              }`,
            }}
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
