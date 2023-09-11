import { useContext, useEffect } from "react";

import { ConfirmDialogContext } from "providers/ConfirmDialogProvider";

const useConfirmDialog = () => {
  const context = useContext(ConfirmDialogContext);

  useEffect(() => {
    if (context.state.isOpen) {
      window.addEventListener("popstate", context.closeConfirmDialog);

      return () => {
        window.removeEventListener("popstate", context.closeConfirmDialog);
      };
    }

    return undefined;
  }, [context.closeConfirmDialog, context.state.isOpen]);

  return context;
};
export default useConfirmDialog;
