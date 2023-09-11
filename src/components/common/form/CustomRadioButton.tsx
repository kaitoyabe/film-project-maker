import {
  FormControlLabel,
  RadioGroup,
  Radio,
  RadioGroupProps,
  RadioProps,
  FormControlLabelProps,
} from "@mui/material";
import React, { ReactNode, useState } from "react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

import ErrorTooltip from "./ErrorTooltip";

type CustomRadioButtonProps = {
  name1?: string;
  name2?: string;
  value1: unknown;
  value2?: unknown;
  label1: ReactNode;
  label2?: ReactNode;
};

const CustomRadioButton = <T extends FieldValues>({
  name,
  rules,
  shouldUnregister,
  defaultValue,
  control,
  onChange,
  checked,
  name1,
  name2,
  value1,
  value2,
  label1,
  label2,
  ...props
}: UseControllerProps<T> &
  Omit<FormControlLabelProps, "control" | "onChange" | "value" | "label"> &
  Partial<Pick<FormControlLabelProps, "onChange" | "label">> &
  Omit<RadioProps, "value" | "onChange" | "onFocus"> &
  Partial<Pick<RadioGroupProps, "onChange">> &
  CustomRadioButtonProps) => {
  const {
    field: { ref, onChange: fieldOnChange, value, ...field },
    fieldState: { error },
  } = useController({ control, name, rules, shouldUnregister, defaultValue });
  const [hasFocus, setHasFocus] = useState<boolean>(false);

  return (
    <ErrorTooltip error={error} hasFocus={hasFocus}>
      <RadioGroup
        name={name}
        onChange={onChange}
        value={value}
        row
        sx={{ marginTop: -1.5 }}
      >
        <FormControlLabel
          value={value1}
          label={label1}
          {...field}
          {...props}
          onChange={(value, keyboardInputValue) => {
            fieldOnChange(value);
            if (onChange) onChange(value, keyboardInputValue);
          }}
          control={
            <Radio
              name={name1}
              inputRef={ref}
              onChange={onChange}
              checked={checked}
              onFocus={() => setHasFocus(true)}
            />
          }
        />
        {value2 || label2 ? (
          <FormControlLabel
            value={value2}
            label={label2}
            {...field}
            {...props}
            onChange={(value, keyboardInputValue) => {
              fieldOnChange(value);
              if (onChange) onChange(value, keyboardInputValue);
            }}
            control={
              <Radio
                name={name2}
                onChange={onChange}
                checked={checked}
                onFocus={() => setHasFocus(true)}
              />
            }
          />
        ) : (
          <></>
        )}
      </RadioGroup>
    </ErrorTooltip>
  );
};
export default CustomRadioButton;
