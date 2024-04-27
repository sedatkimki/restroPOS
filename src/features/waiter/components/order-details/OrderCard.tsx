import { OrdersAPI } from "@/api";
import { ResponseMessage } from "@/api/client";
import { useConfirmDialog } from "@/components/dialogs/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { FirestoreOrderDto, OrderStatus, isAxiosError } from "@/lib";
import { useWaiterOrderDrawer } from "@/lib/store/useWaiterOrderDrawer";
import { ChevronRight } from "lucide-react";
import moment from "moment";
import { FC, useState } from "react";
import { toast } from "sonner";

import { OrderStatusBadge } from "./OrderStatusBadge";
import { ORDER_COLORS, ORDER_LABELS } from "./constants";

type OrderCardProps = {
  order: FirestoreOrderDto;
  assigned: boolean;
};

export const OrderCard: FC<OrderCardProps> = ({ order, assigned }) => {
  const openDrawer = useWaiterOrderDrawer((state) => state.openDrawer);
  const openDialog = useConfirmDialog((state) => state.openDialog);

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [serveLoading, setServeLoading] = useState(false);

  const handleConfirm = async () => {
    setConfirmLoading(true);
    try {
      await OrdersAPI.waiterTakeOrder(order.id as string);
      toast.success("Order successfully taken!", {
        position: "top-center",
      });
    } catch (error) {
      if (isAxiosError<ResponseMessage>(error)) {
        toast.error(error.response?.data.message, {
          position: "top-center",
        });
      }
    }
    setConfirmLoading(false);
  };
  const handleServe = async () => {
    setServeLoading(true);
    try {
      await OrdersAPI.waiterServeOrder(order.id as string);
      toast.success("Order successfully served", {
        position: "top-center",
      });
    } catch (error) {
      if (isAxiosError<ResponseMessage>(error)) {
        toast.error(error.response?.data.message, {
          position: "top-center",
        });
      }
    }
    setServeLoading(false);
  };

  return (
    <div
      className="flex gap-3 py-2"
      onClick={() => {
        openDrawer(order, assigned);
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
          #{order.id} •{" "}
          {order.customerDto?.firstName + " " + order.customerDto?.lastName}
        </span>
        <span className="text-xs font-medium">
          <span className="text-muted-foreground">
            {moment(order.orderCreationTime?.toDate()).format("LLL")} •{" "}
            {order?.orderProducts?.length} products •{" "}
          </span>
          {order?.totalOrderPrice} ₺
        </span>
        {assigned && order.orderStatus === OrderStatus.SERVING ? (
          <Button
            className="text-xs h-7 w-min"
            loading={serveLoading}
            onClick={(e) => {
              e.stopPropagation();

              openDialog(
                "Confirm Serve",
                "Are you sure you want to serve this order?",
                handleServe,
              );
            }}
          >
            Serve Order
          </Button>
        ) : null}
        {!assigned && (
          <Button
            className="text-xs h-7 w-min"
            onClick={(e) => {
              e.stopPropagation();
              openDialog(
                "Confirm Order",
                "Are you sure you want to confirm this order",
                handleConfirm,
              );
            }}
            loading={confirmLoading}
          >
            Confirm Order
          </Button>
        )}
      </div>
      <span className="border rounded-md w-5 h-5 flex items-center justify-center ml-auto">
        <ChevronRight className="w-4 h-4 text-orange-500" />
      </span>
    </div>
  );
};
