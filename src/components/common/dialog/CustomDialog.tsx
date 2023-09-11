import {
  Box,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  Grid,
} from "@mui/material";
import { cloneElement, FC, memo, ReactElement } from "react";

import { theme } from "utils/Theme";

type CustomDialogProps = {
  title: string;
  subtitle?: string | ReactElement;
  children: ReactElement;
  height?: string;
} & DialogProps;
const CustomDialog: FC<CustomDialogProps> = (props) => {
  const { title, subtitle, children, height, ...other } = props;
  const newChildren = cloneElement(children, { onClose: other.onClose });

  return (
    <Dialog
      {...other}
      sx={{
        ".css-1rfa6f7-MuiPaper-root-MuiDialog-paper": {
          minHeight: () => height || "auto",
        },
        zIndex: theme.zIndex.drawer,
      }}
    >
      <Grid container justifyContent="space-between">
        <Grid item xs>
          <DialogTitle>
            <Grid container>
              <Box sx={{ whiteSpace: "pre-wrap" }}>{title}</Box>
              {!!subtitle && (
                <Grid container item xs sx={{ whiteSpace: "pre-wrap" }}>
                  {subtitle}
                </Grid>
              )}
            </Grid>
          </DialogTitle>
        </Grid>
      </Grid>
      <DialogContent dividers>{newChildren}</DialogContent>
    </Dialog>
  );
};

export default memo(CustomDialog);
