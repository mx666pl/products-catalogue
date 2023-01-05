import { useMemo } from "react";
import { SerachQueryName } from "../types";
import { Autocomplete, AutocompleteProps } from "@mui/material";
import { useSearchParams } from "react-router-dom";

type FilterSelectProps = {
  searchQueryName: SerachQueryName;
} & AutocompleteProps<string, undefined, undefined, undefined>;

const FilterSelect = ({
  searchQueryName,
  options,
  onChange,
  ...restProps
}: FilterSelectProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedOption = useMemo(() => {
    return options.find((o) => o === searchParams.get(searchQueryName)) || null;
  }, [options, searchQueryName, searchParams]);

  return (
    <Autocomplete
      options={options}
      value={selectedOption}
      onChange={(e, selectedOption, reason) => {
        setSearchParams((currentSearchParams) => {
          if (selectedOption) {
            currentSearchParams.set(searchQueryName, selectedOption);
          } else {
            currentSearchParams.delete(searchQueryName);
          }

          return currentSearchParams;
        });
        onChange?.(e, selectedOption, reason);
      }}
      {...restProps}
    />
  );
};

export default FilterSelect;
