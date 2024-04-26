import { Separator } from "@/components/ui/separator";
import { DashboardPage } from "@/features/dashboard/components/DasboardPage";
import { useTables } from "@/lib/store/useTables";
import { cn } from "@/lib/utils";

import { ProfileDropdown } from "../components/ProfileDropdown";

type Table = {
  id: string;
  name: string;
  description: string;
};

const tables: Table[] = [
  {
    id: "table-1",
    name: "Table 1",
    description: "Table 1 description",
  },
  {
    id: "table-2",
    name: "Table 2",
    description: "Table 2 description",
  },
  {
    id: "table-3",
    name: "Table 3",
    description: "Table 3 description",
  },
];

const TableCard = ({ table }: { table: Table }) => {
  const selected = useTables((state) => state.selected);
  const setSelected = useTables((state) => state.setSelected);
  return (
    <button
      key={table.id}
      className={cn(
        "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
        selected === table.id && "bg-muted",
      )}
      onClick={() => setSelected(selected === table.id ? "" : table.id)}
    >
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="font-semibold">{table.name}</div>

            <span className="flex h-2 w-2 rounded-full bg-blue-600" />
          </div>
          <div
            className={cn(
              "ml-auto text-xs",
              selected === table.id
                ? "text-foreground"
                : "text-muted-foreground",
            )}
          >
            {table.id}
          </div>
        </div>
        <div className="text-xs font-medium">{table.description}</div>
      </div>
      <div className="line-clamp-2 text-xs text-muted-foreground">
        {table.description.substring(0, 300)}
      </div>
    </button>
  );
};

export const Tables = () => {
  const selected = useTables((state) => state.selected);

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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 w-full pt-6">
          {tables.map((table) => (
            <TableCard key={table.id} table={table} />
          ))}
        </div>
        {selected && (
          <>
            <div className="flex-1 border-l">
              <div className="p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">Table 1</div>
                  <span className="flex h-2 w-2 rounded-full bg-blue-600" />

                  <div className="ml-auto text-xs text-foreground">table-1</div>
                </div>
                <div className="text-xs font-medium">Table 1 description</div>
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardPage>
  );
};
