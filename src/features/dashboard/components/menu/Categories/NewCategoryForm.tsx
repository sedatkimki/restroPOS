import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { FieldCard } from "@/components/ui/field-card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ACCEPTED_IMAGE_MIME_TYPES, MAX_FILE_SIZE } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";

const NewCategoryFormSchema = z.object({
	categoryTitle: z.string().min(2).max(30),
	categoryImage: z
		.any()
		.refine((files) => {
			return files?.[0]?.size <= MAX_FILE_SIZE;
		}, "Max image size is 5MB.")
		.refine(
			(files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
			"Only .jpg, .jpeg, .png and .webp formats are supported.",
		),
});

export const NewCategoryForm = () => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const form = useForm<z.infer<typeof NewCategoryFormSchema>>({
		resolver: zodResolver(NewCategoryFormSchema),
		defaultValues: {
			categoryTitle: "",
			categoryImage: undefined,
		},
	});

	const onSubmit = async (data: z.infer<typeof NewCategoryFormSchema>) => {
		console.log(data);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<CardContent className="gap-4 flex ">
					<FormField
						control={form.control}
						name="categoryImage"
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormLabel>Category Image</FormLabel>
								<FormControl>
									<Input
										accept=".jpg, .jpeg, .png, .svg, .gif, .mp4"
										type="file"
										onBlur={field.onBlur}
										name={field.name}
										ref={field.ref}
										onChange={(e) => {
											setSelectedFile(e.target.files?.[0] || null);
											field.onChange(e.target.files);
										}}
										id="categoryImage"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="categoryTitle"
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormLabel>Category Title</FormLabel>
								<FormControl>
									<Input placeholder="Ryan" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</CardContent>
				<FieldCard.Footer>
					<FieldCard.FooterDescription>
						Categories help you organize your menu items
					</FieldCard.FooterDescription>
					<FieldCard.FooterAction>
						<Button
							type="submit"
							className="ml-auto"
							loading={form.formState.isSubmitting}
						>
							Add Category
						</Button>
					</FieldCard.FooterAction>
				</FieldCard.Footer>
			</form>
		</Form>
	);
};
