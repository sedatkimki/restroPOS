import { AnimatedOutlet } from "@/components/AnimatedOutlet";
import Loading from "@/components/layout/Loading";
import { MobilePage } from "@/components/layout/MobilePage";
import PageTransition from "@/components/layout/PageTransition";
import { useCustomer } from "@/lib/queries";
import { Navigate } from "react-router-dom";
import { OTP } from "./OTP";
import { PhoneCheck } from "./PhoneCheck";
import { Register } from "./Register";

const CustomerLogin = () => {
	const { customer, isLoading } = useCustomer();

	if (isLoading) return <Loading />;

	if (customer) {
		return <Navigate to="/menu" />;
	}

	return (
		<MobilePage>
			<PageTransition>
				<AnimatedOutlet />
			</PageTransition>
		</MobilePage>
	);
};

CustomerLogin.OTP = OTP;
CustomerLogin.PhoneCheck = PhoneCheck;
CustomerLogin.Register = Register;

export { CustomerLogin };
