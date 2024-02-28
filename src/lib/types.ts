export type FunctionComponent = React.ReactElement | null;

export type NavigationLink = {
	name: string;
	path: string;
	icon?: React.ReactNode;
};

export enum UserRoles {
	ADMIN = "ADMIN",
	CASH_DESK = "CASH_DESK",
	CUSTOMER = "CUSTOMER",
	KITCHEN = "KITCHEN",
	WAITER = "WAITER",
}
