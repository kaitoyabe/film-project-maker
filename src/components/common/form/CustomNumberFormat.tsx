import { Box, TextField, TextFieldProps } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { NumericFormat, NumericFormatProps } from "react-number-format";

import ErrorTooltip from "./ErrorTooltip";

type CustomNumberFormatProps = {
  formattedValue?: boolean;
  string?: boolean;
  onBlurZero?: boolean;
};

const CustomNumberFormat = <T extends FieldValues>({
  name,
  rules,
  shouldUnregister,
  defaultValue,
  control,
  onValueChange,
  inputProps,
  children,
  onFocus,
  onBlur,
  formattedValue,
  string,
  onBlurZero,
  ...props
}: UseControllerProps<T> &
  Omit<
    NumericFormatProps<TextFieldProps>,
    "value" | "inputRef" | "customInput" | "error"
  > &
  CustomNumberFormatProps) => {
  const {
    field: { ref, onChange: fieldOnChange, onBlur: _, ...field },
    fieldState: { error },
  } = useController({
    control,
    name,
    rules,
    shouldUnregister,
    defaultValue,
  });
  const [hasFocus, setHasFocus] = useState<boolean>(props.autoFocus || false);
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
      <Box ref={divRef}>
        <NumericFormat
          decimalScale={0}
          thousandSeparator
          thousandsGroupStyle="thousand"
          {...props}
          {...field}
          inputRef={ref}
          onValueChange={(values, sourceInfo) => {
            if (string) {
              fieldOnChange(values.value ?? null);
            } else if (formattedValue) {
              fieldOnChange(values.formattedValue ?? null);
            } else {
              fieldOnChange(values.floatValue ?? null);
            }
            if (onValueChange) onValueChange(values, sourceInfo);
          }}
          customInput={TextField}
          error={!!error}
          onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
            const target = e.target as HTMLInputElement;
            if (target.select) target.select();
          }}
          onFocus={(
            e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
          ) => {
            setHasFocus(true);
            if (e.target.select) e.target.select();
            if (onFocus)
              onFocus(e as React.FocusEvent<HTMLInputElement, Element>);
          }}
          onBlur={(
            e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
          ) => {
            setHasFocus(false);
            if (onBlur)
              onBlur(e as React.FocusEvent<HTMLInputElement, Element>);
            if (onBlurZero && !e.target.value && e.target.value !== "") {
              fieldOnChange(0);
            }
          }}
          inputProps={{
            inputMode: "numeric",
            autoCorrect: "off",
            autoCapitalize: "off",
            ...inputProps,
          }}
        >
          {children}
        </NumericFormat>
      </Box>
    </ErrorTooltip>
  );
};
export default CustomNumberFormat;
