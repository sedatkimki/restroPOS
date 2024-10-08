import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Drawer } from "@/components/ui/drawer";
import {
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { OrderStatus, getDate } from "@/lib";
import { useOrderDrawer } from "@/lib/store/useOrderDrawer";
import { X } from "lucide-react";
import { FC } from "react";

import { OrderStatusBadge } from "./OrderStatusBadge";
import { ORDER_COLORS, ORDER_LABELS } from "./constants";

export const OrderDrawer: FC = () => {
  const isDrawerOpen = useOrderDrawer((state) => state.isDrawerOpen);
  const onOpenChange = useOrderDrawer((state) => state.onOpenChange);
  const order = useOrderDrawer((state) => state.order);

  return (
    <Drawer open={isDrawerOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="outline-none min-h-[96%] max-h-[96%]">
        <DrawerHeader className="text-left flex justify-between items-center px-6  border-border border-b">
          <DrawerTitle className="text-lg">Order Details</DrawerTitle>
          <DrawerClose>
            <Button size={"icon"} variant={"ghost"} className="h-8 w-8">
              <X className="h-6 w-6" />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <div className=" overflow-auto">
          <div className="mx-auto w-full max-w-lg px-6 py-4 gap-4 grid">
            <Card className="p-3 flex gap-3">
              <OrderStatusBadge status={order.orderStatus as OrderStatus} />
              <div className="flex flex-col gap-1">
                <span className="font-normal text-muted-foreground text-xs leading-3">
                  Order Status
                </span>
                <span
                  className={`font-semibold text-md ${ORDER_COLORS[order.orderStatus || OrderStatus.RECEIVED][1]} leading-4`}
                >
                  {ORDER_LABELS[order.orderStatus || OrderStatus.RECEIVED]}
                </span>
              </div>
            </Card>
            <Card className="p-3 grid gap-3">
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Order Number
                  </span>
                  <span className="text-sm">#{order.id}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Order Date
                  </span>
                  <span className="text-sm">
                    {getDate(order.orderCreationTime)}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Table No
                  </span>
                  <span className="text-sm">
                    {order.workspaceTableDto?.tableName}
                  </span>
                </li>
              </ul>
            </Card>
            <Card className="p-3 grid gap-3">
              <div className="font-semibold">Order Summary</div>
              <ul className="grid gap-3">
                {order?.orderProducts?.map((product) => (
                  <li className="flex  justify-between ">
                    <div className="flex gap-2">
                      <span className="text-sm w-4">{product.quantity}x</span>
                      <div className="grid text-sm ">
                        <span>{product.product?.productName}</span>
                        {product.productSelectedModifiers?.map((modifier) =>
                          (modifier?.selections ?? []).length > 0 ? (
                            <span
                              key={modifier.id}
                              className="text-sm text-muted-foreground"
                            >
                              {modifier?.selections
                                ?.map((selection) => selection.label)
                                .join(", ")}
                            </span>
                          ) : null,
                        )}
                      </div>
                    </div>
                    <span className="text-sm">{product.calculatedPrice} ₺</span>
                  </li>
                ))}

                <Separator />
                <li className="flex items-center justify-between font-semibold">
                  <span className="text-sm text-muted-foreground">
                    Total Amount
                  </span>
                  <span className="text-sm ">{order.totalOrderPrice} ₺</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>

        <DrawerFooter className="z-50 flex flex-row justify-between px-6 border border-t-1">
          <Button className="w-full">Rate Order</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
