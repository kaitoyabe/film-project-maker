import React, { createContext, useCallback, useMemo, useReducer } from "react";

import MessageDialog2 from "components/common/dialog/MessageDialog2";

type MessageDialogState = {
  isOpen?: boolean;
  title?: string;
  content?: string | JSX.Element;
  onClose?: () => void | Promise<void>;
};

type MessageDialogContextType = {
  state: MessageDialogState;
  openMessageDialog: (state: MessageDialogState) => void;
  closeMessageDialog: () => void;
};

type MessageDialogAction = {
  type: "OPEN_DIALOG" | "CLOSE_DIALOG";
  state: MessageDialogState;
};

export const MessageDialogContext = createContext<MessageDialogContextType>({
  state: {
    isOpen: false,
    title: undefined,
    content: undefined,
    onClose: undefined,
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  openMessageDialog: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  closeMessageDialog: () => {},
});

const messageDialogReducer: React.Reducer<
  MessageDialogState,
  MessageDialogAction
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

const MessageDialogProvider = ({ children }: React.PropsWithChildren) => {
  const [state, dispatch] = useReducer(messageDialogReducer, {
    isOpen: false,
    title: undefined,
    content: undefined,
    onClose: undefined,
  } as MessageDialogState);

  const openMessageDialog = useCallback(
    ({ title, content, onClose }: MessageDialogState) => {
      dispatch({
        type: "OPEN_DIALOG",
        state: {
          title,
          content,
          onClose,
        },
      });
    },
    []
  );

  const closeMessageDialog = useCallback(() => {
    dispatch({ type: "CLOSE_DIALOG", state: {} });
  }, []);

  const value = useMemo(
    () => ({
      state,
      openMessageDialog,
      closeMessageDialog,
    }),
    [closeMessageDialog, openMessageDialog, state]
  );

  return (
    <MessageDialogContext.Provider value={value}>
      {children}
      <MessageDialog2 />
    </MessageDialogContext.Provider>
  );
};
export default MessageDialogProvider;
