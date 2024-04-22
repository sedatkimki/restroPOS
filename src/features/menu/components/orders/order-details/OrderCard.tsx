import { OrderStatus } from "@/lib";
import { useOrderDrawer } from "@/lib/store/useOrderDrawer";
import { ChevronRight } from "lucide-react";
import { FC } from "react";

import { OrderStatusBadge } from "./OrderStatusBadge";
import { ORDER_COLORS, ORDER_LABELS } from "./constants";

type OrderCardProps = {
  status: OrderStatus;
};

export const OrderCard: FC<OrderCardProps> = ({ status }) => {
  const openDrawer = useOrderDrawer((state) => state.openDrawer);

  return (
    <div
      className="flex gap-3 py-2"
      onClick={() => {
        openDrawer(status);
      }}
    >
      <OrderStatusBadge status={status} />
      <div className="grid grid-rows-3">
        <span className={`font-semibold text-md ${ORDER_COLORS[status][1]}`}>
          {ORDER_LABELS[status]}
        </span>
        <span className="text-sm font-medium">
          1 x Ekmek arası döner, 2 x Ayran
        </span>
        <span className="text-xs font-medium">
          <span className="text-muted-foreground">
            26.11.2023 - 16:32 • 3 ürün •{" "}
          </span>
          240 ₺
        </span>
      </div>
      <span className="border rounded-md w-5 h-5 flex items-center justify-center ml-auto">
        <ChevronRight className="w-4 h-4 text-orange-500" />
      </span>
    </div>
  );
};
