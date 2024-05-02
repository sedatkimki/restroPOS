import { DashboardPage } from "../components/DasboardPage";
import { ActiveOrdersCard } from "../components/orders/ActiveOrdersCard";
import { PastOrdersCard } from "../components/orders/PastOrdersCard";

export const Orders = () => {
  return (
    <DashboardPage pageName="Orders">
      <DashboardPage.Header>
        <DashboardPage.TitleContainer>
          <DashboardPage.Title>Orders</DashboardPage.Title>
          <DashboardPage.Subtitle>Manage your orders</DashboardPage.Subtitle>
        </DashboardPage.TitleContainer>
      </DashboardPage.Header>
      <div className="flex flex-col gap-4 pb-24">
        <ActiveOrdersCard />
        <PastOrdersCard />
      </div>
    </DashboardPage>
  );
};
