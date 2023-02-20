/** @jsxImportSource @emotion/react */
import React from "react";
import styled from "@emotion/styled";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import * as colors from "../styles/colors";

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

const createEmptyArray = (numOfItems: number): number[] => {
  return Array(numOfItems).fill(0);
};

const getPages = (
  currentPage: number,
  pages: number,
): { page: number; next_previous?: boolean }[] => {
  if (pages <= 9) {
    return createEmptyArray(pages).map((_, index) => ({ page: index + 1 }));
  } else {
    if (currentPage <= 5) {
      return [
        ...createEmptyArray(7).map((_, index) => ({ page: index + 1 })),
        { page: 8, next_previous: true },
        { page: pages },
      ];
    } else if (currentPage >= pages - 4) {
      return [
        { page: 1 },
        { page: 2, next_previous: true },
        ...createEmptyArray(7)
          .map((_, index) => ({ page: pages - index }))
          .reverse(),
      ];
    } else {
      return [
        { page: 1 },
        { page: currentPage - 3, next_previous: true },
        { page: currentPage - 2 },
        { page: currentPage - 1 },
        { page: currentPage },
        { page: currentPage + 1 },
        { page: currentPage + 2 },
        { page: currentPage + 3, next_previous: true },
        { page: pages },
      ];
    }
  }
};

const Pagination: React.FC<IProps> = ({
  currentPage,
  numberOfPages,
  paginationCallback,
}) => {
  const pages = getPages(currentPage, numberOfPages);

  return (
    <SPaginationContainer>
      <SButton
        aria-label="Previous page"
        onClick={() => paginationCallback(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <MdOutlineArrowBackIos />
      </SButton>
      <div css={{ display: "flex", gap: ".3rem" }}>
        {pages.map((item) => (
          <SButton
            key={item.page}
            css={{
              backgroundColor: `${
                currentPage === item.page ? colors.text2 : "transparent"
              }`,
            }}
            onClick={() => paginationCallback(item.page)}
            aria-label={`{Select page ${item.page}}`}
            disabled={currentPage === item.page}
          >
            {item.next_previous ? "..." : item.page}
          </SButton>
        ))}
      </div>
      <SButton
        aria-label="Next page"
        onClick={() => paginationCallback(currentPage + 1)}
        disabled={currentPage >= numberOfPages}
      >
        <MdOutlineArrowForwardIos />
      </SButton>
    </SPaginationContainer>
  );
};

export const MemoPagination = React.memo(Pagination);
