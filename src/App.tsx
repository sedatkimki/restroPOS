import { useWorkspace } from "./lib/utils";
import { router } from "./router";
import { RouterProvider } from "react-router-dom";

function App() {
	const workspaceName = useWorkspace();
	const domain = import.meta.env.DEV
		? import.meta.env.VITE_APP_DEV_DOMAIN
		: import.meta.env.VITE_APP_BASE_DOMAIN;
	const selectedRouter =
		workspaceName === domain ? router.publicRoutes : router.workspaceRoutes;
	console.log("workspace", workspaceName);
	console.log("domain", domain);
	console.log(selectedRouter);

	return <RouterProvider router={selectedRouter} />;
}

export default App;
