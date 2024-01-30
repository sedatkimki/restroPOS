import React from "react";
import NavButton from "./NavButton";
import { NavigationLink } from "@/lib/types";
import brandLogo from "@/assets/restroPosLogo.svg";

type SideBarProps = {
	links: NavigationLink[];
	footer: React.ReactNode;
};

export const SideBar = ({ links, footer }: SideBarProps) => {
	return (
		<nav
			className="fixed top-0 left-0 z-40 w-64 h-screen py-4 px-3 bg-neutral-100 border-r flex flex-col"
			aria-label="Sidebar"
		>
			<div className="pb-10 text-left">
				<img src={brandLogo} alt="" className="h-10" />
			</div>
			<div className="flex flex-col justify-start gap-1 flex-grow">
				{links.map((link) => (
					<NavButton
						key={link.name}
						name={link.name}
						path={link.path}
						icon={link.icon}
					/>
				))}
			</div>
			<div>{footer}</div>
		</nav>
	);
};
