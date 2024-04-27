import { DashboardPage } from "@/features/dashboard/components/DasboardPage";
import { useActiveOrders } from "@/lib/queries/kitchen/useActiveOrders";

import { OrderCard } from "../components/OrderCard";
import { ProfileDropdown } from "../components/ProfileDropdown";

export const Orders = () => {
  const { orders } = useActiveOrders();
  return (
    <DashboardPage pageName="Orders">
      <DashboardPage.Header>
        <DashboardPage.TitleContainer>
          <DashboardPage.Title>Orders</DashboardPage.Title>
        </DashboardPage.TitleContainer>
        <DashboardPage.Action>
          <ProfileDropdown />
        </DashboardPage.Action>
      </DashboardPage.Header>
      <div className="columns-1 md:columns-2 lg:columns-3 column-gap-6">
        {orders?.map((order) => <OrderCard key={order.id} order={order} />)}
      </div>
    </DashboardPage>
  );
};
