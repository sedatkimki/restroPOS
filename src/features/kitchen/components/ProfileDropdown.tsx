import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/lib/queries";
import { FC } from "react";

export const ProfileDropdown: FC = () => {
  const { user, logout } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex gap-4 outline-none">
        <Avatar className="h-9 w-9">
          <AvatarImage src={""} />
          <AvatarFallback>
            {user?.firstName?.charAt(0)}
            {user?.lastName?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="grid text-left gap-0.5">
          <p className="text-sm font-medium leading-none">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          {user?.firstName} {user?.lastName}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            logout();
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
