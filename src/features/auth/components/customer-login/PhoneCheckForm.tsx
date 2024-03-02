import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// tslint:disable-next-line: no-submodule-imports
import InputMask from "react-input-mask";
import { toast } from "sonner";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";

import { AuthAPI } from "@/api";
import { ResponseMessage } from "@/api/client";
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
import { PHONE_REGEX } from "@/lib/constants";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const PhoneCheckFormSchema = z.object({
	phoneNumber: z.string().regex(PHONE_REGEX, "Invalid phone number"),
});

export const PhoneCheckForm = () => {
	const form = useForm<z.infer<typeof PhoneCheckFormSchema>>({
		resolver: zodResolver(PhoneCheckFormSchema),
		defaultValues: {
			phoneNumber: "",
		},
	});
	const navigate = useNavigate();

	const onSubmit = async (data: z.infer<typeof PhoneCheckFormSchema>) => {
		data.phoneNumber = data.phoneNumber.replace(/[+\s-]/g, "");
		try {
			const { data: isValid } = await AuthAPI.customerValid(data.phoneNumber);
			if (isValid) {
				// navigate customer register
				navigate("/customer-login/register", {
					state: { phoneNumber: data.phoneNumber },
				});
			} else {
				await AuthAPI.sendOtp(data.phoneNumber);
				// send otp
				toast.success("OTP sent to your phone number", {
					position: "top-center",
				});

				navigate("/customer-login/otp", {
					state: { phoneNumber: data.phoneNumber },
				});
			}
		} catch (error) {
			if (isAxiosError<ResponseMessage>(error)) {
				toast.error(error.response?.data.message, {
					position: "top-center",
				});
			}
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="phoneNumber"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Phone Number</FormLabel>
							<FormControl>
								<div className="relative flex max-w-2xl items-center ">
									<InputMask
										// eslint-disable-next-line no-nonoctal-decimal-escape
										mask="+\9\0 999-999-9999"
										maskChar={"_"}
										onChange={field.onChange}
										value={field.value}
										onBlur={field.onBlur}
									>
										<Input
											placeholder="+90 551-122-3122"
											type="tel"
											{...field}
										/>
									</InputMask>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					className="w-full"
					type="submit"
					loading={form.formState.isSubmitting}
				>
					Continue
				</Button>
			</form>
		</Form>
	);
};
