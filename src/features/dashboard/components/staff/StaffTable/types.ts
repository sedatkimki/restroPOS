import { BadgeProps } from "@/components/ui/badge";
import { ChefHat, HandCoins, HandPlatter, LucideIcon } from "lucide-react";

// TODO - refactor to use enum instead of string
export type StaffRoles = "waiter" | "cash-register" | "kitchen";

export type Staff = {
	id: string;
	name: string;
	email: string;
	role: StaffRoles;
};

export type roleType = {
	value: StaffRoles;
	label: string;
	icon: LucideIcon;
	badgeColor: BadgeProps["variant"];
};

export const roles: roleType[] = [
	{ value: "waiter", label: "Waiter", icon: HandPlatter, badgeColor: "orange" },
	{
		value: "cash-register",
		label: "Cash Register",
		icon: HandCoins,
		badgeColor: "blue",
	},
	{ value: "kitchen", label: "Kitchen", icon: ChefHat, badgeColor: "yellow" },
] as const;
