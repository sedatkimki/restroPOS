import { Toaster } from "@/components/ui/sonner";
import { RouterProvider } from "react-router-dom";

import { ThemeProvider } from "./components/ThemeProvider";
import { ConfirmDialog } from "./components/dialogs/ConfirmDialog";
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
      <div vaul-drawer-wrapper="" className="bg-white min-h-[100vh]">
        <RouterProvider router={selectedRouter} />
        <ConfirmDialog />
      </div>
      <Toaster
        richColors
        theme="light"
        toastOptions={{
          className: " z-[99999]",
        }}
      />
    </ThemeProvider>
  );
}

export default App;
