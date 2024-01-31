import { buttonVariants } from "@/components/ui/button";
import { NavigationLink } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
	items: NavigationLink[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
	const location = useLocation();

	return (
		<nav
			className={cn(
				"flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 ",
				className,
			)}
			{...props}
		>
			{items.map((item) => (
				<Link
					key={item.path}
					to={item.path}
					className={cn(
						buttonVariants({ variant: "ghost" }),
						location.pathname.includes(item.path)
							? "bg-muted hover:bg-muted"
							: "hover:bg-transparent hover:underline",
						"justify-start",
					)}
				>
					{item.name}
				</Link>
			))}
		</nav>
	);
}
