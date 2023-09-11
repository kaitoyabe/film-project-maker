import { TextField, TextFieldProps } from "@mui/material";
import { DateTimePicker, DateTimePickerProps } from "@mui/x-date-pickers";
import { useState } from "react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

import ErrorTooltip from "./ErrorTooltip";

const CustomDateTimePicker = <T extends FieldValues, TInputDate, TDate>({
  name,
  rules,
  shouldUnregister,
  defaultValue,
  control,
  onChange,
  children,
  autoFocus,
  required,
  onKeyDown,
  ...props
}: UseControllerProps<T> &
  Omit<
    DateTimePickerProps<TInputDate, TDate>,
    "value" | "onChange" | "inputRef" | "renderInput"
  > &
  Partial<Pick<DateTimePickerProps<TInputDate, TDate>, "onChange">> &
  Pick<TextFieldProps, "required" | "onKeyDown">) => {
  const {
    field: { ref, onChange: fieldOnChange, ...field },
    fieldState: { error },
  } = useController({
    control,
    name,
    rules,
    shouldUnregister,
    defaultValue,
  });
  const [hasFocus, setHasFocus] = useState<boolean>(false);

  return (
    <ErrorTooltip error={error} hasFocus={hasFocus}>
      <DateTimePicker
        inputFormat="YYYY年MM月DD日HH:mm"
        mask="____年__月__日__:__"
        views={["day", "hours", "minutes"]}
        {...props}
        {...field}
        onChange={(value, keyboardInputValue) => {
          fieldOnChange(value);
          if (onChange) onChange(value, keyboardInputValue);
        }}
        inputRef={ref}
        renderInput={(params) => (
          <TextField
            autoFocus={autoFocus}
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
            onContextMenu={(e) => {
              e.preventDefault();

              return false;
            }}
            required={required}
          />
        )}
      >
        {children}
      </DateTimePicker>
    </ErrorTooltip>
  );
};
export default CustomDateTimePicker;
