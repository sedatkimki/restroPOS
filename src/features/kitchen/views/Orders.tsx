import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DashboardPage } from "@/features/dashboard/components/DasboardPage";

import { ProfileDropdown } from "../components/ProfileDropdown";

const OrderCard = () => {
  return (
    <Card className="overflow-hidden mb-4">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="flex items-center gap-2 text-lg">
            #12324
          </CardTitle>
          <CardDescription className="flex gap-1 items-center p-0">
            <span>Ordered 5 min ago</span>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <ul className="grid gap-3">
            <li className="flex gap-2">
              <span className="font-semibold">1x</span>
              <div className="grid gap-1">
                <span className="font-semibold">Cheese Burger </span>
                <span className="text-muted-foreground">pickles</span>
                <span className="text-muted-foreground">extra cheese</span>
              </div>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold">1x</span>
              <div className="grid gap-1">
                <span className="font-semibold">Cheese Burger </span>
                <span className="text-muted-foreground">pickles</span>
                <span className="text-muted-foreground">extra cheese</span>
              </div>
            </li>
          </ul>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Order Detail</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Customer</dt>
              <dd>Liam Johnson</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Waiter</dt>
              <dd>John liam</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Table No</dt>
              <dd>A5</dd>
            </div>
          </dl>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3 gap-4">
        <Button variant="destructive" className="w-full">
          Cancel Order
        </Button>
        <Button className="w-full">Mark as Completed</Button>
      </CardFooter>
    </Card>
  );
};

export const Orders = () => {
  return (
    <DashboardPage pageName="Orders">
      <DashboardPage.Header>
        <DashboardPage.TitleContainer>
          <DashboardPage.Title>Orders</DashboardPage.Title>
        </DashboardPage.TitleContainer>
        <DashboardPage.Action>
          <ProfileDropdown />
        </DashboardPage.Action>
      </DashboardPage.Header>
      <div className="columns-1 md:columns-2 lg:columns-3 column-gap-6">
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
      </div>
    </DashboardPage>
  );
};
