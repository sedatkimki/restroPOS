import { DataTable } from "@/components/ui/data-table/data-table";
import { DataTablePagination } from "@/components/ui/data-table/data-table-pagination";
import { useDataTable } from "@/lib/hooks";
import { Toolbar } from "./Toolbar";
import { columns } from "./columns";
import { Staff } from "./types";

const dummyData: Staff[] = [
	{
		id: "23422",
		name: "John Doe",
		email: "deneme@asca.com",
		role: "waiter",
	},
	{
		id: "12354",
		name: "Alice Doe",
		email: "bsdfq@asca.com",
		role: "kitchen",
	},
	{
		id: "23534",
		name: "Bob Doe",
		email: "xzas@asca.com",
		role: "cash-register",
	},
];

export function StaffTable() {
	const table = useDataTable(columns, dummyData);

	return (
		<div className="space-y-4">
			<Toolbar table={table} />
			<DataTable table={table} />
			<DataTablePagination table={table} />
		</div>
	);
}
