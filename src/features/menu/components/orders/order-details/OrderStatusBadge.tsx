import { OrderStatus } from "@/lib";
import { FC } from "react";

import { ORDER_COLORS, ORDER_ICONS } from "./constants";

type OrderStatusBadgeProps = {
  status: OrderStatus;
};

export const OrderStatusBadge: FC<OrderStatusBadgeProps> = ({ status }) => {
  return (
    <div
      className={`flex items-center justify-center rounded-full ${ORDER_COLORS[status][0]}  w-8 h-8`}
    >
      {ORDER_ICONS[status]}
    </div>
  );
};
