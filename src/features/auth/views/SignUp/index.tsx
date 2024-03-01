import PageTransition from "@/components/layout/PageTransition";
import { Layout } from "../../components/Layout";
import { AnimatedOutlet } from "@/components/AnimatedOutlet";
import { Form } from "./Form";
import { VerifyEmail } from "./VerifyEmail";

const SignUp = () => {
	return (
		<Layout>
			<PageTransition>
				<AnimatedOutlet />
			</PageTransition>
		</Layout>
	);
};

SignUp.Form = Form;
SignUp.VerifyEmail = VerifyEmail;

export { SignUp };
