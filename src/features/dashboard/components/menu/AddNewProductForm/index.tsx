import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ACCEPTED_IMAGE_MIME_TYPES, MAX_FILE_SIZE } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { ProducDetailsCard } from "./ProductDetailsCard";
import { ProductImageCard } from "./ProductImageCard";
import { ProductModifiersCard } from "./ProductModifiersCard";
// TODO price integer
const AddProductFormScheme = z.object({
	productName: z.string().min(2).max(50),
	productDescription: z.string().min(2).max(200),
	productCategory: z.string({
		required_error: "Please select a category",
	}),
	productPrice: z.string(),
	productModifiers: z
		.array(
			z.object({
				name: z.string().min(2).max(20),
				type: z.enum(["single", "multiple"]),
				options: z.array(
					z.object({
						name: z.string().min(2).max(20),
						price: z.string(),
					}),
				),
				required: z.boolean(),
			}),
		)
		.optional(),
	productImage: z
		.any()
		.refine((files) => {
			return files?.[0]?.size <= MAX_FILE_SIZE;
		}, "Max image size is 5MB.")
		.refine(
			(files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
			"Only .jpg, .jpeg, .png and .webp formats are supported.",
		)
		.optional(),
});

export type AddProductFormValues = z.infer<typeof AddProductFormScheme>;

export const AddNewProductForm: FC = () => {
	const navigate = useNavigate();
	const form = useForm<AddProductFormValues>({
		resolver: zodResolver(AddProductFormScheme),
		defaultValues: {},
	});

	const onSubmit = (data: AddProductFormValues) => {
		console.log(data);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className="flex flex-row gap-4 pb-16">
					<div className="flex-1 gap-4 flex flex-col">
						<ProductImageCard form={form} />
						<ProductModifiersCard form={form} />
					</div>
					<div className="flex-1">
						<ProducDetailsCard form={form} />
						<div className="flex flex-row justify-between mt-4 ">
							<Button
								variant={"outline"}
								type="submit"
								onClick={() => {
									navigate(-1);
								}}
							>
								Cancel
							</Button>
							<Button type="submit" loading={form.formState.isSubmitting}>
								Add Product
							</Button>
						</div>
					</div>
				</div>
				{/* <Button
					className="w-full"
					type="submit"
					loading={form.formState.isSubmitting}
				>
					Add Product
				</Button> */}
			</form>
		</Form>
	);
};
