import Loading from "@/components/layout/Loading";
import { useActiveOrders } from "@/lib/queries/waiter/useActiveOrders";

import { OrderCard } from "./order-details";

export const ActiveOrders = () => {
  const { orders, error } = useActiveOrders();

  if (orders === undefined && error === undefined) {
    return <Loading withLogo={false} />;
  }

  return (
    <div className="pt-2 divide-y">
      {orders?.map((order) => <OrderCard key={order.id} order={order} />)}
    </div>
  );
};
