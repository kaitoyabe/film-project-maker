import {
  Autocomplete,
  AutocompleteProps,
  TextField,
  TextFieldProps,
} from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

import ErrorTooltip from "./ErrorTooltip";

const CustomAutocomplete = <
  T extends FieldValues,
  U,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
>({
  name,
  rules,
  shouldUnregister,
  defaultValue,
  control,
  onInputChange,
  label,
  required,
  ...props
}: UseControllerProps<T> &
  Omit<
    AutocompleteProps<U, Multiple, DisableClearable, FreeSolo>,
    "value" | "renderInput"
  > &
  Pick<TextFieldProps, "label" | "required">) => {
  const {
    field: { ref, onChange: fieldOnChange, value },
    fieldState: { error },
  } = useController({
    control,
    name,
    rules,
    shouldUnregister,
    defaultValue,
  });
  const [hasFocus, setHasFocus] = useState<boolean>(false);
  const divRef = useRef<HTMLDivElement>(null);

  const handleWindowResize = useCallback(() => {
    if (divRef.current && hasFocus) {
      if (
        window.visualViewport &&
        divRef.current.getBoundingClientRect().bottom >
          window.visualViewport.height
      ) {
        divRef.current.scrollIntoView({ block: "center" });
      }
    }
  }, [hasFocus]);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, [handleWindowResize]);

  return (
    <ErrorTooltip error={error} hasFocus={hasFocus}>
      <Autocomplete
        {...props}
        value={value}
        onInputChange={(event, newValue, reason) => {
          fieldOnChange(newValue);
          if (onInputChange) onInputChange(event, newValue, reason);
        }}
        renderInput={(params) => (
          <TextField
            name={name}
            ref={divRef}
            inputRef={ref}
            error={!!error}
            {...params}
            label={label}
            onFocus={() => setHasFocus(true)}
            onBlur={() => setHasFocus(false)}
            required={required}
          />
        )}
      />
    </ErrorTooltip>
  );
};
export default CustomAutocomplete;
