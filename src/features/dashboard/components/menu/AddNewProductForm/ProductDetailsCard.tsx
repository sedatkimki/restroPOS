import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCategories } from "@/lib/queries/useCategories";
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { AddProductFormValues } from ".";

type AddNewProductFormProps = {
	form: UseFormReturn<AddProductFormValues>;
};

export const ProducDetailsCard: FC<AddNewProductFormProps> = ({ form }) => {
	const { categoriesOptions } = useCategories();
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-xl">Product Details</CardTitle>
				<CardDescription>Enter the details of your product</CardDescription>
			</CardHeader>
			<CardContent className="gap-4 flex flex-col">
				<FormField
					control={form.control}
					name="productName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Product Name</FormLabel>
							<FormControl>
								<Input placeholder="Beyti kebap" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="productDescription"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Product Description</FormLabel>
							<FormControl>
								<Textarea
									placeholder="A delicious Turkish dish made with lamb and yogurt."
									className="resize-none"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="productCategory"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Product Category</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select a category" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{categoriesOptions?.map((category) => {
										return (
											<SelectItem key={category.value} value={category.value}>
												{category.label}
											</SelectItem>
										);
									})}
								</SelectContent>
							</Select>
							<FormDescription>
								Please select a category for your product
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="productPrice"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Product Price</FormLabel>
							<FormControl>
								<Input placeholder="10.00" type="number" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</CardContent>
		</Card>
	);
};
