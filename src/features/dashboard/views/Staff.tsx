import { DashboardPage } from "../components/DasboardPage";

export const Staff = () => {
	return (
		<DashboardPage pageName="Staff">
			<DashboardPage.Header>
				<DashboardPage.TitleContainer>
					<DashboardPage.Title>Staff</DashboardPage.Title>
					<DashboardPage.Subtitle>
						Manage your staff members
					</DashboardPage.Subtitle>
				</DashboardPage.TitleContainer>
			</DashboardPage.Header>
		</DashboardPage>
	);
};
