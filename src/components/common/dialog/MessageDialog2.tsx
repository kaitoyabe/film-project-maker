import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useCallback } from "react";

import useMessageDialog from "hooks/dialog/use-message-dialog";
import { theme } from "utils/Theme";

const MessageDialog2 = () => {
  const {
    closeMessageDialog,
    state: { isOpen = false, title, content, onClose },
  } = useMessageDialog();

  const closeDialog = useCallback(() => {
    if (onClose) {
      void onClose();
    }
    closeMessageDialog();
  }, [closeMessageDialog, onClose]);

  return (
    <Dialog
      open={isOpen}
      onClose={() => closeDialog()}
      fullWidth
      maxWidth="sm"
      sx={{
        ".MuiDialog-paper": {
          margin: { xs: theme.spacing(2), sm: theme.spacing(4) },
        },
      }}
    >
      <DialogTitle>{title ?? ""}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <DialogContentText>
            <Box sx={{ whiteSpace: "pre-wrap" }}>{content}</Box>
          </DialogContentText>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} fullWidth>
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default MessageDialog2;
