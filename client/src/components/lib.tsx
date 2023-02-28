/** @jsxImportSource @emotion/react */
import React from "react";
import {
  Combobox as ReachCombobox,
  ComboboxInput as ReachComboboxInput,
  ComboboxPopover as ReachComboboxPopover,
  ComboboxList as ReachComboboxList,
  ComboboxOption as ReachComboboxOption,
} from "@reach/combobox";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import {
  FaSpinner,
  FaTimes,
  FaExclamationCircle,
  FaCheck,
} from "react-icons/fa";
import { matchSorter } from "match-sorter";

import * as colors from "../styles/colors";
import { NotificationType, ChartType, useThrottle } from "../utils";

/* Form components */
const FormGroup = styled.div({
  display: "flex",
  flexDirection: "column",
});

const inputStyles = {
  padding: "6px 10px",
  border: `1px solid ${colors.white}`,
  borderRadius: "3px",
};

const Input = styled.input(inputStyles);
const Select = styled.select(inputStyles);
const Textarea = styled.textarea(inputStyles);
const StyledReachComboboxInput = styled(ReachComboboxInput)(
  { width: "100%" },
  inputStyles,
);

const Label = styled.label({ margin: "10px 0 5px" });

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
  },
  ({ variant = "primary" }) =>
    buttonVariants[variant as keyof typeof buttonVariants],
);

interface ChartSelectionButtonProps {
  variant: "earnings" | "clients";
  chartType: ChartType;
}

const ChartSelectionButton = styled.button<ChartSelectionButtonProps>(
  ({ variant, chartType }) => ({
    border: 0,
    padding: "5px 10px",
    color: colors.white,
    backgroundColor:
      variant === "earnings" && chartType === ChartType.earnings
        ? colors.text2
        : variant === "clients" && chartType === ChartType.clients
        ? colors.text2
        : "transparent",
    clipPath: "polygon(10% 0, 100% 0%, 90% 100%, 0% 100%)",
  }),
);

function useItemMatch<T>(items: T[], term: string) {
  const throttledTerm = useThrottle(term, 100);
  return React.useMemo(
    () =>
      throttledTerm.trim() === ""
        ? null
        : matchSorter(items, throttledTerm, {
            keys: ["name"],
          }),
    [items, throttledTerm],
  );
}

interface IComboboxItem {
  _id: string;
  name: string;
}
interface IComboboxProps {
  label: string;
  items: IComboboxItem[];
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const Combobox = React.forwardRef<HTMLInputElement, IComboboxProps>(
  ({ label = "choose an item", items, name, onChange, onBlur }, ref) => {
    const [term, setTerm] = React.useState<string>("");
    const results = useItemMatch(items, term);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      setTerm(event.target.value);
      onChange(event);
    };

    return (
      <ReachCombobox aria-label={label}>
        <StyledReachComboboxInput
          onChange={handleChange}
          name={name}
          onBlur={onBlur}
          ref={ref}
        />
        <ReachComboboxPopover>
          <ReachComboboxList>
            {results?.map((item) => (
              <ReachComboboxOption key={item._id} value={item.name} />
            ))}
          </ReachComboboxList>
        </ReachComboboxPopover>
      </ReachCombobox>
    );
  },
);

/* Error components */
const errorMessageVariants = {
  stacked: { display: "block" },
  inline: { display: "inline-block" },
};

interface Error {
  message: string | undefined;
}

type ErrorVariant = "stacked" | "inline";

function ErrorMessage({
  error,
  variant = "stacked",
  ...props
}: {
  error: Error;
  variant?: ErrorVariant;
}) {
  return (
    <div
      role="alert"
      css={[
        { color: colors.danger, backgroundColor: colors.primary },
        errorMessageVariants[variant],
      ]}
      {...props}
    >
      {variant === "stacked" && <span>There was an error: </span>}
      <pre
        css={[
          { whiteSpace: "break-spaces", margin: "0", marginBottom: -5 },
          errorMessageVariants[variant],
        ]}
      >
        {error.message ?? "Something bad happened!"}
      </pre>
    </div>
  );
}

/* Spinner components */
const spin = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

const Spinner = styled(FaSpinner)({
  animation: `${spin} 1s linear infinite`,
});
Spinner.defaultProps = {
  "aria-label": "loading",
};

function FullPageSpinner() {
  return (
    <div
      css={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: "4rem",
        color: colors.spinnerContrasting,
      }}
    >
      <Spinner />
    </div>
  );
}

/* Notifications */
const setNotificationColor = (type: NotificationType) => {
  switch (type) {
    case NotificationType.create:
    case NotificationType.delete:
      return colors.notificationDone;
    case NotificationType.error:
    case NotificationType.fail:
      return colors.notificationError;
    default:
      return colors.white;
  }
};

interface INotificationProps {
  type: NotificationType;
}

const NotificationMessage = styled.div<INotificationProps>(
  {
    position: "fixed",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    alignItems: "center",
    borderRadius: "8px 8px 0 0",
    color: colors.white,
    fontSize: "1rem",
    zIndex: 20,
  },
  ({ type }) => ({
    backgroundColor: colors.notificationBg,
    "& p": {
      margin: "0.5rem",
      span: {
        color: setNotificationColor(type),
      },
    },
  }),
);

const notificationIconStyles = {
  fontSize: "3.2rem",
  margin: "0.8rem 1.2rem 0.8rem 1.2rem",
};
const WarningIcon = styled(FaExclamationCircle)(notificationIconStyles, {
  color: colors.notificationError,
});

const AccomplishedIcon = styled(FaCheck)(notificationIconStyles, {
  color: colors.notificationDone,
});

const CloseIcon = styled(FaTimes)({
  fontSize: "1.6rem",
  cursor: "pointer",
  margin: "0 1.5rem 0 2.7rem",
  transition: "opacity 0.2s",
  "&:hover": {
    opacity: 0.6,
  },
});

export {
  FormGroup,
  Input,
  Select,
  Textarea,
  Label,
  Button,
  ChartSelectionButton,
  Combobox,
  ErrorMessage,
  Spinner,
  FullPageSpinner,
  NotificationMessage,
  WarningIcon,
  AccomplishedIcon,
  CloseIcon,
};
