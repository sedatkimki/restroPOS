import { AuthAPI } from "@/api";
import { ResponseMessage } from "@/api/client";
import { Button } from "@/components/ui/button";
import { FakeDash, Slot } from "@/components/ui/otp-components";
import { setAuthCookie } from "@/lib/utils";
import { isAxiosError } from "axios";
import { OTPInput } from "input-otp";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type Props = {
	count: number;
	resetCountdown: () => void;
	startCountdown: () => void;
	phoneNumber: string;
};

export const OTPVerification = ({
	count,
	resetCountdown,
	startCountdown,
	phoneNumber,
}: Props) => {
	const navigate = useNavigate();
	const [value, setValue] = useState("");
	const [loading, setLoading] = useState(false);
	const [sending, setSending] = useState(false);

	const reSend = () => {
		setSending(true);
		AuthAPI.sendOtp(phoneNumber)
			.then(() => {
				toast.success("we have sent a verification code to your phone number", {
					position: "top-center",
				});
				resetCountdown();
				startCountdown();
				setSending(false);
			})
			.catch(() => {
				toast.error("Failed to send verification code to your phone number", {
					position: "top-center",
				});
				setSending(false);
			});
	};

	const verify = async () => {
		setLoading(true);
		try {
			const response = await AuthAPI.loginForPhoneNumber({
				tokenCode: value,
				accountInformation: phoneNumber,
			});
			setAuthCookie(response.data.accessToken);
			window.onbeforeunload = null;

			navigate("/menu");
		} catch (error) {
			if (isAxiosError<ResponseMessage>(error)) {
				toast.error(error.response?.data.message, {
					position: "top-center",
				});
			}
		}
		setLoading(false);
	};
	return (
		<>
			<OTPInput
				maxLength={6}
				value={value}
				onChange={(value) => setValue(value)}
				containerClassName="group flex items-center has-[:disabled]:opacity-30 justify-center"
				render={({ slots }) => (
					<>
						<div className="flex">
							{slots.slice(0, 3).map((slot, idx) => (
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								<Slot key={idx} {...slot} />
							))}
						</div>

						<FakeDash />

						<div className="flex">
							{slots.slice(3).map((slot, idx) => (
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								<Slot key={idx} {...slot} />
							))}
						</div>
					</>
				)}
			/>
			<div className="flex flex-row justify-between gap-4">
				<Button
					variant={"outline"}
					className="flex-1"
					disabled={count > 0}
					onClick={reSend}
					loading={sending}
				>
					{count > 0 ? `Resend in ${count} seconds` : "Resend"}
				</Button>
				<Button className="flex-1" onClick={verify} loading={loading}>
					verify
				</Button>
			</div>
		</>
	);
};
