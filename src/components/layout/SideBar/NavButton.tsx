import { Button } from "@/components/ui/button";
import React from "react";
import { Link, useMatch } from "react-router-dom";

type NavButtonProps = {
	icon: React.ReactNode;
	name: string;
	path: string;
};

const NavButton = ({ icon, name, path }: NavButtonProps) => {
	return (
		<Button variant={useMatch(path) ? "selected" : "navLink"} asChild>
			<Link to={path}>
				{icon}
				{name}
			</Link>
		</Button>
	);
};

export default NavButton;
