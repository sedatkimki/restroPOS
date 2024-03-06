import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldCard } from "@/components/ui/field-card";
import { FC } from "react";
import { EmptyList } from "./EmptyList";
import { NewCategoryForm } from "./NewCategoryForm";

export const Categories: FC = () => {
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
					<CardTitle>Categories</CardTitle>
				</CardHeader>
				<CardContent>
					{/* <CategoriesList /> */}
					<EmptyList />
				</CardContent>
			</Card>
		</div>
	);
};
