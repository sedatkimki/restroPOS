import { FC } from "react";
import { PhoneCheckForm } from "../../components/customer-login";

export const PhoneCheck: FC = () => {
	return (
		<div className="mx-auto flex h-screen w-full flex-col justify-center space-y-6 p-8 sm:w-[400px]">
			<div className="flex flex-col space-y-2">
				<h1 className="text-2xl font-semibold tracking-tight">
					Welcome to restroPOS 🍔
				</h1>
				<p className="text-muted-foreground text-sm ">
					Please enter your phone number to see menu.
				</p>
			</div>
			<PhoneCheckForm />
		</div>
	);
};
