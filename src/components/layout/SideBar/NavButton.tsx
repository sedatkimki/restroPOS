import { Button } from "@/components/ui/button";
import React from "react";
import { Link, useLocation } from "react-router-dom";

type NavButtonProps = {
  icon: React.ReactNode;
  name: string;
  path: string;
};

const NavButton = ({ icon, name, path }: NavButtonProps) => {
  const location = useLocation();
  const isCurrentPath = location.pathname.includes(path);

  return (
    <Button variant={isCurrentPath ? "selected" : "navLink"} asChild>
      <Link to={path}>
        {icon}
        {name}
      </Link>
    </Button>
  );
};

export default NavButton;
