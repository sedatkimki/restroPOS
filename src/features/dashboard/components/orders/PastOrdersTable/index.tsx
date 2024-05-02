import { DataTable } from "@/components/ui/data-table/data-table";
import { DataTablePagination } from "@/components/ui/data-table/data-table-pagination";
import { useDataTable } from "@/lib/hooks";
import { usePastOrders } from "@/lib/queries/usePastOrders";

import { Toolbar } from "./Toolbar";
import { columns } from "./columns";

export function PastOrdersTable() {
  const { orders, isLoading } = usePastOrders();

  const table = useDataTable(columns, orders || []); // Add a default empty array if staffs is undefined

  return (
    <div className="space-y-4">
      <Toolbar table={table} />
      <DataTable table={table} isLoading={isLoading} />
      <DataTablePagination table={table} />
    </div>
  );
}
