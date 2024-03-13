import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Trash, X } from "lucide-react";
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { AddProductFormValues } from ".";

type ProductModifiersProps = {
	form: UseFormReturn<AddProductFormValues>;
};

export const ProductModifiersCard: FC<ProductModifiersProps> = ({ form }) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-xl">Product Modifiers</CardTitle>
				<CardDescription>
					Modifiers are additional options that customers can choose when
					ordering a product
				</CardDescription>
			</CardHeader>
			<CardContent className="gap-4 flex flex-col">
				{form.watch("productModifiers")?.map((modifier, index) => {
					return (
						<Card className="p-4">
							<div className="flex gap-4">
								<FormField
									control={form.control}
									// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
									key={index}
									name={`productModifiers.${index}.name`}
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormControl>
												<Input placeholder="Extra cheese" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`productModifiers.${index}.type`}
									render={({ field }) => (
										<FormItem className=" w-[150px]">
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
												value={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select a type" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="single">
														<div className="items-center flex">
															<RadioGroup defaultValue="a">
																<RadioGroupItem
																	value="a"
																	disabled
																	className="border border-muted-foreground mr-2 text-muted-foreground"
																/>
															</RadioGroup>
															Single
														</div>
													</SelectItem>
													<SelectItem value="multiple">
														<div className="items-center flex">
															<Checkbox
																disabled
																checked
																className="border border-muted-foreground mr-2 !bg-muted-foreground"
															/>
															Multiple
														</div>
													</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							{modifier.options.length > 0 && (
								<div className="mt-4 gap-4 flex  flex-col">
									{modifier.options.map((_, optionIndex) => (
										<div className="flex gap-4">
											<FormField
												control={form.control}
												// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
												key={optionIndex}
												name={`productModifiers.${index}.options.${optionIndex}.name`}
												render={({ field }) => (
													<FormItem className="flex flex-row items-center gap-4 flex-1">
														{modifier.type === "single" ? (
															<RadioGroup>
																<RadioGroupItem
																	value="a"
																	disabled
																	className="border border-muted-foreground text-muted-foreground"
																/>
															</RadioGroup>
														) : (
															<Checkbox
																disabled
																className="border border-muted-foreground "
															/>
														)}
														<FormControl>
															<Input
																placeholder="Extra cheese"
																className="!mt-0"
																{...field}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name={`productModifiers.${index}.options.${optionIndex}.price`}
												render={({ field }) => (
													<FormItem className="w-[100px]">
														<FormControl>
															<Input
																placeholder="Price"
																type="number"
																className="!mt-0"
																{...field}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<Button
												variant={"ghost"}
												size={"icon"}
												type="button"
												onClick={() => {
													form.setValue(`productModifiers.${index}.options`, [
														...form
															.getValues(`productModifiers.${index}.options`)
															.filter((_, i) => i !== optionIndex),
													]);
												}}
											>
												<X className="h-5 w-5" />
											</Button>
										</div>
									))}
								</div>
							)}
							<div className="flex flex-row items-center mt-4">
								{modifier.type === "single" ? (
									<RadioGroup>
										<RadioGroupItem
											value="a"
											disabled
											className="border border-muted-foreground mr-4 text-muted-foreground"
										/>
									</RadioGroup>
								) : (
									<Checkbox
										disabled
										className="border border-muted-foreground mr-4"
									/>
								)}

								<Button
									variant={"ghost"}
									size={"sm"}
									type="button"
									onClick={() => {
										form.setValue(`productModifiers.${index}.options`, [
											...(form.getValues(`productModifiers.${index}.options`) ||
												[]),
											{
												name: "",
												price: 0,
											},
										]);
									}}
								>
									Add Option
								</Button>
							</div>
							<Separator className="my-4" />
							<div className="flex justify-end gap-4">
								<FormField
									control={form.control}
									name={`productModifiers.${index}.required`}
									render={({ field }) => (
										<FormItem className="items-center flex gap-2">
											<FormLabel>Required</FormLabel>
											<FormControl>
												<Switch
													className="!mt-0"
													checked={field.value}
													onCheckedChange={field.onChange}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<Button
									variant={"ghost"}
									type="button"
									onClick={() => {
										form.setValue("productModifiers", [
											...(form.getValues("productModifiers") ?? []).filter(
												(_, i) => i !== index,
											),
										]);
									}}
								>
									<Trash className="h-5 w-5 text-red-500" />
								</Button>
							</div>
						</Card>
					);
				})}
				<Button
					variant={"ghost"}
					size={"sm"}
					className="border border-dashed"
					type="button"
					onClick={() => {
						form.setValue("productModifiers", [
							...(form.getValues("productModifiers") || []),
							{
								name: "",
								type: "single",
								options: [],
								required: false,
							},
						]);
					}}
				>
					Add Modifier
				</Button>
			</CardContent>
		</Card>
	);
};
