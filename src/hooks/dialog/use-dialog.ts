import { useContext, useEffect } from "react";

import { DialogContext } from "providers/DialogProvider";

const useDialog = () => {
  const context = useContext(DialogContext);

  useEffect(() => {
    if (context.state.isOpen) {
      window.addEventListener("popstate", context.closeDialog);

      return () => {
        window.removeEventListener("popstate", context.closeDialog);
      };
    }

    return undefined;
  }, [context.closeDialog, context.state.isOpen]);

  return context;
};
export default useDialog;
