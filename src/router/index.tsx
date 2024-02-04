import { Navigate, createBrowserRouter } from "react-router-dom";
import PublicRoot from "./PublicRoot";
import WorkspaceRoot from "./WorkspaceRoot";
import { SignUp, WorkspaceLogin } from "@/features/auth";
import { Dashboard, Settings } from "@/features/dashboard";
import { Cart, Home, Menu, Orders, Search } from "@/features/menu";

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
						Component: Settings,
						children: [
							{
								index: true,
								element: <Navigate to="/dashboard/settings/profile" />,
							},
							{
								path: "/dashboard/settings/profile",
								Component: Settings.Profile,
							},
							{
								path: "/dashboard/settings/workspace",
								Component: Settings.Workspace,
							},
						],
					},
				],
			},
			{
				path: "/menu",
				Component: Menu,
				children: [
					{ index: true, element: <Navigate to="/menu/home" /> },
					{ path: "/menu/home", Component: Home },
					{ path: "/menu/search", Component: Search },
					{ path: "/menu/orders", Component: Orders },
					{ path: "/menu/cart", Component: Cart },
				],
			},
			{
				path: "login",
				Component: WorkspaceLogin,
			},
		],
		errorElement: <div>404</div>,
	},
]);

export const router = {
	publicRoutes,
	workspaceRoutes,
};
