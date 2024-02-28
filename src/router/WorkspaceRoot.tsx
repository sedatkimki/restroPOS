import { Navigate, Outlet } from "react-router-dom";

import { FunctionComponent } from "react";
import { redirectToRoot } from "@/lib/utils";
import Loading from "@/components/layout/Loading";
import { useWorkspaceExist } from "@/lib/queries/useWorkspaceExist";

type WorkspaceRootProps = object;

type WorkspaceRootType = FunctionComponent<WorkspaceRootProps> & {
	index: FunctionComponent;
};

const WorkspaceRoot: WorkspaceRootType = () => {
	const { workspaceExist, isLoading } = useWorkspaceExist();

	if (isLoading) {
		return <Loading />;
	}

	if (!workspaceExist) {
		redirectToRoot();
	}

	return <Outlet />;
};

WorkspaceRoot.index = () => {
	return <Navigate to="/dashboard" />;
};

export default WorkspaceRoot;
