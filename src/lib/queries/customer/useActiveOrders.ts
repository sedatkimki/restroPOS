import { getSubdomain } from "@/lib";
import { collection, query, where } from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData } from "reactfire";

import { useCustomer } from "../useCustomer";

export function useActiveOrders() {
  const businessDomain = getSubdomain(window.location.href);
  const { customer } = useCustomer();

  const workspaceCollection = collection(useFirestore(), `/${businessDomain}`);
  const q = query(workspaceCollection, where("customerDto", "==", customer));
  const { status, data: orders, error } = useFirestoreCollectionData(q);
  console.log(orders, error);

  return {
    orders,
    error,
    loading: status === "loading",
  };
}
