import { Home, Package2, Search, ShoppingCart } from "lucide-react";

import { BottomNavigation } from "@/components/layout/BottomNavigation";

import { AnimatedOutlet } from "@/components/AnimatedOutlet";
import PageTransition from "@/components/layout/PageTransition";
import { NavigationLink } from "@/lib/types";

const links: NavigationLink[] = [
	{
		name: "Home",
		path: "/menu/home",
		icon: <Home className="h-6 w-6" />,
	},
	{
		name: "Search",
		path: "/menu/search",
		icon: <Search className="h-6 w-6" />,
	},
	{
		name: "Orders",
		path: "/menu/orders",
		icon: <Package2 className="h-6 w-6" />,
	},
	{
		name: "Cart",
		path: "/menu/cart",
		icon: <ShoppingCart className="h-6 w-6" />,
	},
];

export const Menu = () => {
	return (
		<div className="max-w-lg mx-auto">
			<PageTransition>
				<AnimatedOutlet />
			</PageTransition>
			<BottomNavigation links={links} />
		</div>
	);
};
