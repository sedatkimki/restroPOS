import { Navigate, createBrowserRouter } from "react-router-dom";
import PublicRoot from "./PublicRoot";
import WorkspaceRoot from "./WorkspaceRoot";
import { SignUp } from "@/features/auth";
import { Dashboard } from "@/features/dashboard";

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
			{
				path: "/dashboard",
				Component: Dashboard,
				children: [
					{ index: true, element: <Navigate to="/dashboard/overview" /> },
					{
						path: "/dashboard/overview",
						element: <div>overview</div>,
					},
					{
						path: "/dashboard/orders",
						element: <div>orders</div>,
					},
					{
						path: "/dashboard/menu",
						element: <div>menu</div>,
					},
					{
						path: "/dashboard/staff",
						element: <div>staff</div>,
					},
					{
						path: "/dashboard/tables",
						element: <div>tables</div>,
					},
					{
						path: "/dashboard/reviews",
						element: <div>reviews</div>,
					},
					{
						path: "/dashboard/settings",
						element: <div>settings</div>,
					},
				],
			},
		],
		errorElement: <div>404</div>,
	},
]);

export const router = {
	publicRoutes,
	workspaceRoutes,
};
