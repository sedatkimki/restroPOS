import { OrderDto } from "@/api/client";
import { Button } from "@/components/ui/button";
import { FirestoreOrderDto, OrderStatus, getDate } from "@/lib";
import { useOrderDrawer } from "@/lib/store/useOrderDrawer";
import { useOrderReviewDrawer } from "@/lib/store/useOrderReviewDrawer";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { ChevronRight } from "lucide-react";
import { FC } from "react";

import { OrderStatusBadge } from "./OrderStatusBadge";
import { ORDER_COLORS, ORDER_LABELS } from "./constants";

type OrderCardProps = {
  order: FirestoreOrderDto | OrderDto;
};

export const OrderCard: FC<OrderCardProps> = ({ order }) => {
  const openDrawer = useOrderDrawer((state) => state.openDrawer);
  const openReviewDrawer = useOrderReviewDrawer((state) => state.openDrawer);
  return (
    <div
      className="flex gap-3 py-2"
      onClick={() => {
        openDrawer(order);
      }}
    >
      <OrderStatusBadge status={order.orderStatus as OrderStatus} />
      <div className="grid">
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
        <span className="text-xs font-medium mt-2 mb-2">
          <span className="text-muted-foreground">
            {getDate(order.orderCreationTime)} • {order?.orderProducts?.length}{" "}
            products •{" "}
          </span>
          {order?.totalOrderPrice} ₺
        </span>
        {order?.orderStatus === OrderStatus.COMPLETED &&
          !order.orderReviewStar && (
            <Button
              className="text-xs h-7 w-min"
              variant={"outline"}
              onClick={(e) => {
                e.stopPropagation();
                openReviewDrawer(order);
              }}
            >
              <StarFilledIcon className="h-3 w-3 text-orange-500 mr-2" />
              Rate Order
            </Button>
          )}
      </div>

      <span className="border rounded-md min-w-5 w-5 h-5 flex items-center justify-center ml-auto">
        <ChevronRight className="w-4 h-4 text-orange-500" />
      </span>
    </div>
  );
};
