import { MobilePage } from "@/components/layout/MobilePage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { InProgress } from "../components/orders/InProgress";
import { PastOrders } from "../components/orders/PastOrders";

export const Orders = () => {
  return (
    <MobilePage>
      <MobilePage.Header>
        <MobilePage.TitleContainer>
          <MobilePage.Title>Orders</MobilePage.Title>
        </MobilePage.TitleContainer>
      </MobilePage.Header>
      <MobilePage.Content>
        <Tabs defaultValue="inProgress" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="inProgress">Orders in Progress</TabsTrigger>
            <TabsTrigger value="past">Past Orders</TabsTrigger>
          </TabsList>
          <TabsContent value="inProgress">
            <InProgress />
          </TabsContent>
          <TabsContent value="past">
            <PastOrders />
          </TabsContent>
        </Tabs>
      </MobilePage.Content>
    </MobilePage>
  );
};
