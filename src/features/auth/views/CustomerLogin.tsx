import { MobilePage } from "@/components/layout/MobilePage";
import { FC } from "react";
import { CustomerLoginForm } from "../components/CustomerLoginForm";

export const CustomerLogin: FC = () => {
  return (
    <MobilePage>
      <div className="mx-auto flex h-screen w-full flex-col justify-center space-y-6 p-8 sm:w-[400px]">
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Customer Login
          </h1>
          <p className="text-muted-foreground text-sm ">
            Login to your account to continue
          </p>
        </div>
        <CustomerLoginForm />
      </div>
    </MobilePage>
  );
};
