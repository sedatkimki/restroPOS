import React from "react";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowLeft, ArrowRight, ImageOff } from "lucide-react";
import { toast } from "sonner";
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
import { isAxiosError, isDomainValid } from "@/lib/utils";
import { AuthAPI } from "@/api";
import { ResponseMessage } from "@/api/client";
import { useNavigate } from "react-router-dom";

type SignUpFormProps = {
	step: number;
	handleNextStep: () => void;
	handlePrevStep: () => void;
};

const SignUpFormSchema = z.object({
	firstName: z.string().min(2).max(30),
	lastName: z.string().min(2).max(30),
	email: z.string().email(),
	password: z.string().min(8).max(50),
	businessName: z.string().min(2).max(50),
	businessLogo: z
		.any()
		.refine((files) => {
			return files;
		}, "Business logo is required.")
		.refine((files) => {
			return files?.[0]?.size <= MAX_FILE_SIZE;
		}, "Max image size is 5MB.")
		.refine(
			(files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
			"Only .jpg, .jpeg, .png and .webp formats are supported.",
		),
	businessDomain: z.string().min(2).max(50),
});

export const SignUpForm = ({
	step,
	handleNextStep,
	handlePrevStep,
}: SignUpFormProps) => {
	const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
	const [fieldLoading, setFieldLoading] = React.useState(false);
	const form = useForm<z.infer<typeof SignUpFormSchema>>({
		resolver: zodResolver(SignUpFormSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			businessName: "",
			businessLogo: undefined,
			businessDomain: "",
		},
	});
	const navigate = useNavigate();

	const domainOnChange = async (value: string) => {
		// TODO: this is the most shitty way to do it but it works for now
		// kill me later
		setFieldLoading(true);
		await isDomainValid(value, (isValid: boolean | string) => {
			setFieldLoading(false);
			if (typeof isValid === "string") {
				form.setError("businessDomain", {
					type: "validate",
					message: isValid,
				});
				return;
			}
			if (typeof isValid === "boolean" && !isValid) {
				form.setError("businessDomain", {
					type: "validate",
					message: "This domain is already taken.",
				});
				return;
			}
			form.clearErrors("businessDomain");
			return;
		});
	};

	const onSubmit = async (data: z.infer<typeof SignUpFormSchema>) => {
		try {
			await AuthAPI.registerNewWorkspace({
				systemUser: {
					firstName: data.firstName,
					lastName: data.lastName,
					email: data.email,
					password: data.password,
				},
				workspace: {
					businessName: data.businessName,
					businessDomain: data.businessDomain,
					// businessLogo: data.businessLogo,
					// TODO : fix this
				},
			});

			navigate("/signup/verify-email", {
				state: {
					email: data.email,
					businessDomain: data.businessDomain,
				},
			});
		} catch (error) {
			if (isAxiosError<ResponseMessage>(error)) {
				toast.error(error.response?.data.message);
			}
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				{step === 1 && (
					<>
						<div className="gap-4 flex-row flex justify-between">
							<FormField
								control={form.control}
								name="firstName"
								render={({ field }) => (
									<FormItem className="flex-1">
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
									<FormItem className="flex-1">
										<FormLabel>Last Name</FormLabel>
										<FormControl>
											<Input placeholder="Gosling" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

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
							type="button"
							onClick={async () => {
								const isValid = await form.trigger([
									"firstName",
									"lastName",
									"email",
									"password",
								]);
								if (isValid) {
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
						<div className="flex gap-3">
							{selectedFile ? (
								<img
									src={URL.createObjectURL(form.watch("businessLogo")?.[0])}
									className="h-20 w-20 rounded-md border object-cover shadow-sm flex-1"
									alt=""
								/>
							) : (
								<div className="flex flex-1 min-h-20 min-w-20 flex-wrap content-center justify-center rounded-md border shadow-sm">
									<ImageOff className="h-6 w-6  text-neutral-300" />
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
						<FormField
							control={form.control}
							name="businessName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Business Name</FormLabel>
									<FormControl>
										<Input placeholder="Super restaurant" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="businessDomain"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Business Domain</FormLabel>
									<FormControl>
										<div className="relative flex max-w-2xl items-center ">
											<Input
												placeholder="idrive"
												onBlur={field.onBlur}
												name={field.name}
												ref={field.ref}
												value={field.value}
												onChange={(e) => {
													domainOnChange(e.target.value);
													field.onChange(e.target.value);
												}}
											/>

											<div className="text-muted-foreground absolute right-2 top-1/2 flex h-4 -translate-y-1/2 transform items-center  p-0 text-sm">
												.restropos.software
											</div>
										</div>
									</FormControl>
									{/* TODO: make this shit component  */}
									{fieldLoading && (
										<div className="flex text-muted-foreground text-sm items-center">
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											checking
										</div>
									)}
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="flex gap-4">
							<Button
								className="flex-1"
								variant="outline"
								onClick={handlePrevStep}
							>
								<ArrowLeft className="mr-2 h-4 w-4" />
								Prev
							</Button>
							<Button
								className="flex-1"
								type="submit"
								disabled={
									!form.formState.isDirty ||
									!form.formState.isValid ||
									fieldLoading
								}
								loading={form.formState.isSubmitting}
							>
								Submit
							</Button>
						</div>
					</>
				)}
			</form>
		</Form>
	);
};
