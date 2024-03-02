import { Toaster } from "@/components/ui/sonner";
import { RouterProvider } from "react-router-dom";
import { getSubdomain } from "./lib/utils";
import { router } from "./router";

function App() {
	const subdomain = getSubdomain(window.location.href);
	const domain = import.meta.env.DEV
		? import.meta.env.VITE_APP_DEV_DOMAIN
		: import.meta.env.VITE_APP_BASE_DOMAIN;
	const selectedRouter =
		subdomain === domain ? router.publicRoutes : router.workspaceRoutes;
	console.log("workspace", subdomain);
	console.log("domain", domain);
	console.log(selectedRouter);
	// eğer workspaceName valid değilse publicRoutes'a yönlendir
	return (
		<>
			<RouterProvider router={selectedRouter} />
			<Toaster richColors theme="light" />
		</>
	);
}

export default App;
