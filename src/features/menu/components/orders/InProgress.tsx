import Loading from "@/components/layout/Loading";
import { useActiveOrders } from "@/lib/queries/customer/useActiveOrders";

import { OrderCard } from "./order-details";

export const InProgress = () => {
  const { orders, loading } = useActiveOrders();

  if (loading) {
    return <Loading withLogo={false} />;
  }

  return (
    <div className="pt-2 divide-y">
      {orders?.map((order) => <OrderCard key={order.id} order={order} />)}
    </div>
  );
};
