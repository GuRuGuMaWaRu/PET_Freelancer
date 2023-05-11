import React from "react";
import {
  Combobox as ReachCombobox,
  ComboboxPopover as ReachComboboxPopover,
  ComboboxList as ReachComboboxList,
  ComboboxOption as ReachComboboxOption,
} from "@reach/combobox";

import { IComboboxProps } from "./Combobox.types";
import { useItemMatch } from "./Combobox.hooks";
import { SReachComboboxInput } from "../../styles";

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
        <SReachComboboxInput
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

export { Combobox };
