import { Home, Package2, Search, ShoppingCart } from "lucide-react";
import { Outlet } from "react-router-dom";

import { BottomNavigation } from "@/components/layout/BottomNavigation";

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
			<Outlet />
			<BottomNavigation links={links} />
		</div>
	);
};
