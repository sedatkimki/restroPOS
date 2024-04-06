import { FC, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { RegisterForm } from "../../components/customer-login";

export const Register: FC = () => {
  const location = useLocation() as {
    state: { phoneNumber: string };
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (location.state === null || location.state?.phoneNumber === undefined) {
      navigate("/customer-login");
    }
  }, [location.state, navigate]);
  return (
    <div className="mx-auto flex h-screen w-full flex-col justify-center space-y-6 p-8 sm:w-[400px]">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Let's set up your account
        </h1>
        <p className="text-muted-foreground text-sm ">
          Looks like you are new here, please enter your information to continue
        </p>
      </div>
      <RegisterForm phoneNumber={location.state?.phoneNumber} />
    </div>
  );
};
