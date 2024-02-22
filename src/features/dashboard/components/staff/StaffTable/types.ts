import { ChefHat, HandCoins, HandPlatter } from "lucide-react";

export type StaffRoles = "waiter" | "cash-register" | "kitchen";

export type Staff = {
	id: string;
	name: string;
	email: string;
	role: StaffRoles;
};

export const roles = [
	{ value: "waiter", label: "Waiter", icon: HandPlatter },
	{ value: "cash-register", label: "Cash Register", icon: HandCoins },
	{ value: "kitchen", label: "Kitchen", icon: ChefHat },
];
