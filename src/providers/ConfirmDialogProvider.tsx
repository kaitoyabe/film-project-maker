import React, { createContext, useCallback, useMemo, useReducer } from "react";

import ConfirmDialog2 from "components/common/dialog/ConfirmDialog2";

type ConfirmDialogState = {
  isOpen?: boolean;
  title?: string;
  content?: string | JSX.Element;
  onClose?: () => void | Promise<void>;
  action: () => Promise<void> | void;
  isCancelFocus?: boolean;
};

type ConfirmDialogContextType = {
  state: ConfirmDialogState;
  openConfirmDialog: (state: ConfirmDialogState) => void;
  closeConfirmDialog: () => void;
};

type ConfirmDialogAction = {
  type: "OPEN_DIALOG" | "CLOSE_DIALOG";
  state: ConfirmDialogState;
};

export const ConfirmDialogContext = createContext<ConfirmDialogContextType>({
  state: {
    title: undefined,
    content: undefined,
    onClose: undefined,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    action: () => {},
    isCancelFocus: false,
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  openConfirmDialog: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  closeConfirmDialog: () => {},
});

const confirmDialogReducer: React.Reducer<
  ConfirmDialogState,
  ConfirmDialogAction
> = (state, action) => {
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

const ConfirmDialogProvider = ({ children }: React.PropsWithChildren) => {
  const [state, dispatch] = useReducer(confirmDialogReducer, {
    isOpen: false,
    title: undefined,
    content: undefined,
    onClose: undefined,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    action: () => {},
    isCancelFocus: false,
  } as ConfirmDialogState);

  const openConfirmDialog = useCallback(
    ({
      title,
      content,
      onClose,
      action,
      isCancelFocus = false,
    }: ConfirmDialogState) => {
      dispatch({
        type: "OPEN_DIALOG",
        state: {
          title,
          content,
          onClose,
          action,
          isCancelFocus,
        },
      });
    },
    []
  );

  const closeConfirmDialog = useCallback(() => {
    dispatch({
      type: "CLOSE_DIALOG",
      state: {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        action: () => {},
      },
    });
  }, []);

  const value = useMemo(
    () => ({
      state,
      openConfirmDialog,
      closeConfirmDialog,
    }),
    [closeConfirmDialog, openConfirmDialog, state]
  );

  return (
    <ConfirmDialogContext.Provider value={value}>
      {children}
      <ConfirmDialog2 />
    </ConfirmDialogContext.Provider>
  );
};
export default ConfirmDialogProvider;
