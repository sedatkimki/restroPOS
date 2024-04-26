import { OrderDto } from "@/api/client";
import { OrderStatus } from "@/lib";
import { useWaiterOrderDrawer } from "@/lib/store/useWaiterOrderDrawer";
import { ChevronRight } from "lucide-react";
import moment from "moment";
import { FC } from "react";

import { OrderStatusBadge } from "./OrderStatusBadge";
import { ORDER_COLORS, ORDER_LABELS } from "./constants";

type OrderCardProps = {
  order: OrderDto;
};

export const OrderCard: FC<OrderCardProps> = ({ order }) => {
  const openDrawer = useWaiterOrderDrawer((state) => state.openDrawer);

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
            {moment(order?.orderCreationTime).format("LLL")} •{" "}
            {order?.orderProducts?.length} products •{" "}
          </span>
          {order?.totalOrderPrice} ₺
        </span>
        {/* {assigned ? (
          <Button variant={"outline"} className="text-xs h-7 w-min">
            Confirm Order
          </Button>
        ) : (
          <Button className="text-xs h-7 w-min">Serve Order</Button>
        )} */}
      </div>
      <span className="border rounded-md w-5 h-5 flex items-center justify-center ml-auto">
        <ChevronRight className="w-4 h-4 text-orange-500" />
      </span>
    </div>
  );
};
