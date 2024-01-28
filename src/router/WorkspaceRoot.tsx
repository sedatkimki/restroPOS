import { Navigate, Outlet } from "react-router-dom";

import { FunctionComponent } from "react";

type WorkspaceRootProps = object;

type WorkspaceRootType = FunctionComponent<WorkspaceRootProps> & {
	index: FunctionComponent;
};

const WorkspaceRoot: WorkspaceRootType = () => {
	// check workspace if it is not valid redirect to public root
	// redirectToRoot();
	return <Outlet />;
};

WorkspaceRoot.index = () => {
	// check roles and redirect to related route
	return <Navigate to="/auth" />;
};

export default WorkspaceRoot;
