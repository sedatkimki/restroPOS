import { FirestoreOrderDto, getSubdomain } from "@/lib";
import { collection } from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData } from "reactfire";

export function useActiveOrders() {
  const businessDomain = getSubdomain(window.location.href);

  const workspaceCollection = collection(useFirestore(), `/${businessDomain}`);
  const {
    status,
    data: orders,
    error,
  } = useFirestoreCollectionData<FirestoreOrderDto>(workspaceCollection);

  return {
    orders,
    error,
    loading: status === "loading",
  };
}
