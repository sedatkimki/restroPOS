import { DashboardPage } from "../components/DasboardPage";

export const Menu = () => {
	return (
		<DashboardPage pageName="Menu">
			<DashboardPage.Header>
				<DashboardPage.TitleContainer>
					<DashboardPage.Title>Menu</DashboardPage.Title>
					<DashboardPage.Subtitle>
						Manage your menu items
					</DashboardPage.Subtitle>
				</DashboardPage.TitleContainer>
			</DashboardPage.Header>
		</DashboardPage>
	);
};
