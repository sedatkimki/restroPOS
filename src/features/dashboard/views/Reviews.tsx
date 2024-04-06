import { DashboardPage } from "../components/DasboardPage";

export const Reviews = () => {
  return (
    <DashboardPage pageName="Reviews">
      <DashboardPage.Header>
        <DashboardPage.TitleContainer>
          <DashboardPage.Title>Reviews</DashboardPage.Title>
          <DashboardPage.Subtitle>
            See what customers are saying
          </DashboardPage.Subtitle>
        </DashboardPage.TitleContainer>
      </DashboardPage.Header>
    </DashboardPage>
  );
};
