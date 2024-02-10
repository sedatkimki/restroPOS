import { DashboardPage } from "../components/DasboardPage";

export const Orders = () => {
	return (
		<DashboardPage pageName="Orders">
			<DashboardPage.Header>
				<DashboardPage.TitleContainer>
					<DashboardPage.Title>Orders</DashboardPage.Title>
					<DashboardPage.Subtitle>Manage your orders</DashboardPage.Subtitle>
				</DashboardPage.TitleContainer>
			</DashboardPage.Header>
		</DashboardPage>
	);
};
