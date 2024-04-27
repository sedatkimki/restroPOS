import { FirestoreOrderDto, OrderStatus } from "@/lib";
import { useOrderDrawer } from "@/lib/store/useOrderDrawer";
import { ChevronRight } from "lucide-react";
import moment from "moment";
import { FC } from "react";

import { OrderStatusBadge } from "./OrderStatusBadge";
import { ORDER_COLORS, ORDER_LABELS } from "./constants";

type OrderCardProps = {
  order: FirestoreOrderDto;
};

export const OrderCard: FC<OrderCardProps> = ({ order }) => {
  const openDrawer = useOrderDrawer((state) => state.openDrawer);

  return (
    <div
      className="flex gap-3 py-2"
      onClick={() => {
        openDrawer(order);
      }}
    >
      <OrderStatusBadge status={order.orderStatus as OrderStatus} />
      <div className="grid grid-rows-3">
        <span
          className={`font-semibold text-md ${ORDER_COLORS[order?.orderStatus || OrderStatus.RECEIVED][1]}`}
        >
          {ORDER_LABELS[order?.orderStatus || OrderStatus.RECEIVED]}
        </span>
        <span className="text-sm font-medium">
          {order?.orderProducts
            ?.map(
              (product) =>
                `${product.quantity}x ${product.product?.productName}`,
            )
            .join(", ")}
        </span>
        <span className="text-xs font-medium">
          <span className="text-muted-foreground">
            {moment(order.orderCreationTime?.toDate()).format("LLL")} •{" "}
            {order?.orderProducts?.length} products •{" "}
          </span>
          {order?.totalOrderPrice} ₺
        </span>
      </div>
      <span className="border rounded-md w-5 h-5 flex items-center justify-center ml-auto">
        <ChevronRight className="w-4 h-4 text-orange-500" />
      </span>
    </div>
  );
};
