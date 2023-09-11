import { TextField, TextFieldProps } from "@mui/material";
import { useEffect, useRef } from "react";

const DisplayTextArea = ({ ...props }: TextFieldProps) => {
  const textAreaElement = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    (() => {
      if (textAreaElement.current) {
        const { scrollHeight } = textAreaElement.current;
        textAreaElement.current.scrollTop = scrollHeight;
      }
    })();
  }, [props.value]);

  return (
    <TextField
      {...props}
      value={props.value || ""}
      multiline
      minRows={100}
      disabled
      inputRef={textAreaElement}
      sx={{
        height: "100%",
        "& .MuiOutlinedInput-root": {
          height: "100%",
          paddingTop: 1,
          alignItems: "flex-start",
        },
        "& textArea": {
          maxHeight: "100%",
          overflow: "auto !important",
          boxSizing: "border-box",
        },
      }}
    />
  );
};
export default DisplayTextArea;
