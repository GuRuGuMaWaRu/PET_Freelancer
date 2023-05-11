import React from "react";
import { FieldError } from "react-hook-form";

import { getChildId } from "../../lib/helpers";
import { SContainer, SLabel } from "../../styles";
import { ErrorMessage } from "shared/ui";

interface IProps {
  label?: string;
  children: React.ReactNode;
  htmlFor?: string;
  error?: FieldError;
}

function Field({ label, children, htmlFor, error }: IProps) {
  const id = htmlFor || getChildId(children);

  return (
    <SContainer>
      {label && <SLabel htmlFor={id}>{label}</SLabel>}
      {children}
      {!!error && (
        <ErrorMessage error={{ message: error.message }} variant="inline" />
      )}
    </SContainer>
  );
}

export { Field };
