import { OrdersAPI } from "@/api";
import { ResponseMessage } from "@/api/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FirestoreOrderDto, isAxiosError } from "@/lib";
import moment from "moment";
import { FC, useState } from "react";
import { toast } from "sonner";

type OrderCardProps = {
  order: FirestoreOrderDto;
};

export const OrderCard: FC<OrderCardProps> = ({ order }) => {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [loadingCancel, setLoadingCancel] = useState(false);

  const handleComplete = async () => {
    setLoadingComplete(true);
    try {
      await OrdersAPI.kitchenTakeOrder(order.id as string);
      toast.success("Order processed successfully!", {
        position: "top-center",
      });
    } catch (error) {
      if (isAxiosError<ResponseMessage>(error)) {
        toast.error(error.response?.data.message, {
          position: "top-center",
        });
      }
    }
    setLoadingComplete(false);
  };

  const handleCancel = async () => {
    setLoadingCancel(true);
    try {
      await OrdersAPI.kitchenCancelOrder(order.id as string);
      toast.success("Order canceled successfully!", {
        position: "top-center",
      });
    } catch (error) {
      if (isAxiosError<ResponseMessage>(error)) {
        toast.error(error.response?.data.message, {
          position: "top-center",
        });
      }
    }
    setLoadingCancel(false);
  };
  return (
    <Card className="overflow-hidden mb-4">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="flex justify-between w-full">
          <CardTitle className="flex items-center gap-2 text-lg ">
            #{order.id}
          </CardTitle>
          <CardDescription className="flex gap-1 items-center p-0">
            <span>{moment(order.orderCreationTime?.toDate()).fromNow()}</span>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <ul className="grid gap-3">
            {order.orderProducts?.map((product) => (
              <li key={product.product?.productName} className="flex gap-2">
                <span className="font-semibold">{product.quantity}x</span>
                <div className="grid gap-1">
                  <span className="font-semibold">
                    {product.product?.productName}
                  </span>
                  {product.productSelectedModifiers?.map((modifier) =>
                    (modifier?.selections ?? []).length > 0 ? (
                      <span key={modifier.id} className="text-muted-foreground">
                        {modifier?.selections
                          ?.map((selection) => selection.label)
                          .join(", ")}
                      </span>
                    ) : null,
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Order Detail</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Customer</dt>
              <dd>
                {order.customerDto?.firstName +
                  " " +
                  order.customerDto?.lastName}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Waiter</dt>
              <dd>
                {order.waiterDto?.firstName + " " + order.waiterDto?.lastName}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Table No</dt>
              <dd>{order.workspaceTableDto?.tableName}</dd>
            </div>
          </dl>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3 gap-4">
        <Button
          variant="destructive"
          className="w-full"
          onClick={() => {
            handleCancel();
          }}
          loading={loadingCancel}
        >
          Cancel Order
        </Button>
        <Button
          className="w-full"
          onClick={() => {
            handleComplete();
          }}
          loading={loadingComplete}
        >
          Mark as Completed
        </Button>
      </CardFooter>
    </Card>
  );
};
