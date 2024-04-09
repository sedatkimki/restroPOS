import { DashboardPage } from "../components/DasboardPage";

export const Overview = () => {
  return (
    <DashboardPage pageName="Overview">
      <DashboardPage.Header>
        <DashboardPage.TitleContainer>
          <DashboardPage.Title>Overview</DashboardPage.Title>
          <DashboardPage.Subtitle>
            See how your business is doing
          </DashboardPage.Subtitle>
        </DashboardPage.TitleContainer>
      </DashboardPage.Header>
    </DashboardPage>
  );
};
