import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Typography from "@/components/ui/typography";
import { useUser } from "@/lib/queries/useUser";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const SideBarFooter = () => {
	const { user, logout } = useUser();
	const navigate = useNavigate();
	const navigateToProfile = () => {
		navigate("/dashboard/settings/profile");
	};
	return (
		<>
			<Separator className="my-2" />
			<div className="flex flex-row justify-between">
				<Button variant="navLink" onClick={navigateToProfile}>
					<Avatar className="h-7 w-7">
						<AvatarImage />
						<AvatarFallback>
							{user?.firstName?.charAt(0)}
							{user?.lastName?.charAt(0)}
						</AvatarFallback>
					</Avatar>
					<div>
						<Typography
							variant="p"
							affects={"small"}
							className="ml-2 text-foreground"
						>
							{user?.firstName} {user?.lastName}
						</Typography>
					</div>
				</Button>
				<Button
					variant="navLink"
					className="justify-center flex-grow"
					size="icon"
					onClick={() => logout()}
				>
					<LogOut className="h-4 w-4 text-foreground" />
				</Button>
			</div>
		</>
	);
};
