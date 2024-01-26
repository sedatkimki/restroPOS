import { createBrowserRouter } from "react-router-dom";

const publicRoutes = createBrowserRouter([
	{
		path: "/",
		element: <div>Public</div>,
		children: [],
	},
]);

const workspaceRoutes = createBrowserRouter([
	{
		path: "/",
		element: <div>workspace</div>,
		children: [],
	},
]);

export const router = {
	publicRoutes,
	workspaceRoutes,
};
