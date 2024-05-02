import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { PastOrdersTable } from "./PastOrdersTable";

export const PastOrdersCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-row items-center gap-4">
          Past Orders
        </CardTitle>
      </CardHeader>
      <CardContent>
        <PastOrdersTable />
      </CardContent>
    </Card>
  );
};
