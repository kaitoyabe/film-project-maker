import {
  FormControlLabel,
  Checkbox,
  CheckboxProps,
  FormControlLabelProps,
} from "@mui/material";
import React, { useState } from "react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

import ErrorTooltip from "./ErrorTooltip";

const CustomCheckbox = <T extends FieldValues>({
  name,
  rules,
  shouldUnregister,
  defaultValue,
  control,
  onChange,
  checked,
  ...props
}: UseControllerProps<T> &
  Omit<FormControlLabelProps, "control" | "value" | "onChange"> &
  Partial<Pick<FormControlLabelProps, "onChange" | "checked">> &
  Omit<CheckboxProps, "value" | "onChange"> &
  Partial<Pick<CheckboxProps, "onChange">>) => {
  const {
    field: { ref, onChange: fieldOnChange, ...field },
    fieldState: { error },
  } = useController({ control, name, rules, shouldUnregister, defaultValue });
  const [hasFocus, setHasFocus] = useState<boolean>(false);

  return (
    <ErrorTooltip error={error} hasFocus={hasFocus}>
      <FormControlLabel
        {...field}
        {...props}
        checked={field.value ?? false}
        onChange={(value, keyboardInputValue) => {
          fieldOnChange(value);
          if (onChange) onChange(value, keyboardInputValue);
        }}
        control={
          <Checkbox
            name={name}
            ref={ref}
            checked={checked}
            onChange={onChange}
            onFocus={() => setHasFocus(true)}
          />
        }
      />
    </ErrorTooltip>
  );
};
export default CustomCheckbox;
