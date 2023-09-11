import { TextField, TextFieldProps } from "@mui/material";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers";
import React, { ChangeEvent, useState } from "react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

import ErrorTooltip from "./ErrorTooltip";

const CustomDatePicker = <T extends FieldValues, TInputDate, TDate>({
  name,
  rules,
  shouldUnregister,
  defaultValue,
  control,
  onChange,
  onKeyDown,
  required,
  children,
  ...props
}: UseControllerProps<T> &
  Omit<
    DatePickerProps<TInputDate, TDate>,
    "value" | "onChange" | "inputRef" | "renderInput"
  > &
  Partial<Pick<DatePickerProps<TInputDate, TDate>, "onChange">> &
  Pick<TextFieldProps, "required" | "onKeyDown">) => {
  const {
    field: { ref, onChange: fieldOnChange, ...field },
    fieldState: { error },
  } = useController({ control, name, rules, shouldUnregister, defaultValue });
  const [hasFocus, setHasFocus] = useState<boolean>(false);

  return (
    <ErrorTooltip error={error} hasFocus={hasFocus}>
      <DatePicker
        inputFormat="YYYY年MM月DD日"
        mask="____年__月__日"
        views={["day"]}
        toolbarFormat="M月D日"
        {...props}
        {...field}
        onChange={(value, keyboardInputValue) => {
          fieldOnChange(value);
          if (onChange) onChange(value, keyboardInputValue);
        }}
        inputRef={ref}
        renderInput={(params) => (
          <TextField
            name={name}
            {...params}
            error={!!error}
            onFocus={(e) => {
              setHasFocus(true);
              if (e.currentTarget.select) e.currentTarget.select();
            }}
            onBlur={() => setHasFocus(false)}
            onKeyDown={(e) => {
              if (onKeyDown) onKeyDown(e);
            }}
            onInput={(e: ChangeEvent<HTMLInputElement>) => {
              if (e.target.value.length > 11) {
                e.target.value = e.target.value.slice(0, -2);
              }
            }}
            onContextMenu={(e) => {
              e.preventDefault();

              return false;
            }}
            required={required}
          />
        )}
      >
        {children}
      </DatePicker>
    </ErrorTooltip>
  );
};
export default CustomDatePicker;
