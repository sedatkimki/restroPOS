import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowLeft, ArrowRight, ImageOff } from "lucide-react";

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

import { ACCEPTED_IMAGE_MIME_TYPES, MAX_FILE_SIZE } from "@/lib/constants";

type SignUpFormProps = {
	step: number;
	handleNextStep: () => void;
	handlePrevStep: () => void;
};

const SignUpFormSchema = z.object({
	name: z.string().min(2).max(50),
	email: z.string().email(),
	password: z.string().min(8).max(50),
	businessName: z.string().min(2).max(50),
	businessLogo: z
		.any()
		.refine((files) => {
			return files?.[0]?.size <= MAX_FILE_SIZE;
		}, "Max image size is 5MB.")
		.refine(
			(files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
			"Only .jpg, .jpeg, .png and .webp formats are supported.",
		),
	workspaceName: z.string().min(2).max(50),
});

export const SignUpForm = ({
	step,
	handleNextStep,
	handlePrevStep,
}: SignUpFormProps) => {
	const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
	const form = useForm<z.infer<typeof SignUpFormSchema>>({
		resolver: zodResolver(SignUpFormSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			businessName: "",
			businessLogo: undefined,
			workspaceName: "",
		},
	});

	const onSubmit = (data: z.infer<typeof SignUpFormSchema>) => {
		console.log(URL.createObjectURL(data.businessLogo));

		console.log(data);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				{step === 1 && (
					<>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Your name</FormLabel>
									<FormControl>
										<Input placeholder="Ryan Gosling" {...field} />
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
										<Input
											type="email"
											placeholder="example@mail.com"
											{...field}
										/>
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
						<Button
							className="w-[100%]"
							onClick={async () => {
								const isValid = await form.trigger([
									"name",
									"email",
									"password",
								]);
								if (isValid) {
									form.clearErrors();
									handleNextStep();
								}
							}}
						>
							Continue
							<ArrowRight className="ml-2 h-4 w-4" />
						</Button>
					</>
				)}
				{step === 2 && (
					<>
						<FormField
							control={form.control}
							name="businessName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Business name</FormLabel>
									<FormControl>
										<Input placeholder="Super restaurant" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="workspaceName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Workspace name</FormLabel>
									<FormControl>
										<Input placeholder="Super restaurant" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="flex gap-3">
							{selectedFile ? (
								<img
									src={URL.createObjectURL(form.watch("businessLogo")?.[0])}
									className="w-20 h-20 object-cover rounded-md border shadow-sm"
									alt=""
								/>
							) : (
								<div className="flex justify-center content-center flex-wrap min-w-20 min-h-20 rounded-md border shadow-sm">
									<ImageOff className="w-6 h-6 flex-1   text-neutral-300" />
								</div>
							)}
							<FormField
								control={form.control}
								name="businessLogo"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Business Logo</FormLabel>
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
												id="businessLogo"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="flex gap-4">
							<Button
								className="flex-1"
								variant="outline"
								onClick={handlePrevStep}
							>
								<ArrowLeft className="mr-2 h-4 w-4" />
								Prev
							</Button>
							<Button className="flex-1" type="submit">
								Submit
							</Button>
						</div>
					</>
				)}
			</form>
		</Form>
	);
};
