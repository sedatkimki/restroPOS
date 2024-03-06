import { DataTable } from "@/components/ui/data-table/data-table";
import { DataTablePagination } from "@/components/ui/data-table/data-table-pagination";
import { useDataTable } from "@/lib/hooks";
import { Toolbar } from "./Toolbar";
import { columns } from "./columns";

import data from "./dummyData.json";
import { Product } from "./types";

export function ProductsTable() {
	const table = useDataTable(columns, data as Product[]);

	return (
		<div className="space-y-4">
			<Toolbar table={table} />
			<DataTable table={table} />
			<DataTablePagination table={table} />
		</div>
	);
}
