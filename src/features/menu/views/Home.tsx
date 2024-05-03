import { MobilePage } from "@/components/layout/MobilePage";
import { Badge } from "@/components/ui/badge";
import { useCustomer } from "@/lib/queries";
import { useTable } from "@/lib/queries/customer";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { ChevronRight } from "lucide-react";

import { FeaturedGroupsList } from "../components/home/FeaturedGroupsList";
import { ProfileDropdown } from "../components/home/ProfileDropdown";

export const Home = () => {
  const { customer } = useCustomer();
  const { table } = useTable(localStorage.getItem("tableId"));

  return (
    <MobilePage>
      <MobilePage.Header>
        <MobilePage.TitleContainer>
          <MobilePage.Title>Home</MobilePage.Title>
        </MobilePage.TitleContainer>
        <MobilePage.Action>
          <ProfileDropdown />
        </MobilePage.Action>
      </MobilePage.Header>
      <MobilePage.Content>
        <div className="grid gap-4 pb-4">
          <div className="flex gap-3">
            <img
              src={table?.workspaceDto?.imageDto?.link || ""}
              alt="Order confirmed"
              className="rounded w-16 w-min-16"
            />
            <div className="grid w-full">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-semibold">
                  {table?.workspaceDto?.businessName}
                </span>
                <Badge
                  variant={"outline"}
                  className="rounded-md items-center  font-medium"
                >
                  <span className="text-muted-foreground text-xs">
                    {table?.tableName}
                  </span>
                </Badge>
              </div>

              <div className="flex items-center gap-2">
                <Badge
                  variant={"outline"}
                  className="rounded-md text-orange-500 items-center gap-1 font-medium w-min"
                >
                  <StarFilledIcon className="h-3 w-3" />
                  <span className="text-xs">0,0</span>
                  <span className="text-muted-foreground text-xs">(0)</span>
                </Badge>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <span>See all reviews</span>
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
          <div className="grid">
            <span className="text-muted-foreground">
              Hello, {customer?.firstName}
            </span>
            <span className="text-2xl font-semibold">
              What do you want to order today?{" "}
            </span>
          </div>
        </div>
        <FeaturedGroupsList />
      </MobilePage.Content>
    </MobilePage>
  );
};
