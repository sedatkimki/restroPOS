import * as AuthViews from "@/features/auth/views";
import * as DashboardViews from "@/features/dashboard/views";
import * as MenuViews from "@/features/menu/views";
import { Navigate, createBrowserRouter } from "react-router-dom";

import PublicRoot from "./PublicRoot";
import WorkspaceRoot from "./WorkspaceRoot";

const publicRoutes = createBrowserRouter([
  {
    path: "/",
    Component: PublicRoot,
    children: [
      { index: true, element: <Navigate to="/signup" /> },
      {
        path: "/signup",
        Component: AuthViews.SignUp,
        children: [
          { index: true, Component: AuthViews.SignUp.Form },
          { path: "verify-email", Component: AuthViews.SignUp.VerifyEmail },
        ],
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
        Component: DashboardViews.Dashboard,
        children: [
          { index: true, element: <Navigate to="/dashboard/overview" /> },
          {
            path: "/dashboard/overview",
            Component: DashboardViews.Overview,
          },
          {
            path: "/dashboard/orders",
            Component: DashboardViews.Orders,
          },
          {
            path: "/dashboard/menu",
            children: [
              {
                index: true,
                Component: DashboardViews.Menu,
              },
              {
                path: "/dashboard/menu/add-new-product",
                Component: DashboardViews.Menu.AddNewProduct,
              },
            ],
          },
          {
            path: "/dashboard/staff",
            Component: DashboardViews.Staff,
          },
          {
            path: "/dashboard/tables",
            Component: DashboardViews.Tables,
          },
          {
            path: "/dashboard/reviews",
            Component: DashboardViews.Reviews,
          },
          {
            path: "/dashboard/settings",
            Component: DashboardViews.Settings,
            children: [
              {
                index: true,
                element: <Navigate to="/dashboard/settings/profile" />,
              },
              {
                path: "/dashboard/settings/profile",
                Component: DashboardViews.Settings.Profile,
              },
              {
                path: "/dashboard/settings/workspace",
                Component: DashboardViews.Settings.Workspace,
              },
            ],
          },
        ],
      },
      {
        path: "/menu",
        Component: MenuViews.Menu,
        children: [
          { index: true, element: <Navigate to="/menu/home" /> },
          { path: "/menu/home", Component: MenuViews.Home },
          { path: "/menu/search", Component: MenuViews.Search },
          { path: "/menu/orders", Component: MenuViews.Orders },
          { path: "/menu/cart", Component: MenuViews.Cart },
        ],
      },
      {
        path: "/table/:tableId",
        Component: MenuViews.Table,
      },
      {
        path: "login",
        Component: AuthViews.WorkspaceLogin,
      },
      {
        path: "customer-login",
        Component: AuthViews.CustomerLogin,
        children: [
          { index: true, Component: AuthViews.CustomerLogin.PhoneCheck },
          {
            path: "/customer-login/register",
            Component: AuthViews.CustomerLogin.Register,
          },
          {
            path: "/customer-login/otp",
            Component: AuthViews.CustomerLogin.OTP,
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
