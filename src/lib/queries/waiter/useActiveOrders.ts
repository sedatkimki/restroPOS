import { getSubdomain } from "@/lib";
import { collection, query, where } from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData } from "reactfire";

import { useUser } from "../useUser";

export function useActiveOrders() {
  const businessDomain = getSubdomain(window.location.href);

  const workspaceCollection = collection(useFirestore(), `/${businessDomain}`);
  const q = query(workspaceCollection, where("waiterDto", "==", null));
  const { status, data: orders, error } = useFirestoreCollectionData(q);
  console.log(orders, error);

  return {
    orders,
    error,
    loading: status === "loading",
  };
}

export function useAssignedOrders() {
  const businessDomain = getSubdomain(window.location.href);
  const { user } = useUser();

  const workspaceCollection = collection(useFirestore(), `/${businessDomain}`);
  const q = query(workspaceCollection, where("waiterDto", "==", user));
  const { status, data: orders, error } = useFirestoreCollectionData(q);
  console.log(orders, error);

  return {
    orders,
    error,
    loading: status === "loading",
  };
}
