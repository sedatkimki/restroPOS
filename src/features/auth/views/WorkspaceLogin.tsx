import Loading from "@/components/layout/Loading";
import { useUser } from "@/lib/queries";
import { Navigate } from "react-router-dom";

import { Layout } from "../components/Layout";
import { WorkspaceLoginForm } from "../components/WorkspaceLoginForm";

export const WorkspaceLogin = () => {
  const { user, isLoading } = useUser();

  if (isLoading) return <Loading />;

  if (user) {
    return <Navigate to="/dashboard/overview" />;
  }

  return (
    <Layout>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
        <div className="flex flex-col space-y-2 ">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome to Restropos
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in to your workspace
          </p>
        </div>
        <WorkspaceLoginForm />
      </div>
    </Layout>
  );
};
