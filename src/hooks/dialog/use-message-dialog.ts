import { useContext, useEffect } from "react";

import { MessageDialogContext } from "providers/MessageDialogProvider";

const useMessageDialog = () => {
  const context = useContext(MessageDialogContext);

  useEffect(() => {
    if (context.state.isOpen) {
      window.addEventListener("popstate", context.closeMessageDialog);

      return () => {
        window.removeEventListener("popstate", context.closeMessageDialog);
      };
    }

    return undefined;
  }, [context.closeMessageDialog, context.state.isOpen]);

  return context;
};
export default useMessageDialog;
