import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Typography from "@/components/ui/typography";
import { LogOut } from "lucide-react";

export const SideBarFooter = () => {
	return (
		<>
			<Separator className="my-2" />
			<div className="flex flex-row justify-between">
				<Button variant="navLink">
					<Avatar className="h-7 w-7">
						<AvatarImage src="https://github.com/shadcn.png" />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					<div>
						<Typography
							variant="p"
							affects={"small"}
							className="ml-2 text-foreground"
						>
							Sedat Korkmaz
						</Typography>
					</div>
				</Button>
				<Button
					variant="navLink"
					className="justify-center flex-grow"
					size="icon"
				>
					<LogOut className="h-4 w-4 text-foreground" />
				</Button>
			</div>
		</>
	);
};
