import React from "react";
import { SignUpForm } from "../../components/sign-up";
import Typography from "@/components/ui/typography";

const steps = [
	{
		id: 1,
		title: "Create an account",
		description: "Create your new account to set up your workspace",
	},
	{
		id: 2,
		title: "Set up your workspace",
		description:
			"Tell us more about your workspace so we can provide you a personalized experience",
	},
];

export const Form = () => {
	const [currentStep, setCurrentStep] = React.useState(1);

	const handleNextStep = () => {
		if (currentStep === steps.length) return;
		setCurrentStep((prev) => prev + 1);
	};

	const handlePrevStep = () => {
		setCurrentStep((prev) => prev - 1);
	};

	return (
		<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
			<div className="flex flex-col space-y-2 ">
				<Typography variant="p" affects="muted">
					Step {currentStep} of {steps.length}
				</Typography>
				<h1 className="text-2xl font-semibold tracking-tight">
					{steps[currentStep - 1].title}
				</h1>
				<p className="text-sm text-muted-foreground">
					{steps[currentStep - 1].description}
				</p>
			</div>
			<SignUpForm
				step={currentStep}
				handleNextStep={handleNextStep}
				handlePrevStep={handlePrevStep}
			/>
		</div>
	);
};
