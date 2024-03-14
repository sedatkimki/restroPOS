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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useStaffs } from "@/lib/queries/useStaffs";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { roles } from "./StaffTable/types";

const userRoles = roles.map((role) => role.value);

const StaffAddFormSchema = z.object({
	firstName: z.string().min(2).max(50),
	lastName: z.string().min(2).max(50).optional(),
	email: z.string().email(),
	role: z.enum([userRoles[0], ...userRoles]), // Convert StaffRoles[] to string[]
	password: z.string().min(8).max(50),
});

export const StaffAddForm: React.FC<{
	setDialogOpen: (open: boolean) => void;
}> = ({ setDialogOpen }) => {
	const form = useForm<z.infer<typeof StaffAddFormSchema>>({
		resolver: zodResolver(StaffAddFormSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			role: undefined,
			password: "",
		},
	});
	const { addNewStaff } = useStaffs();

	const onSubmit = async (data: z.infer<typeof StaffAddFormSchema>) => {
		await addNewStaff({
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			role: data.role,
			password: data.password,
		});
		setDialogOpen(false);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="firstName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>First Name</FormLabel>
							<FormControl>
								<Input placeholder="Ryan" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="lastName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Last Name</FormLabel>
							<FormControl>
								<Input placeholder="Gosling" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
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
					name="role"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Role</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select a role" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{Object.values(roles).map((role) => (
										<SelectItem key={role.value} value={role.value}>
											<div className="flex items-center">
												{role.icon && <role.icon className="mr-2 h-4 w-4" />}
												{role.label}
											</div>
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Staff Password</FormLabel>
							<FormControl>
								<Input type="password" placeholder="********" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex flex-1 justify-end">
					<Button type="submit" loading={form.formState.isSubmitting}>
						Add Staff
					</Button>
				</div>
			</form>
		</Form>
	);
};
