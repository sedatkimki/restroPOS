import { Navigate, createBrowserRouter } from "react-router-dom";
import PublicRoot from "./PublicRoot";
import WorkspaceRoot from "./WorkspaceRoot";
import { SignUp } from "@/features/auth";

const publicRoutes = createBrowserRouter([
	{
		path: "/",
		Component: PublicRoot,
		children: [
			{ index: true, element: <Navigate to="/signup" /> },
			{
				path: "/signup",
				Component: SignUp,
			},
		],
	},
]);

const workspaceRoutes = createBrowserRouter([
	{
		path: "/",
		// her iki route için de bi root yazılacak ve user ve workspace kontrolü yapılacak
		Component: WorkspaceRoot,
		children: [
			// TODO : role based routing icin index kullanilabilir
			{ index: true, Component: WorkspaceRoot.index },
			// {
			// 	path: "/dashboard",
			// 	element: <div>dashboard</div>,
			// },
		],
		errorElement: <div>404</div>,
	},
]);

export const router = {
	publicRoutes,
	workspaceRoutes,
};
