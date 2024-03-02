import { NavigationLink } from "@/lib/types";
import NavButton from "./NavButton";

type BottomNavigationProps = {
	links: NavigationLink[];
};

export const BottomNavigation = ({ links }: BottomNavigationProps) => {
	return (
		<nav className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t">
			<div className="grid h-full max-w-lg grid-cols-4 mx-auto">
				{links.map((link) => (
					<NavButton
						key={link.name}
						name={link.name}
						path={link.path}
						icon={link.icon}
					/>
				))}
			</div>
		</nav>
	);
};
