import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
// import InputMask from "react-input-mask";

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
// import { RefAttributes } from "react";
// import { JSX } from "react/jsx-runtime";

const WorkspaceLoginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8).max(50),
	phoneNumber: z.string().min(5).max(15),
});

export const WorkspaceLoginForm = () => {
	const navigate = useNavigate();
	const form = useForm<z.infer<typeof WorkspaceLoginSchema>>({
		resolver: zodResolver(WorkspaceLoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = (data: z.infer<typeof WorkspaceLoginSchema>) => {
		console.log(data);
		toast.success("Form submitted successfully");
		navigate("/dashboard");
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input type="email" placeholder="example@mail.com" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input type="password" placeholder="********" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* <FormField
					control={form.control}
					name="phoneNumber"
					render={({ field }) => (
						<FormItem>
							<FormLabel>phone number</FormLabel>
							<FormControl>
								<div className="relative flex items-center max-w-2xl ">
									<InputMask mask="999-999-9999" maskChar={"_"} {...field}>
										{(
											inputProps: JSX.IntrinsicAttributes &
												InputProps &
												RefAttributes<HTMLInputElement>,
										) => (
											<Input
												placeholder="551-122-3122"
												className="pl-10"
												type="tel"
												{...inputProps}
											/>
										)}
									</InputMask>
									<div className="absolute left-2 top-1/2 h-4 flex items-center p-0 -translate-y-1/2 transform   text-sm">
										+90
									</div>
								</div>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/> */}
				<Button className="w-[100%]" type="submit">
					Login
				</Button>
			</form>
		</Form>
	);
};
