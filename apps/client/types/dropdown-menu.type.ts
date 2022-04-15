export type DropdownItemType = {
  type: "item";
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  submenu?: DropdownMenuType;
  rightElement?: React.ReactNode;
};

export type DropdownSeparatorType = { type: "separator" };
export type DropdownLabelType = { type: "label"; label: string };

export type DropdownMenuType = (
  | DropdownItemType
  | DropdownSeparatorType
  | DropdownLabelType
)[];
