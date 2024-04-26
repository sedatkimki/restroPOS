import { cn } from "@/lib";
import { NavigationLink } from "@/lib/types";

import NavButton from "./NavButton";

type BottomNavigationProps = {
  links: NavigationLink[];
  col: number;
};

export const BottomNavigation = ({ links, col = 4 }: BottomNavigationProps) => {
  const gridCols = `grid-cols-${col}`;
  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t">
      <div className={cn("grid h-full max-w-lg mx-auto ", gridCols)}>
        {links.map((link) => (
          <NavButton
            key={link.name}
            name={link.name}
            path={link.path}
            icon={link.icon}
          />
        ))}
      </div>
    </nav>
  );
};
