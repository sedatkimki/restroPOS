import { useBeforeUnload } from "@/lib/hooks";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCountdown } from "usehooks-ts";

import { OTPVerification } from "../../components/customer-login";

export const OTP = () => {
  const location = useLocation() as {
    state: { phoneNumber: string };
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
    if (location.state === null || location.state?.phoneNumber === undefined) {
      navigate("/customer-login");
    }
  }, [location.state, navigate]);

  useBeforeUnload(() => {
    window.history.replaceState({}, "");
  });

  return (
    <div className="mx-auto flex h-screen w-full flex-col justify-center space-y-6 p-8 sm:w-[400px]">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          We've sent a verification code to {location.state?.phoneNumber}.
        </h1>
        <p className="text-muted-foreground text-sm ">
          Please enter the code to continue.
        </p>
      </div>
      <OTPVerification
        count={count}
        resetCountdown={resetCountdown}
        startCountdown={startCountdown}
        phoneNumber={location.state?.phoneNumber}
      />
    </div>
  );
};
