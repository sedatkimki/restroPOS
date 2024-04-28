import { OrdersAPI } from "@/api";
import { ResponseMessage } from "@/api/client";
import { useConfirmDialog } from "@/components/dialogs/ConfirmDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ORDER_COLORS,
  ORDER_LABELS,
} from "@/features/waiter/components/order-details";
import { OrderStatus, Table, isAxiosError } from "@/lib";
import { useTables } from "@/lib/store/useTables";
import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const TableDetails = ({ table }: { table: Table }) => {
  const setSelected = useTables((state) => state.setSelected);
  const openDialog = useConfirmDialog((state) => state.openDialog);

  const [paySingle, setPaySingeLoading] = useState("");
  const [payAll, setPayAllLoading] = useState(false);

  const handlePay = async (orderId: string) => {
    setPaySingeLoading(orderId);
    try {
      await OrdersAPI.cashDeskPayById(orderId);
      toast.success("Order successfully paid!", {
        position: "top-center",
      });
    } catch (error) {
      if (isAxiosError<ResponseMessage>(error)) {
        toast.error(error.response?.data.message, {
          position: "top-center",
        });
      }
    }
    setPaySingeLoading("");
  };

  const handlePayAll = async (orderIds: string[]) => {
    setPayAllLoading(true);
    try {
      await OrdersAPI.cashDeskPayAll(orderIds);
      toast.success("Orders successfully paid!", {
        position: "top-center",
      });
    } catch (error) {
      if (isAxiosError<ResponseMessage>(error)) {
        toast.error(error.response?.data.message, {
          position: "top-center",
        });
      }
    }
    setPayAllLoading(false);
  };

  return (
    <div className="border-l border-r flex-1 width-[500px] max-w-[500px] ml-4 h-[calc(100vh-93px)] sticky top-0 overflow-auto ">
      <div className="relative h-full flex flex-col">
        <div className="flex items-center gap-2 p-4 sticky top-0 bg-white border-b z-10">
          <div className="font-semibold text-xl">
            Table {table.workspaceTable.tableName}
          </div>
          <span className="flex h-2 w-2 rounded-full bg-green-500" />
          <div className="ml-auto">
            <Button
              size={"icon"}
              variant={"ghost"}
              onClick={() => {
                setSelected("");
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="p-4 bg-muted flex-1">
          <div className="overflow-auto grid gap-4">
            {table.orders.map((order) => (
              <Card key={order.id} className="p-3 grid gap-3 ">
                <div className="font-semibold flex">
                  Order #{order.id}{" "}
                  <Badge
                    variant={"outline"}
                    className={`ml-auto border-transparent font-medium ${ORDER_COLORS[order.orderStatus || OrderStatus.RECEIVED]?.[1]} ${ORDER_COLORS[order.orderStatus || OrderStatus.RECEIVED]?.[0]}`}
                  >
                    {ORDER_LABELS[order.orderStatus || OrderStatus.RECEIVED]}
                  </Badge>
                </div>
                <div className="text-sm">
                  <span>Customer:</span>
                  <span className="ml-2 font-semibold">
                    {order.customerDto?.firstName +
                      " " +
                      order.customerDto?.lastName}
                  </span>
                </div>
                <Separator />
                <ul className="grid gap-3">
                  {order.orderProducts?.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm text-muted-foreground">
                        {item.quantity}x {item.product?.productName}
                      </span>
                      <span className="text-sm">{item.calculatedPrice} ₺</span>
                    </li>
                  ))}
                </ul>
                <Separator />
                <div className="flex items-center justify-between font-semibold">
                  <span className="text-sm text-muted-foreground">
                    Total Amount:
                  </span>
                  <span className="text-sm">{order.totalOrderPrice} ₺</span>
                </div>
                <Button
                  disabled={order.orderStatus != OrderStatus.ON_TABLE}
                  loading={paySingle === order.id}
                  onClick={() => {
                    openDialog(
                      "Confirm Payment",
                      "Are you sure you want to mark this order as paid?",
                      () => {
                        handlePay(order.id ?? "");
                      },
                    );
                  }}
                >
                  {order.orderStatus !== OrderStatus.ON_TABLE
                    ? "You can't checkout yet!"
                    : "Marked as Paid"}
                </Button>
              </Card>
            ))}
          </div>
        </div>

        <div className="sticky bottom-0 bg-white p-4 border-t left-0 right-0 grid gap-4">
          <div className="flex text-lg items-center justify-between font-semibold">
            <span>Total Amount(On Table):</span>
            <span>
              {table.orders.reduce(
                (acc, order) =>
                  order.orderStatus === OrderStatus.ON_TABLE
                    ? acc + (order.totalOrderPrice ?? 0)
                    : acc,
                0,
              )}{" "}
              ₺
            </span>
          </div>
          <Button
            size={"lg"}
            className="w-full"
            loading={payAll}
            disabled={
              table.orders.filter(
                (order) => order.orderStatus === OrderStatus.ON_TABLE,
              ).length === 0
            }
            onClick={() => {
              openDialog(
                "Confirm Payment",
                "Are you sure you want to mark all orders as paid?",
                () => {
                  handlePayAll(
                    table.orders
                      .filter(
                        (order) => order.orderStatus === OrderStatus.ON_TABLE,
                      )
                      .map((order) => order.id ?? ""),
                  );
                },
              );
            }}
          >
            {table.orders.filter(
              (order) => order.orderStatus === OrderStatus.ON_TABLE,
            ).length === 0
              ? "No orders to checkout"
              : "Mark All as Paid"}
          </Button>
        </div>
      </div>
    </div>
  );
};
