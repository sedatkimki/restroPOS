import { getSubdomain, getToken } from "@/lib";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import useSWRSubscription, { SWRSubscription } from "swr/subscription";

import { useCustomer } from "../useCustomer";

const subscribeOrders: SWRSubscription<string, string, Error> = (
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
      next(null, ev.data);
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
  const { customer } = useCustomer();
  const { data: orders, error } = useSWRSubscription<string>(
    `/api/v1/orders/${businessDomain}/${"CUSTOMER"}/${customer?.phoneNumber}`,
    subscribeOrders,
  );

  return {
    orders,
    error,
  };
}
