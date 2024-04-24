import { OrderDto } from "@/api/client";
import { getSubdomain, getToken } from "@/lib";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import useSWRSubscription, { SWRSubscription } from "swr/subscription";

import { useUser } from "../useUser";

const subscribeOrders: SWRSubscription<string, OrderDto[], Error> = (
  key,
  { next },
) => {
  const ctrl = new AbortController();
  fetchEventSource(`https://restropos-kpc5.onrender.com${key}`, {
    headers: {
      Accept: "text/event-stream",
      Authorization: `Bearer ${getToken()}`,
    },
    signal: ctrl.signal,

    async onopen(res): Promise<void> {
      if (res.ok && res.status === 200) {
        console.log("Connection made ", res);
      } else if (res.status >= 400 && res.status < 500 && res.status !== 429) {
        console.log("Client side error ", res);
      }
      return Promise.resolve();
    },
    onmessage(ev) {
      console.log(ev.data);

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
};

export function useActiveOrders() {
  const businessDomain = getSubdomain(window.location.href);
  const { user } = useUser();
  const { data: orders, error } = useSWRSubscription<OrderDto[]>(
    `/api/v1/orders/${businessDomain}/${"WAITER"}/${user?.email}`,
    subscribeOrders,
  );

  return {
    orders,
    error,
  };
}
