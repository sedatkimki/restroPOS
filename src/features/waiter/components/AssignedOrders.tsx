import Loading from "@/components/layout/Loading";
import { useAssignedOrders } from "@/lib/queries/waiter/useActiveOrders";

import { OrderCard } from "./order-details";

export const AssignedOrders = () => {
  const { orders, error } = useAssignedOrders();

  if (orders === undefined && error === undefined) {
    return <Loading withLogo={false} />;
  }

  return (
    <div className="pt-2 divide-y">
      {orders?.map((order) => (
        <OrderCard key={order.id} order={order} assigned={true} />
      ))}
    </div>
  );
};
