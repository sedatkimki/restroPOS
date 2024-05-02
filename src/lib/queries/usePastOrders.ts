import { OrdersAPI } from "@/api";
import { OrderDto } from "@/api/client";
import useSWR from "swr";

import { useUser } from "./useUser";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ordersFetcher = async (): Promise<OrderDto[]> => {
  const response = await OrdersAPI.getBusinessOrders();
  return response.data;
};

export function usePastOrders() {
  const { user } = useUser();
  const {
    data: orders,
    error,
    isLoading,
  } = useSWR<OrderDto[]>(user ? "admin-past-orders" : null, ordersFetcher, {
    revalidateOnReconnect: false,
  });

  return {
    orders,
    isLoading,
    error,
  };
}
