import { TextField, TextFieldProps } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import InputMask from "react-input-mask-next";

import ErrorTooltip from "./ErrorTooltip";

type CustomMaskTextFieldProps = {
  mask: string;
  replace?: RegExp | string;
};

const CustomMaskTextField = <T extends FieldValues>({
  name,
  rules,
  shouldUnregister,
  defaultValue,
  control,
  inputProps,
  onChange,
  onFocus,
  onBlur,
  children,
  select,
  mask,
  replace,
  ...props
}: UseControllerProps<T> &
  Omit<TextFieldProps, "value" | "inputRef" | "error"> &
  CustomMaskTextFieldProps) => {
  const {
    field: { ref, onChange: fieldOnChange, ...field },
    fieldState: { error },
  } = useController({ control, name, rules, shouldUnregister, defaultValue });
  const [hasFocus, setHasFocus] = useState<boolean>(false);
  const divRef = useRef<HTMLDivElement>(null);

  const handleWindowResize = useCallback(() => {
    if (divRef.current && hasFocus && !select) {
      if (
        window.visualViewport &&
        divRef.current.getBoundingClientRect().bottom >
          window.visualViewport.height
      ) {
        divRef.current.scrollIntoView({ block: "center" });
      }
    }
  }, [hasFocus, select]);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, [handleWindowResize]);

  return (
    <ErrorTooltip error={error} hasFocus={hasFocus}>
      <InputMask
        {...field}
        mask={mask}
        maskPlaceholder=""
        onChange={(e) => {
          if (replace) {
            e.target.value = e.target.value.replace(replace, "");
          }
          fieldOnChange(e.target.value);
          if (onChange) onChange(e);
        }}
        onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
          const target = e.target as HTMLInputElement;
          if (target.select) target.select();
        }}
        onFocus={(e) => {
          setHasFocus(true);
          // const el = e.target;
          // setTimeout(() => {
          //   el.select?.();
          // }, 0);
          if (onFocus) onFocus(e);
        }}
        onBlur={(e) => {
          setHasFocus(false);
          if (onBlur) onBlur(e);
        }}
      >
        <TextField
          {...props}
          select={select}
          ref={divRef}
          inputRef={ref}
          error={!!error}
          inputProps={{
            inputMode: "text",
            autoCorrect: "off",
            autoCapitalize: "off",
            enterKeyHint: "next",
            ...inputProps,
          }}
        >
          {children}
        </TextField>
      </InputMask>
    </ErrorTooltip>
  );
};
export default CustomMaskTextField;
