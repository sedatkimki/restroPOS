import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

import { SystemUserDtoResponse } from "@/api/client";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { Actions } from "./Actions";
import { roles } from "./types";

export const columns: ColumnDef<SystemUserDtoResponse>[] = [
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
		accessorKey: "id",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Id" />
		),
		cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "firstName",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="First Name" />
		),
		cell: ({ row }) => (
			<div className="w-[150px]">{row.getValue("firstName")} </div>
		),
	},
	{
		accessorKey: "lastName",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Last Name" />
		),
		cell: ({ row }) => (
			<div className="w-[150px]">{row.getValue("lastName")} </div>
		),
	},
	{
		accessorKey: "email",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Email" />
		),
		cell: ({ row }) => <div className="w-[200px]">{row.getValue("email")}</div>,
	},
	{
		accessorKey: "role",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Role" />
		),
		cell: ({ row }) => {
			const role = roles.find((role) => role.value === row.getValue("role"));

			if (!role) {
				return null;
			}

			return (
				<div className="flex w-[150px] items-center">
					<Badge variant={role.badgeColor}>
						{role.icon && <role.icon className="mr-2 h-4 w-4" />}
						<span>{role.label}</span>
					</Badge>
				</div>
			);
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		id: "actions",
		// Todo : row actions
		cell: ({ row }) => <Actions email={row.getValue("email")} />,
	},
];
