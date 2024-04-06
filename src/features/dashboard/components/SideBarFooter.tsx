import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Typography from "@/components/ui/typography";
import { useUser } from "@/lib/queries";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const SideBarFooter = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const navigateToProfile = () => {
    navigate("/dashboard/settings/profile");
  };
  return (
    <>
      <Card className="p-2 flex flex-row items-center gap-4">
        <Avatar className="h-12 w-12 rounded-md ">
          <AvatarImage src={user?.workspaceDto?.imageDto?.link} />
          <AvatarFallback>
            {user?.workspaceDto?.businessName?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-md">{user?.workspaceDto?.businessName}</span>
          <span className="text-xs text-muted-foreground">
            {user?.workspaceDto?.businessDomain}.
            {import.meta.env.VITE_APP_DOMAIN}
            {import.meta.env.VITE_APP_BASE_DOMAIN}
          </span>
        </div>
      </Card>

      <Separator className="my-2" />
      <div className="flex flex-row justify-between">
        <Button variant="navLink" onClick={navigateToProfile}>
          <Avatar className="h-7 w-7">
            <AvatarImage />
            <AvatarFallback>
              {user?.firstName?.charAt(0)}
              {user?.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <Typography
              variant="p"
              affects={"small"}
              className="ml-2 text-foreground"
            >
              {user?.firstName} {user?.lastName}
            </Typography>
          </div>
        </Button>
        <Button
          variant="navLink"
          className="justify-center flex-grow"
          size="icon"
          onClick={() => logout()}
        >
          <LogOut className="h-4 w-4 text-foreground" />
        </Button>
      </div>
    </>
  );
};
