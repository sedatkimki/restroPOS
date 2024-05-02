import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useActiveOrders } from "@/lib/queries/useActiveOrders";
import { Loader2 } from "lucide-react";

import { ActiveOrdersList } from "./ActiveOrdersList";
import { EmptyList } from "./EmptyList";

export const ActiveOrdersCard = () => {
  const { orders, loading } = useActiveOrders();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-row items-center gap-4">
          Active Orders
          {loading && (
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {orders?.length ? <ActiveOrdersList orders={orders} /> : <EmptyList />}
      </CardContent>
    </Card>
  );
};
