import { RouterProvider } from "react-router-dom";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "./components/ThemeProvider";
import { getSubdomain } from "./lib/utils";
import { router } from "./router";

function App() {
	const subdomain = getSubdomain(window.location.href);
	const domain = import.meta.env.DEV
		? import.meta.env.VITE_APP_DEV_DOMAIN
		: import.meta.env.VITE_APP_BASE_DOMAIN;
	const selectedRouter =
		subdomain === domain ? router.publicRoutes : router.workspaceRoutes;
	// eğer workspaceName valid değilse publicRoutes'a yönlendir
	return (
		<ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
			<RouterProvider router={selectedRouter} />
			<Toaster richColors theme="light" />
		</ThemeProvider>
	);
}

export default App;
