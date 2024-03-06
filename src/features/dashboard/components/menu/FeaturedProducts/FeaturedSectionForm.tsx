import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { DialogFooter } from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import _ from "lodash";
import { Check } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";

const products = [
	{
		id: 1,
		name: "Beyti Kebap",
		image:
			"https://yemek.com/_next/image/?url=https%3A%2F%2Fcdn.yemek.com%2Fmnresize%2F1250%2F833%2Fuploads%2F2023%2F11%2Fbeyti-yemekcom.jpg&w=1920&q=75",
	},
	{
		id: 2,
		name: "Kuzu Tandır",
		image:
			"https://i.nefisyemektarifleri.com/2021/05/17/ev-usulu-kuzu-tandir.jpg",
	},
	{
		id: 3,
		name: "Döner",
		image:
			"https://i.lezzet.com.tr/images-xxlarge-recipe/tavuk-doner-d35e16f6-d541-4a18-a766-1ab3e5368e86.jpg",
	},
	{
		id: 4,
		name: "Karnıyarık",
		image: "https://i.ytimg.com/vi/FNi-IceY2GI/maxresdefault.jpg",
	},
	{
		id: 5,
		name: "Cig Kofte",
		image:
			"https://cdn.yemek.com/mnresize/940/940/uploads/2020/10/etsiz-cig-kofte-yemekcom.jpg",
	},
];

const FeaturedSectionFromSchema = z.object({
	title: z.string().min(2).max(30),
	products: z
		.array(
			z.object({
				id: z.number(),
				name: z.string(),
				image: z.string(),
			}),
		)
		.min(2, "Select at least 2 products.")
		.max(10, "Select at most 10 products."),
});

type FeaturedSectionFormProps = {
	type: "create" | "update";
};

export const FeaturedSectionFrom: React.FC<FeaturedSectionFormProps> = ({
	type,
}) => {
	const form = useForm<z.infer<typeof FeaturedSectionFromSchema>>({
		resolver: zodResolver(FeaturedSectionFromSchema),
		defaultValues: {
			title: "",
			products: [],
		},
	});

	const onSubmit = async (data: z.infer<typeof FeaturedSectionFromSchema>) => {
		if (type === "create") {
			console.log("Create", data);
		} else {
			console.log("Update", data);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Section title</FormLabel>
							<FormControl>
								<Input placeholder="Most preferred" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="products"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Products</FormLabel>
							<FormControl>
								<Command className="rounded-md border">
									<CommandInput placeholder="Search products..." />
									<CommandList>
										<CommandEmpty>No products found.</CommandEmpty>
										<CommandGroup className="p-2">
											{products.map((product) => (
												<CommandItem
													key={product.id}
													className="flex items-center px-2"
													onSelect={() => {
														const selectedProducts = field.value;
														if (_.some(selectedProducts, product)) {
															return field.onChange(
																selectedProducts.filter(
																	(p) => p.id !== product.id,
																),
															);
														}

														return field.onChange(
															selectedProducts.concat(product),
														);
													}}
												>
													<Avatar>
														<AvatarImage src={product.image} alt="Image" />
														<AvatarFallback>{product.name[0]}</AvatarFallback>
													</Avatar>
													<div className="ml-2">
														<p className="text-sm font-medium leading-none">
															{product.name}
														</p>
													</div>
													{_.some(field.value, product) ? (
														<Check className="ml-auto flex h-5 w-5 text-primary" />
													) : null}
												</CommandItem>
											))}
										</CommandGroup>
									</CommandList>
								</Command>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<DialogFooter className="flex items-center  sm:justify-between">
					{form.watch("products").length > 0 ? (
						<div className="flex -space-x-2 overflow-hidden">
							{form.watch("products").map((product) => (
								<Avatar
									key={product.id}
									className="inline-block border-2 border-background"
								>
									<AvatarImage src={product.image} />
									<AvatarFallback>{product.name[0]}</AvatarFallback>
								</Avatar>
							))}
						</div>
					) : (
						<p className="text-sm text-muted-foreground">
							Select products to feature on your new section.
						</p>
					)}
					<Button disabled={form.watch("products").length < 2} type="submit">
						Continue
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
};
