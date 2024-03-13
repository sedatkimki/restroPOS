import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { DataTableFacetedFilter } from "@/components/ui/data-table/data-table-faceted-filter";
import { DataTableViewOptions } from "@/components/ui/data-table/data-table-views-options";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import dummyData from "./dummyData.json";

interface ToolbarProps<TData> {
	table: Table<TData>;
}

export function Toolbar<TData>({ table }: ToolbarProps<TData>) {
	const navigate = useNavigate();
	const isFiltered = table.getState().columnFilters.length > 0;
	const uniqueCategories = [...new Set(dummyData.map((item) => item.category))];
	const categories = uniqueCategories.map((item) => {
		return {
			value: item,
			label: item,
		};
	});

	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-1 items-center space-x-2">
				<Input
					placeholder="Search products..."
					value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("name")?.setFilterValue(event.target.value)
					}
					className="h-8 w-[150px] lg:w-[250px]"
				/>
				{table.getColumn("category") && (
					<DataTableFacetedFilter
						column={table.getColumn("category")}
						title="Category"
						options={categories}
					/>
				)}
				{isFiltered && (
					<Button
						variant="ghost"
						onClick={() => table.resetColumnFilters()}
						className="h-8 px-2 lg:px-3"
					>
						Reset
						<X className="ml-2 h-4 w-4" />
					</Button>
				)}
			</div>
			<DataTableViewOptions table={table} />
			<Button
				variant="default"
				size="sm"
				className="ml-2 h-8 lg:flex"
				onClick={() => {
					navigate("/dashboard/menu/add-new-product");
				}}
			>
				Add product
			</Button>
		</div>
	);
}
