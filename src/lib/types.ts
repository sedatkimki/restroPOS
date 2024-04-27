import { OrderDto } from "@/api/client";
import { Timestamp } from "firebase/firestore";

export type FunctionComponent = React.ReactElement | null;

export type NavigationLink = {
  name: string;
  path: string;
  icon?: React.ReactNode;
};

export enum UserRoles {
  ADMIN = "ADMIN",
  CASH_DESK = "CASH_DESK",
  CUSTOMER = "CUSTOMER",
  KITCHEN = "KITCHEN",
  WAITER = "WAITER",
}

export enum OrderStatus {
  RECEIVED = "RECEIVED",
  PREPARING = "PREPARING",
  SERVING = "SERVING",
  ON_TABLE = "ON_TABLE",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
}

export type FirestoreOrderDto = Omit<OrderDto, "orderCreationTime"> & {
  orderCreationTime?: Timestamp;
};
