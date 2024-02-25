import React from "react";

export const useBeforeUnload = () => {
	React.useEffect(() => {
		window.onbeforeunload = () => true;

		return () => {
			window.onbeforeunload = null;
		};
	}, []);
};
