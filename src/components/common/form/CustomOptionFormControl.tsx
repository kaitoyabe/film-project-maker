import { FormControl, InputLabel } from "@mui/material";
import { ReactElement } from "react";
import { FieldError } from "react-hook-form";

import { theme } from "utils/Theme";

export type CustomOptionFormControlProps = {
  children: ReactElement;
  optionId: number;
  displayOptionName: string;
  error?: FieldError;
  onInputLabelClick: (optionId: number, displayOptionName: string) => void;
};

const CustomOptionFormControl = ({
  children,
  optionId,
  displayOptionName,
  error,
  onInputLabelClick,
}: CustomOptionFormControlProps) => (
  <FormControl error={!!error}>
    <InputLabel
      onClick={() => onInputLabelClick(optionId, displayOptionName)}
      sx={{
        bgcolor: theme.palette.common.white,
        marginLeft: `-4px`,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        cursor: "pointer",
        "&:hover": {
          color: `${theme.palette.primary.main} !important`,
          fontWeight: 700,
        },
      }}
      shrink
    >
      {displayOptionName}
    </InputLabel>
    {children}
  </FormControl>
);

export default CustomOptionFormControl;
