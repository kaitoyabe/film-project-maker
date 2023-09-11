import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useCallback, useEffect, useRef } from "react";

import useConfirmDialog from "hooks/dialog/use-confirm-dialog";

const ConfirmDialog2 = () => {
  const {
    closeConfirmDialog,
    state: {
      isOpen = false,
      title,
      content,
      onClose,
      isCancelFocus = false,
      action,
    },
  } = useConfirmDialog();

  const closeDialog = useCallback(() => {
    if (onClose) {
      void onClose();
    }
    closeConfirmDialog();
  }, [closeConfirmDialog, onClose]);

  const yesButtonRef = useRef<HTMLButtonElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      if (isCancelFocus) {
        setTimeout(() => {
          noButtonRef.current?.focus();
        }, 100);
      } else {
        setTimeout(() => {
          yesButtonRef.current?.focus();
        }, 100);
      }
    }
  }, [isCancelFocus, isOpen]);

  return (
    <Dialog open={isOpen} onClose={() => closeDialog()} fullWidth maxWidth="sm">
      <DialogTitle>{title ?? ""}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Box sx={{ whiteSpace: "pre-wrap" }}>{content}</Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          fullWidth
          size="medium"
          onClick={closeDialog}
          variant="outlined"
          ref={noButtonRef}
        >
          いいえ
        </Button>
        <Button
          fullWidth
          size="medium"
          onClick={(e) => {
            e.currentTarget.disabled = true;
            setTimeout(() => {
              if (e.currentTarget) {
                e.currentTarget.disabled = false;
              }
            }, 2000);
            void action();
            closeConfirmDialog();
          }}
          ref={yesButtonRef}
        >
          はい
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ConfirmDialog2;
