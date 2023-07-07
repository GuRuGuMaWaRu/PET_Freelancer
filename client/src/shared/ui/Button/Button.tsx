import styled from "@emotion/styled";
import { colors } from "../../const";

const buttonVariants = {
  primary: `
    background-color: ${colors.primary};
    color: ${colors.secondary};
  `,
  secondary: `
    background-color: ${colors.secondary};
    color: ${colors.primary};
  `,
};

interface ButtonProps {
  variant?: "primary" | "secondary";
  customStyles?: string;
}

const Button = styled.button<ButtonProps>`
  padding: 5px 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 5px;
  font-weight: bold;
  &:disabled {
    filter: brightness(0.8);
    cursor: not-allowed;
  }
  transition: transform 0.2s;
  &:active {
    transform: translateY(2px);
  }
  ${({ variant = "primary" }) =>
    buttonVariants[variant as keyof typeof buttonVariants]}
  ${({ customStyles }) => customStyles}
`;

export { Button };
