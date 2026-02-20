import type { IDropDownOption } from "../ui/dropdown/dropdown";

export const getInitialDropdownOption = (options: IDropDownOption[], currentValue: string | undefined) => {
  if (!currentValue) {
    return options[0];
  }

  const matchedOption = options.find((option) => option.value === currentValue);

  return matchedOption ?? options[0];
};
