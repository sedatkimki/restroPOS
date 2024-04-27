import { OrderStatus, getSubdomain } from "@/lib";
import { collection, query, where } from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData } from "reactfire";

export function useActiveOrders() {
  const businessDomain = getSubdomain(window.location.href);

  const workspaceCollection = collection(useFirestore(), `/${businessDomain}`);
  const q = query(
    workspaceCollection,
    where("orderStatus", "==", OrderStatus.PREPARING),
    where("kitchenDto", "==", null),
  );
  const { status, data: orders, error } = useFirestoreCollectionData(q);

  return {
    orders,
    error,
    loading: status === "loading",
  };
}
