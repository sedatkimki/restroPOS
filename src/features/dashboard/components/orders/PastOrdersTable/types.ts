import { ORDER_LABELS } from "@/features/waiter/components/order-details/constants";
import { OrderStatus } from "@/lib";

export type orderStatusType = {
  value: string;
  label: string;
};
export const orderStatuses: orderStatusType[] = [
  {
    value: OrderStatus.RECEIVED,
    label: ORDER_LABELS.RECEIVED,
  },
  {
    value: OrderStatus.PREPARING,
    label: ORDER_LABELS.PREPARING,
  },
  {
    value: OrderStatus.SERVING,
    label: ORDER_LABELS.SERVING,
  },
  {
    value: OrderStatus.ON_TABLE,
    label: ORDER_LABELS.ON_TABLE,
  },
  {
    value: OrderStatus.COMPLETED,
    label: ORDER_LABELS.COMPLETED,
  },
  {
    value: OrderStatus.CANCELED,
    label: ORDER_LABELS.CANCELED,
  },
] as const;
