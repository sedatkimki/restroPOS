import { AspectRatio } from "@/components/ui/aspect-ratio";
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
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ImageOff } from "lucide-react";
import { FC, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { AddProductFormValues } from ".";

type ProductImageCardProps = {
	form: UseFormReturn<AddProductFormValues>;
};

export const ProductImageCard: FC<ProductImageCardProps> = ({ form }) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-xl">Product Image</CardTitle>
				<CardDescription>
					Upload a high-quality image of your product
				</CardDescription>
			</CardHeader>
			<CardContent className="gap-4 flex flex-col">
				{form.watch("productImage")?.[0] ? (
					<AspectRatio ratio={16 / 10}>
						<img
							src={URL.createObjectURL(form.watch("productImage")?.[0] || "")}
							className="rounded-md border object-contain shadow-sm w-full h-full"
							alt="Product"
						/>
					</AspectRatio>
				) : (
					<AspectRatio ratio={16 / 10}>
						<div className="flex flex-1 h-full  flex-wrap content-center justify-center rounded-md border shadow-sm">
							<ImageOff className="h-12 w-12  text-neutral-300" />
						</div>
					</AspectRatio>
				)}
				<FormField
					control={form.control}
					name="productImage"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									accept=".jpg, .jpeg, .png, .svg, .gif, .mp4"
									type="file"
									onBlur={field.onBlur}
									name={field.name}
									ref={field.ref}
									onChange={(e) => {
										field.onChange(e.target.files);
									}}
									id="productImage"
								/>
							</FormControl>
							<FormDescription>
								Max size: 5MB, Supported formats: .jpg, .jpeg, .png, .webp
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
			</CardContent>
		</Card>
	);
};
