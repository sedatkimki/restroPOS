import { MobilePage } from "@/components/layout/MobilePage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCustomer } from "@/lib/queries";

export const Home = () => {
	const { customer, logout } = useCustomer();
	return (
		<MobilePage>
			<MobilePage.Header>
				<MobilePage.TitleContainer>
					<MobilePage.Title>Home</MobilePage.Title>
				</MobilePage.TitleContainer>
				<MobilePage.Action>
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Avatar className="h-8 w-8">
								<AvatarImage src={customer?.imageDto?.link} />
								<AvatarFallback>
									{customer?.firstName?.charAt(0)}
									{customer?.lastName?.charAt(0)}
								</AvatarFallback>
							</Avatar>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>
								{customer?.firstName} {customer?.lastName}
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								onClick={() => {
									logout();
								}}
							>
								Logout
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</MobilePage.Action>
			</MobilePage.Header>
		</MobilePage>
	);
};
