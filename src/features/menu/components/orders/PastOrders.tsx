import Loading from "@/components/layout/Loading";
import { usePastOrders } from "@/lib/queries/customer/usePastOrders";

import { OrderCard } from "./order-details";

export const PastOrders = () => {
  const { orders, isLoading } = usePastOrders();

  if (isLoading) {
    return <Loading withLogo={false} />;
  }

  return (
    <div className="pt-2 divide-y">
      {orders?.map((order) => <OrderCard key={order.id} order={order} />)}
    </div>
  );
};
