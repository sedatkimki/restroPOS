import { Outlet } from "react-router-dom";
import { Profile } from "./Profile";
import { Workspace } from "./Workspace";
import { DashboardPage } from "../../components/DasboardPage";

const Settings = () => {
	return (
		<DashboardPage>
			<DashboardPage.Header>
				<DashboardPage.TitleContainer>
					<DashboardPage.Title>Settings</DashboardPage.Title>
					<DashboardPage.Subtitle>
						Configure your workspace and profile
					</DashboardPage.Subtitle>
				</DashboardPage.TitleContainer>
			</DashboardPage.Header>
			<Outlet />
		</DashboardPage>
	);
};

Settings.Profile = Profile;
Settings.Workspace = Workspace;

export { Settings };
