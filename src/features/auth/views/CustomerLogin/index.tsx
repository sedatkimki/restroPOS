import { AnimatedOutlet } from "@/components/AnimatedOutlet";
import { MobilePage } from "@/components/layout/MobilePage";
import PageTransition from "@/components/layout/PageTransition";
import { OTP } from "./OTP";
import { PhoneCheck } from "./PhoneCheck";
import { Register } from "./Register";

const CustomerLogin = () => {
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
