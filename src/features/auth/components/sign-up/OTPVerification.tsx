import { AuthAPI } from "@/api";
import { ResponseMessage } from "@/api/client";
import { Button } from "@/components/ui/button";
import { FakeDash, Slot } from "@/components/ui/otp-components";
import { redirectToWorkspace } from "@/lib/utils";
import { isAxiosError } from "axios";
import { OTPInput } from "input-otp";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  count: number;
  resetCountdown: () => void;
  startCountdown: () => void;
  email: string;
  businessDomain: string;
};

export const OTPVerification = ({
  count,
  resetCountdown,
  startCountdown,
  email,
  businessDomain,
}: Props) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  const reSend = () => {
    setSending(true);
    AuthAPI.sendVerifyEmailToAdmin(email)
      .then(() => {
        toast.success("Email sent successfully");
        resetCountdown();
        startCountdown();
        setSending(false);
      })
      .catch(() => {
        toast.error("Email sending failed");
        setSending(false);
      });
  };

  const verify = async () => {
    setLoading(true);
    try {
      await AuthAPI.enableAccountWithToken({
        tokenCode: value,
        accountInformation: email,
      });

      toast.success("Account verified successfully");
      window.onbeforeunload = null;
      redirectToWorkspace(businessDomain);
    } catch (error) {
      if (isAxiosError<ResponseMessage>(error)) {
        toast.error(error.response?.data.message);
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
