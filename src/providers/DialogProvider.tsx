import { DialogProps } from "@mui/material";
import React, { createContext, useCallback, useMemo, useReducer } from "react";

import CustomDialog2 from "components/common/dialog/CustomDialog2";

type CustomDialogProps = Omit<DialogProps, "open" | "onClose" | "children">;

type DialogState = {
  isOpen?: boolean;
  title?: string;
  content?: string | JSX.Element;
  dialogProps?: CustomDialogProps;
  onClose?: () => void | Promise<void>;
  modeless?: boolean;
};

type DialogContextType = {
  state: DialogState;
  openDialog: (state: DialogState) => void;
  closeDialog: () => void;
};

type DialogAction = {
  type: "OPEN_DIALOG" | "CLOSE_DIALOG";
  state: DialogState;
};

export const DialogContext = createContext<DialogContextType>({
  state: {
    isOpen: false,
    title: undefined,
    content: undefined,
    dialogProps: undefined,
    onClose: undefined,
    modeless: undefined,
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  openDialog: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  closeDialog: () => {},
});

const dialogReducer: React.Reducer<DialogState, DialogAction> = (
  state,
  action
) => {
  switch (action.type) {
    case "OPEN_DIALOG":
      return {
        ...action.state,
        isOpen: true,
      };
    case "CLOSE_DIALOG":
      return {
        ...state,
        isOpen: false,
      };
    default:
      return state;
  }
};

const DialogProvider = ({ children }: React.PropsWithChildren) => {
  const [state, dispatch] = useReducer(dialogReducer, {
    isOpen: false,
    title: undefined,
    content: undefined,
    dialogProps: undefined,
    onClose: undefined,
    modeless: undefined,
  } as DialogState);

  const openDialog = useCallback(
    ({ title, content, dialogProps, onClose, modeless }: DialogState) => {
      dispatch({
        type: "OPEN_DIALOG",
        state: {
          title,
          content,
          dialogProps,
          onClose,
          modeless,
        },
      });
    },
    []
  );

  const closeDialog = useCallback(() => {
    dispatch({ type: "CLOSE_DIALOG", state: {} });
  }, []);

  const value = useMemo(
    () => ({
      state,
      openDialog,
      closeDialog,
    }),
    [closeDialog, openDialog, state]
  );

  return (
    <DialogContext.Provider value={value}>
      {children}
      <CustomDialog2 />
    </DialogContext.Provider>
  );
};
export default DialogProvider;
