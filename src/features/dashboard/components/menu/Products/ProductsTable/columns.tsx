import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { Actions } from "./Actions";
import { Product } from "./types";

export const columns: ColumnDef<Product>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
				className="translate-y-[2px]"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
				className="translate-y-[2px]"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Product Name" />
		),
		cell: ({ row }) => <div className="w-[200px]">{row.getValue("name")}</div>,
	},
	{
		accessorKey: "description",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Description" />
		),
		cell: ({ row }) => (
			<div className="w-[400px]">{row.getValue("description")}</div>
		),
	},
	{
		accessorKey: "category",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Category" />
		),
		cell: ({ row }) => {
			return (
				<div className="flex w-[150px] items-center">
					<Badge variant="orange">
						<span>{row.getValue("category")}</span>
					</Badge>
				</div>
			);
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		accessorKey: "price",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Price" />
		),
		cell: ({ row }) => <div className="w-[60px]">{row.getValue("price")}</div>,
	},
	{
		id: "actions",
		// Todo : row actions
		cell: () => <Actions />,
	},
];
