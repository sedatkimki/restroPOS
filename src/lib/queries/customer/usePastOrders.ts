import { OrdersAPI } from "@/api";
import { OrderDto } from "@/api/client";
import { getSubdomain } from "@/lib";
import useSWR from "swr";

import { useCustomer } from "../useCustomer";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ordersFetcher = async ({
  customerInfo,
}: {
  customerInfo: string;
}): Promise<OrderDto[]> => {
  const businessDomain = getSubdomain(window.location.href);
  const response = await OrdersAPI.getCustomerOrders(
    customerInfo,
    businessDomain,
  );
  return response.data;
};

export function usePastOrders() {
  const { customer } = useCustomer();
  const {
    data: orders,
    error,
    isLoading,
  } = useSWR<OrderDto[]>(
    customer
      ? { url: "past-orders", customerInfo: customer.phoneNumber }
      : null,
    ordersFetcher,
    {
      revalidateOnReconnect: false,
    },
  );

  return {
    orders,
    isLoading,
    error,
  };
}
