import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";

const AddTableFormSchema = z.object({
	tableName: z.string().min(1).max(10),
});

export const AddTableForm = () => {
	const form = useForm<z.infer<typeof AddTableFormSchema>>({
		resolver: zodResolver(AddTableFormSchema),
		defaultValues: {
			tableName: "",
		},
	});

	const onSubmit = async (data: z.infer<typeof AddTableFormSchema>) => {
		console.log(data);
	};

	return (
		<FieldCard>
			<CardHeader>
				<CardTitle>Add table</CardTitle>
			</CardHeader>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<CardContent className="gap-4 flex ">
						<FormField
							control={form.control}
							name="tableName"
							render={({ field }) => (
								<FormItem className="w-[300px]">
									<FormLabel>Table Name</FormLabel>
									<FormControl>
										<Input placeholder="AB-1" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
					<FieldCard.Footer>
						<FieldCard.FooterDescription>
							Add table to generate qr menu
						</FieldCard.FooterDescription>
						<FieldCard.FooterAction>
							<Button
								type="submit"
								className="ml-auto"
								loading={form.formState.isSubmitting}
							>
								Add Table
							</Button>
						</FieldCard.FooterAction>
					</FieldCard.Footer>
				</form>
			</Form>
		</FieldCard>
	);
};
