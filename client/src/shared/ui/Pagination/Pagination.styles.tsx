import styled from "@emotion/styled";
import { colors } from "../../const";

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
  currentPage?: number;
  itemPage?: number;
}

const SButton = styled.button<SButtonProps>(
  ({ disabled, currentPage, itemPage }) => ({
    width: "3rem",
    padding: ".7rem",
    backgroundColor:
      currentPage === itemPage ? colors.textImportant : "transparent",
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
  })
);

export { SPaginationContainer, SPaginationButtons, SButton };
