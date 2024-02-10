import { Outlet } from "react-router-dom";
import { Profile } from "./Profile";
import { Workspace } from "./Workspace";
import { DashboardPage } from "../../components/DasboardPage";
import { SidebarNav } from "../../components/settings/SidebarNav";

const items = [
	{ name: "Profile", path: "/dashboard/settings/profile" },
	{ name: "Workspace", path: "/dashboard/settings/workspace" },
];

const Settings = () => {
	return (
		<DashboardPage pageName="Settings">
			<DashboardPage.Header>
				<DashboardPage.TitleContainer>
					<DashboardPage.Title>Settings</DashboardPage.Title>
					<DashboardPage.Subtitle>
						Configure your workspace and profile
					</DashboardPage.Subtitle>
				</DashboardPage.TitleContainer>
			</DashboardPage.Header>
			<div className="flex flex-col space-y-8 lg:flex-row lg:space-x-10 lg:space-y-0">
				<SidebarNav items={items} className="lg:w-1/5" />
				<div className="flex-1 lg:max-w-2xl">
					<Outlet />
				</div>
			</div>
		</DashboardPage>
	);
};

Settings.Profile = Profile;
Settings.Workspace = Workspace;

export { Settings };
