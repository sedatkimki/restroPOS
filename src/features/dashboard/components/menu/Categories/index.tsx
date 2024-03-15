import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldCard } from "@/components/ui/field-card";
import { useCategories } from "@/lib/queries/useCategories";
import { Loader2 } from "lucide-react";
import { FC } from "react";
import { CategoriesList } from "./CategoriesList";
import { EmptyList } from "./EmptyList";
import { NewCategoryForm } from "./NewCategoryForm";

export const Categories: FC = () => {
	const { categories, isLoading } = useCategories();

	return (
		<div className="flex flex-col gap-4">
			<FieldCard>
				<CardHeader>
					<CardTitle>Add a new category</CardTitle>
				</CardHeader>
				<NewCategoryForm />
			</FieldCard>
			<Card>
				<CardHeader>
					<CardTitle className="flex flex-row items-center gap-4">
						Categories
						{isLoading && (
							<Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
						)}
					</CardTitle>
				</CardHeader>
				<CardContent>
					{categories?.length ? <CategoriesList /> : <EmptyList />}
				</CardContent>
			</Card>
		</div>
	);
};
