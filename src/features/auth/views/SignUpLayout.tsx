import PageTransition from "@/components/layout/PageTransition";
import { Layout } from "../components/Layout";
import { AnimatedOutlet } from "@/components/AnimatedOutlet";

export const SignUpLayout = () => {
	return (
		<Layout>
			<PageTransition>
				<AnimatedOutlet />
			</PageTransition>
		</Layout>
	);
};
