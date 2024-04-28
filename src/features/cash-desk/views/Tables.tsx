import { Separator } from "@/components/ui/separator";
import { DashboardPage } from "@/features/dashboard/components/DasboardPage";
import { useGetAllTablesWithOrders } from "@/lib/queries/cash-desk/useGetAllTablesWithOrders";
import { useTables } from "@/lib/store/useTables";
import { cn } from "@/lib/utils";

import { ProfileDropdown } from "../components/ProfileDropdown";
import { TableCard } from "../components/TableCard";
import { TableDetails } from "../components/TableDetails";

export const Tables = () => {
  const selected = useTables((state) => state.selected);
  const { tablesWithOrders } = useGetAllTablesWithOrders();
  return (
    <DashboardPage pageName="Tables">
      <DashboardPage.Header separator={false}>
        <DashboardPage.TitleContainer>
          <DashboardPage.Title>Tables</DashboardPage.Title>
        </DashboardPage.TitleContainer>
        <DashboardPage.Action>
          <ProfileDropdown />
        </DashboardPage.Action>
      </DashboardPage.Header>
      <Separator className="mt-6" />
      <div className="flex">
        <div
          className={cn(
            "grid grid-cols-1  gap-4 sm:grid-cols-3 lg:grid-cols-5 flex-1 pt-6  max-h-[calc(100vh-93px)] overflow-auto  auto-rows-min",
            selected ? "lg:grid-cols-3" : "lg:grid-cols-4",
          )}
        >
          {tablesWithOrders.map((table) => (
            <TableCard key={table.workspaceTable.tableId} table={table} />
          ))}
        </div>
        {selected && (
          <TableDetails
            table={
              tablesWithOrders.find(
                (table) => table.workspaceTable.tableId === selected,
              ) ?? tablesWithOrders[0]
            }
          />
        )}
      </div>
    </DashboardPage>
  );
};
