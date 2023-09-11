import {
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
  PaperProps,
} from "@mui/material";
import { useCallback } from "react";
import Draggable from "react-draggable";

import useDialog from "hooks/dialog/use-dialog";

const CustomDialog2 = () => {
  const {
    closeDialog,
    state: {
      isOpen = false,
      title,
      content,
      dialogProps: props,
      onClose,
      modeless,
    },
  } = useDialog();

  const closeCustomDialog = useCallback(() => {
    if (onClose) {
      void onClose();
    }
    closeDialog();
  }, [closeDialog, onClose]);

  const PaperComponent = (props: PaperProps) => (
    <Draggable cancel={'[class*="MuiTextField-root"]'}>
      <Paper {...props} />
    </Draggable>
  );

  return (
    <Dialog
      open={isOpen}
      onClose={() => closeCustomDialog()}
      {...props}
      hideBackdrop={modeless}
      disableEnforceFocus={modeless}
      style={modeless ? { pointerEvents: "none", cursor: "move" } : undefined}
      PaperProps={modeless ? { style: { pointerEvents: "auto" } } : undefined}
      PaperComponent={modeless ? PaperComponent : undefined}
    >
      <DialogTitle>{title ?? ""}</DialogTitle>
      <DialogContent dividers>{content}</DialogContent>
    </Dialog>
  );
};
export default CustomDialog2;
