import { SideBar } from "@/components/layout/SideBar";
import { NavigationLink } from "@/lib/types";
import {
	BookOpen,
	LayoutDashboard,
	MessageCircle,
	Package,
	Ratio,
	Settings,
	UsersRound,
} from "lucide-react";
import React from "react";
import { Outlet } from "react-router-dom";

const links: NavigationLink[] = [
	{
		name: "Overview",
		path: "/dashboard/overview",
		icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
	},
	{
		name: "Orders",
		path: "/dashboard/orders",
		icon: <Package className="mr-2 h-4 w-4" />,
	},
	{
		name: "Menu",
		path: "/dashboard/menu",
		icon: <BookOpen className="mr-2 h-4 w-4" />,
	},
	{
		name: "Staff",
		path: "/dashboard/staff",
		icon: <UsersRound className="mr-2 h-4 w-4" />,
	},
	{
		name: "Tables",
		path: "/dashboard/tables",
		icon: <Ratio className="mr-2 h-4 w-4" />,
	},
	{
		name: "Reviews",
		path: "/dashboard/reviews",
		icon: <MessageCircle className="mr-2 h-4 w-4" />,
	},
	{
		name: "Settings",
		path: "/dashboard/settings",
		icon: <Settings className="mr-2 h-4 w-4" />,
	},
];

export const Dashboard = () => {
	return (
		<div className="p-4 ml-64">
			<SideBar links={links} footer={<div>sds</div>} />
			<Outlet />
		</div>
	);
};
