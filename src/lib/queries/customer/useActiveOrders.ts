import { OrderDto } from "@/api/client";
import { UserRoles, getSubdomain, getToken } from "@/lib";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { useCallback } from "react";
import useSWRSubscription, { SWRSubscription } from "swr/subscription";

import { useCustomer } from "../useCustomer";

export function useActiveOrders() {
  const businessDomain = getSubdomain(window.location.href);
  const { customer } = useCustomer();

  const subscribeOrders: SWRSubscription<string, OrderDto[], Error> =
    useCallback((key: string, { next }) => {
      const ctrl = new AbortController();
      fetchEventSource(`${import.meta.env.VITE_APP_DEV_API_URL}${key}`, {
        headers: {
          Accept: "text/event-stream",
          Authorization: `Bearer ${getToken()}`,
        },
        signal: ctrl.signal,

        async onopen(res): Promise<void> {
          if (res.ok && res.status === 200) {
            console.log("Connection made ", res);
          } else if (
            res.status >= 400 &&
            res.status < 500 &&
            res.status !== 429
          ) {
            console.log("Client side error ", res);
          }
          return Promise.resolve();
        },
        onmessage(ev) {
          next(null, JSON.parse(ev.data) as OrderDto[]);
        },
        onclose() {
          console.log("Connection closed by the server");
        },
        onerror(err) {
          console.log("There was an error from server", err);
          next(err);
        },
      });
      return () => {
        ctrl.abort();
      };
    }, []);

  const { data: orders, error } = useSWRSubscription<OrderDto[]>(
    `/api/v1/orders/${businessDomain}/${UserRoles.CUSTOMER}/${customer?.phoneNumber}`,
    subscribeOrders,
  );

  return {
    orders,
    error,
  };
}
