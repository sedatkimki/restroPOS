import { cn } from "@/lib/utils";
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

  const variant = isCurrentPath ? "text-primary " : "text-muted-foreground";
  return (
    <Link
      className={cn(
        "hover:text-primary text-muted-foreground inline-flex flex-col items-center justify-center px-5 gap-1",
        variant,
      )}
      to={path}
    >
      {icon}
      <div className="text-sm">{name}</div>
    </Link>
  );
};

export default NavButton;
