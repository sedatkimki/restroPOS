import { FirestoreOrderDto, Table, getSubdomain } from "@/lib";
import { collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useFirestore, useFirestoreCollectionData } from "reactfire";

import { useTables } from "../useTables";

export function useGetAllTablesWithOrders() {
  const businessDomain = getSubdomain(window.location.href);
  const [tablesWithOrders, setTablesWithOrders] = useState<Table[]>([]);
  const { tables, isLoading } = useTables();
  const workspaceCollection = collection(useFirestore(), `/${businessDomain}`);
  const {
    status,
    data: orders,
    error,
  } = useFirestoreCollectionData<FirestoreOrderDto>(workspaceCollection);

  useEffect(() => {
    if (tables && orders) {
      const filteredTables = tables.map((table) => {
        const tableOrders = orders.filter(
          (order) => order.workspaceTableDto?.tableId === table.tableId,
        );
        return {
          workspaceTable: table,
          orders: tableOrders || [],
        };
      });
      setTablesWithOrders(filteredTables);
    }
  }, [tables, orders]);

  return {
    tablesWithOrders,
    error,
    loading: status === "loading" || isLoading,
  };
}
