import { Box, Tooltip, TooltipProps } from "@mui/material";
import { FC } from "react";
import { FieldError } from "react-hook-form";

type ErrorTooltipProps = {
  error?: FieldError;
  hasFocus: boolean;
} & Omit<TooltipProps, "title">;
const ErrorTooltip: FC<ErrorTooltipProps> = ({ error, hasFocus, ...props }) => (
  <Tooltip
    title={error?.message || ""}
    open={!!error?.message && hasFocus}
    arrow
    placement="bottom-end"
    {...props}
  >
    <Box>{props.children}</Box>
  </Tooltip>
);
export default ErrorTooltip;
