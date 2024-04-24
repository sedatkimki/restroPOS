import { MobilePage } from "@/components/layout/MobilePage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/lib/queries";
import { LogOut } from "lucide-react";

export const Profile = () => {
  const { user, logout } = useUser();

  return (
    <MobilePage>
      <MobilePage.Header>
        <MobilePage.TitleContainer>
          <MobilePage.Title>Profile</MobilePage.Title>
        </MobilePage.TitleContainer>
      </MobilePage.Header>
      <MobilePage.Content>
        <Card className="p-3 grid gap-3">
          <div className="font-semibold">Workspace Details</div>
          <div className="flex flex-row gap-4">
            <Avatar className="h-12 w-12 ">
              <AvatarImage src={user?.workspaceDto?.imageDto?.link} />
              <AvatarFallback>
                {user?.workspaceDto?.businessName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-lg font-medium">
                {user?.workspaceDto?.businessName}
              </span>
              <span className="text-sm text-muted-foreground">
                {user?.workspaceDto?.businessDomain}.
                {import.meta.env.VITE_APP_DOMAIN}
                {import.meta.env.VITE_APP_BASE_DOMAIN}
              </span>
            </div>
          </div>
          <Separator />
          <div className="font-semibold">User Details</div>
          <div className="flex flex-row gap-4">
            <Avatar className="h-12 w-12 ">
              <AvatarImage src={""} />
              <AvatarFallback>
                {(user?.firstName?.charAt(0) ?? "") +
                  (user?.lastName?.charAt(0) ?? "")}
              </AvatarFallback>
            </Avatar>
            <div className="flex items-center">
              <span className="text-lg font-medium">
                {user?.firstName} {user?.lastName}
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full flex justify-start gap-4"
            onClick={() => logout()}
          >
            <LogOut className="h-4 w-4 " />
            <span className="text-md font-normal">Logout</span>
          </Button>
        </Card>
      </MobilePage.Content>
    </MobilePage>
  );
};
