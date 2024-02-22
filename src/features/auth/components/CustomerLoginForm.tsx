/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
// tslint:disable-next-line: no-submodule-imports
import InputMask from "react-input-mask";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const CustomerLoginSchema = z.object({
	phoneNumber: z.string().min(5).max(15),
});

export const CustomerLoginForm = () => {
	const navigate = useNavigate();
	const form = useForm<z.infer<typeof CustomerLoginSchema>>({
		resolver: zodResolver(CustomerLoginSchema),
		defaultValues: {
			phoneNumber: "",
		},
	});

	const onSubmit = (data: z.infer<typeof CustomerLoginSchema>) => {
		console.log(data);
		toast.success("Form submitted successfully");
		navigate("/dashboard");
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="phoneNumber"
					render={({ field }) => (
						<FormItem>
							<FormLabel>phone number</FormLabel>
							<FormControl>
								<div className="relative flex items-center max-w-2xl ">
									<InputMask mask="999-999-9999" maskChar={"_"} {...field}>
										<Input
											placeholder="551-122-3122"
											className="pl-10"
											type="tel"
										/>
									</InputMask>
									<div className="absolute left-2 top-1/2 h-4 flex items-center p-0 -translate-y-1/2 transform   text-sm">
										+90
									</div>
								</div>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<Button className="w-full" type="submit">
					Login
				</Button>
			</form>
		</Form>
	);
};
