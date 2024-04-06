import { DataTable } from "@/components/ui/data-table/data-table";
import { DataTablePagination } from "@/components/ui/data-table/data-table-pagination";
import { useDataTable } from "@/lib/hooks";
import { useStaffs } from "@/lib/queries/useStaffs";
import { Toolbar } from "./Toolbar";
import { columns } from "./columns";

export function StaffTable() {
	const { staffs, isLoading } = useStaffs();

	const table = useDataTable(columns, staffs || []); // Add a default empty array if staffs is undefined

	return (
		<div className="space-y-4">
			<Toolbar table={table} />
			<DataTable table={table} isLoading={isLoading} />
			<DataTablePagination table={table} />
		</div>
	);
}
