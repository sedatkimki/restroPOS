import { MobilePage } from "@/components/layout/MobilePage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ActiveOrders } from "../components/ActiveOrders";

export const Orders = () => {
  return (
    <MobilePage>
      <MobilePage.Header>
        <MobilePage.TitleContainer>
          <MobilePage.Title>Orders</MobilePage.Title>
        </MobilePage.TitleContainer>
      </MobilePage.Header>
      <MobilePage.Content>
        <Tabs defaultValue="assigned" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="assigned">Assigned Orders</TabsTrigger>
            <TabsTrigger value="active-orders">Active Orders</TabsTrigger>
          </TabsList>
          <TabsContent value="active-orders">
            <ActiveOrders />
          </TabsContent>
          <TabsContent value="assigned">assigned</TabsContent>
        </Tabs>
      </MobilePage.Content>
    </MobilePage>
  );
};
