import { OrderDto } from "@/api/client";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import {
  ORDER_COLORS,
  ORDER_LABELS,
} from "@/features/waiter/components/order-details";
import { OrderStatus, getDate } from "@/lib";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<OrderDto>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order Id" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "customerName",
    accessorFn: (row) =>
      row.customerDto?.firstName + " " + row.customerDto?.lastName,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer Name" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px]">{row.getValue("customerName")} </div>
    ),
  },
  {
    accessorKey: "tableName",
    accessorFn: (row) => row.workspaceTableDto?.tableName,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Table Name" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px]">{row.getValue("tableName")} </div>
    ),
  },
  {
    accessorKey: "orderStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order Status" />
    ),
    cell: ({ row }) => {
      const orderStatus = row.getValue("orderStatus") as OrderStatus;

      if (!orderStatus) {
        return null;
      }

      return (
        <div className="flex w-[150px] items-center ">
          <Badge
            variant={"outline"}
            className={` border-transparent font-medium ${ORDER_COLORS[orderStatus || OrderStatus.RECEIVED]?.[1]} ${ORDER_COLORS[orderStatus || OrderStatus.RECEIVED]?.[0]}`}
          >
            {ORDER_LABELS[orderStatus || OrderStatus.RECEIVED]}
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "orderDate",
    accessorFn: (row) => getDate(row.orderCreationTime),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order Date" />
    ),
    cell: ({ row }) => (
      <div className="w-[200px]">{row.getValue("orderDate")}</div>
    ),
  },
  {
    accessorKey: "totalOrderPrice",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Price" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px]">{row.getValue("totalOrderPrice")} ₺</div>
    ),
  },
];
