import { OrderStatus } from "@/lib";
import {
  Check,
  Clock,
  ConciergeBell,
  HandPlatter,
  PackageCheck,
  X,
} from "lucide-react";
import { ReactElement } from "react";

export const ORDER_COLORS: Record<OrderStatus, string[]> = {
  RECEIVED: ["bg-sky-100", "text-sky-500"],
  PREPARING: ["bg-yellow-100", "text-yellow-500"],
  SERVING: ["bg-cyan-100", "text-cyan-500"],
  ON_TABLE: ["bg-orange-100", "text-orange-500"],
  COMPLETED: ["bg-green-100", "text-green-500"],
  CANCELED: ["bg-red-100", "text-red-500"],
};

export const ORDER_ICONS: Record<OrderStatus, ReactElement> = {
  RECEIVED: <PackageCheck className={`w-4 h-4 ${ORDER_COLORS.RECEIVED[1]}`} />,
  PREPARING: <Clock className={`w-4 h-4 ${ORDER_COLORS.PREPARING[1]}`} />,
  SERVING: <ConciergeBell className={`w-4 h-4 ${ORDER_COLORS.SERVING[1]}`} />,
  ON_TABLE: <HandPlatter className={`w-4 h-4 ${ORDER_COLORS.ON_TABLE[1]}`} />,
  COMPLETED: <Check className={`w-4 h-4 ${ORDER_COLORS.COMPLETED[1]}`} />,
  CANCELED: <X className={`w-4 h-4 ${ORDER_COLORS.CANCELED[1]}`} />,
};

export const ORDER_LABELS: Record<OrderStatus, string> = {
  RECEIVED: "Order received",
  PREPARING: "Preparing",
  SERVING: "Being served",
  ON_TABLE: "On table",
  COMPLETED: "Completed",
  CANCELED: "Canceled",
};
