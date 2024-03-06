import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Trash } from "lucide-react";
import { FC } from "react";

export const CategoriesList: FC = () => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[300px]">Category Image</TableHead>
					<TableHead>Category Title</TableHead>
					<TableHead className="text-right">Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell>
						<img
							src="https://yemek.com/_next/image/?url=https%3A%2F%2Fcdn.yemek.com%2Fmnresize%2F1250%2F833%2Fuploads%2F2023%2F11%2Fbeyti-yemekcom.jpg&w=1920&q=75"
							className="h-16 rounded-md border object-cover shadow-sm flex-1"
							alt=""
						/>
					</TableCell>
					<TableCell>Kebablar</TableCell>
					<TableCell className="text-right">
						<Button variant="destructive" size="icon">
							<Trash className="h-4 w-4" />
						</Button>
					</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	);
};
