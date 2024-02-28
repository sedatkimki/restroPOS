import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCountdown } from "usehooks-ts";
import { OTPVerification } from "../components/SignUp/OTPVerification";
import { useBeforeUnload } from "@/lib/hooks/useBeforeUnload";

export const VerifyEmail = () => {
	const location = useLocation() as {
		state: { email: string; businessDomain: string };
	};
	const navigate = useNavigate();
	const [count, { startCountdown, resetCountdown }] = useCountdown({
		countStart: 120,
		intervalMs: 1000,
	});

	useEffect(() => {
		startCountdown();
	}, [startCountdown]);

	useEffect(() => {
		if (
			location.state === null ||
			location.state?.email === undefined ||
			location.state?.businessDomain === undefined
		) {
			navigate("/signup");
		}
	}, [location.state, navigate]);

	useBeforeUnload(() => {
		window.history.replaceState({}, "");
	});

	return (
		<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
			<div className="flex flex-col space-y-2 ">
				<h1 className="text-2xl font-semibold tracking-tight text-center">
					Check your email
				</h1>
				<p className="text-sm text-muted-foreground text-center">
					We've sent a verification code to {location.state?.email}. Please
					enter
				</p>
			</div>
			<OTPVerification
				count={count}
				resetCountdown={resetCountdown}
				startCountdown={startCountdown}
				email={location.state?.email}
				businessDomain={location.state?.businessDomain}
			/>
		</div>
	);
};
