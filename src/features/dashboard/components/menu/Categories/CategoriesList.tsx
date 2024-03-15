import { CategoryDto } from "@/api/client";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useCategories } from "@/lib/queries/useCategories";
import { Trash } from "lucide-react";
import { FC } from "react";

const Row = ({ category }: { category: CategoryDto }) => {
	const { deleteCategoryByTitle } = useCategories();
	return (
		<TableRow>
			<TableCell>
				<img
					src={category.image?.link}
					className="h-16 rounded-md border object-cover shadow-sm flex-1"
					alt=""
				/>
			</TableCell>
			<TableCell>{category.categoryTitle}</TableCell>
			<TableCell className="text-right">
				<Button
					variant="destructive"
					size="icon"
					onClick={() => {
						deleteCategoryByTitle(category.categoryTitle ?? "");
					}}
				>
					<Trash className="h-4 w-4" />
				</Button>
			</TableCell>
		</TableRow>
	);
};

export const CategoriesList: FC = () => {
	const { categories } = useCategories();
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
				{categories?.map((category) => (
					<Row key={category.image?.imageName} category={category} />
				))}
			</TableBody>
		</Table>
	);
};
