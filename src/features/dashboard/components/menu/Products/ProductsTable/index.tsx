import { DataTable } from "@/components/ui/data-table/data-table";
import { DataTablePagination } from "@/components/ui/data-table/data-table-pagination";
import { useDataTable } from "@/lib/hooks";
import { useProducts } from "@/lib/queries/useProducts";

import { Toolbar } from "./Toolbar";
import { columns } from "./columns";

export function ProductsTable() {
  const { products, isLoading } = useProducts();
  const table = useDataTable(columns, products || []);

  return (
    <div className="space-y-4">
      <Toolbar table={table} />
      <DataTable table={table} isLoading={isLoading} />
      <DataTablePagination table={table} />
    </div>
  );
}
