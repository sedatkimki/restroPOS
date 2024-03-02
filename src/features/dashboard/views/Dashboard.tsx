import Loading from "@/components/layout/Loading";
import { SideBar } from "@/components/layout/SideBar";
import { useUser } from "@/lib/queries";
import { NavigationLink, UserRoles } from "@/lib/types";
import {
	BookOpen,
	LayoutDashboard,
	MessageCircle,
	Package,
	Ratio,
	Settings,
	UsersRound,
} from "lucide-react";
import { Navigate, Outlet } from "react-router-dom";
import { SideBarFooter } from "../components/SideBarFooter";

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
	const { user, isLoading } = useUser();
	if (isLoading) {
		return <Loading />;
	}

	if (!user) {
		return <Navigate to="/login" />;
	}

	switch (user?.role) {
		case UserRoles.CUSTOMER:
			return <Navigate to="/menu" />;
		case UserRoles.WAITER:
			return <Navigate to="/waiter" />;
		case UserRoles.KITCHEN:
			return <Navigate to="/kitchen" />;
		case UserRoles.CASH_DESK:
			return <Navigate to="/cashier" />;
		default:
			break;
	}

	return (
		<div className="ml-64">
			<SideBar links={links} footer={<SideBarFooter />} />
			<Outlet />
		</div>
	);
};
