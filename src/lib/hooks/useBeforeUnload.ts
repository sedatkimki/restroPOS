import React from "react";

export const useBeforeUnload = (callback?: () => void) => {
  React.useEffect(() => {
    window.onbeforeunload = () => true;

    return () => {
      callback?.();
      window.onbeforeunload = null;
    };
  }, [callback]);
};
