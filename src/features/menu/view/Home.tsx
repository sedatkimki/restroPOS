import { MobilePage } from "@/components/layout/MobilePage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Home = () => {
	return (
		<MobilePage>
			<MobilePage.Header>
				<MobilePage.TitleContainer>
					<MobilePage.Title>Home</MobilePage.Title>
				</MobilePage.TitleContainer>
				<MobilePage.Action>
					<Avatar className="h-8 w-8">
						<AvatarImage src="https://github.com/shadcn.png" />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
				</MobilePage.Action>
			</MobilePage.Header>
		</MobilePage>
	);
};
