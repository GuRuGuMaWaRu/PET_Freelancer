import React from "react";
import {
  Combobox as ReachCombobox,
  ComboboxInput as ReachComboboxInput,
  ComboboxPopover as ReachComboboxPopover,
  ComboboxList as ReachComboboxList,
  ComboboxOption as ReachComboboxOption,
} from "@reach/combobox";
import styled from "@emotion/styled";

import { colors } from "../../const";
import { IComboboxProps } from "./FormComponents.types";
import { useItemMatch } from "./FormComponents.hooks";

const inputStyles = {
  padding: "6px 10px",
  border: `1px solid ${colors.white}`,
  borderRadius: "3px",
};

const Input = styled.input(inputStyles);
const Select = styled.select(inputStyles);
const Textarea = styled.textarea(inputStyles);
const Label = styled.label({ margin: "10px 0 5px" });
const FormGroup = styled.div({
  display: "flex",
  flexDirection: "column",
});

const StyledReachComboboxInput = styled(ReachComboboxInput)(
  { width: "100%" },
  inputStyles,
);

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

export { FormGroup, Input, Select, Textarea, Label, Combobox };
