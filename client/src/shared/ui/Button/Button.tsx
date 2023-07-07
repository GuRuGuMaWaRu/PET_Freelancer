import styled from "@emotion/styled";
import { colors } from "../../const";

const buttonVariants = {
  primary: {
    backgroundColor: colors.primary,
    color: colors.secondary,
  },
  secondary: {
    backgroundColor: colors.secondary,
    color: colors.primary,
  },
};

interface ButtonProps {
  variant?: "primary" | "secondary";
}

const Button = styled.button<ButtonProps>(
  {
    padding: "10px 15px",
    border: 0,
    borderRadius: "5px",
    lineHeight: 1,
    fontWeight: "bold",
    "&:disabled": {
      filter: "brightness(0.80)",
      cursor: "not-allowed",
    },
    transition: "transform 0.2s",
    "&:active": {
      transform: "translateY(2px)",
    },
  },
  ({ variant = "primary" }) =>
    buttonVariants[variant as keyof typeof buttonVariants]
);

export { Button };
