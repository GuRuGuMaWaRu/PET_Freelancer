interface IComboboxItem {
  _id: string;
  name: string;
}

interface IComboboxProps {
  id: string;
  label: string;
  items: IComboboxItem[];
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export type { IComboboxProps };
