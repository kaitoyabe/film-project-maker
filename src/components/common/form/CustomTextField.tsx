import { TextField, TextFieldProps } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

import ErrorTooltip from "./ErrorTooltip";

const CustomTextField = <T extends FieldValues>({
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
  ...props
}: UseControllerProps<T> &
  Omit<TextFieldProps, "value" | "inputRef" | "error">) => {
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
      <TextField
        {...props}
        {...field}
        select={select}
        onChange={(e) => {
          fieldOnChange(e);
          if (onChange) onChange(e);
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
        // onContextMenu={(e) => {
        //   e.preventDefault();

        //   return false;
        // }}
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
    </ErrorTooltip>
  );
};
export default CustomTextField;
