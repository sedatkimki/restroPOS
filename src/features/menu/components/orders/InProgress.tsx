import { OrderStatus } from "@/lib";

import { OrderCard } from "./order-details";

export const InProgress = () => {
  return (
    <div className="pt-2 divide-y">
      <OrderCard status={OrderStatus.RECEIVED} />
      <OrderCard status={OrderStatus.PREPARING} />
      <OrderCard status={OrderStatus.SERVING} />
      <OrderCard status={OrderStatus.ON_TABLE} />
      <OrderCard status={OrderStatus.COMPLETED} />
      <OrderCard status={OrderStatus.CANCELED} />
    </div>
  );
};
