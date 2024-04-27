import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DashboardPage } from "@/features/dashboard/components/DasboardPage";
import { useTables } from "@/lib/store/useTables";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

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
        "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent  max-h-48 ",
        selected === table.id && "bg-muted",
      )}
      onClick={() => setSelected(selected === table.id ? "" : table.id)}
    >
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="font-semibold">{table.name}</div>
          </div>
          <div
            className={cn(
              "ml-auto text-xs flex items-center gap-2",
              selected === table.id
                ? "text-foreground"
                : "text-muted-foreground",
            )}
          >
            {/* <span className="flex h-2 w-2 rounded-full bg-orange-500" />
            busy */}
            <span className="flex h-2 w-2 rounded-full bg-green-500" />
            empty
          </div>
        </div>
      </div>
      <div className="line-clamp-5 text-xs text-muted-foreground w-full">
        <dl className="grid gap-3">
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Order: #123</dt>
            <dd>124 ₺</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Order: #123</dt>
            <dd>124 ₺</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Order: #123</dt>
            <dd>124 ₺</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Order: #123</dt>
            <dd>124 ₺</dd>
          </div>
          <div className="flex items-center justify-between font-semibold">
            <dt className="text-muted-foreground">Total Amount: </dt>
            <dd>124 ₺</dd>
          </div>
        </dl>
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
      <div className="flex h-screen ">
        <div
          className={cn(
            "grid grid-cols-1  gap-4 sm:grid-cols-3 lg:grid-cols-5 flex-1 pt-6",
            selected ? "lg:grid-cols-3" : "lg:grid-cols-4",
          )}
        >
          {tables.map((table) => (
            <TableCard key={table.id} table={table} />
          ))}
        </div>
        {selected && (
          <>
            <div className="flex-1 border-l  max-w-[500px] ml-4 max-h-screen overflow-auto">
              <div className="p-4 rounded-lg">
                <div className="flex items-center gap-2 pb-4">
                  <div className="font-semibold text-xl">Table 1</div>
                  <span className="flex h-2 w-2 rounded-full bg-green-500" />
                  <div className="ml-auto">
                    <Button size={"icon"} variant={"ghost"}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className=" overflow-auto grid gap-4">
                  <Card className="p-3 grid gap-3 ">
                    <div className="font-semibold flex">
                      Order #123{" "}
                      <Badge
                        variant={"outline"}
                        className="ml-auto font-normal"
                      >
                        deneme
                      </Badge>
                    </div>
                    <div className="text-sm">
                      <span>Customer:</span>
                      <span className="ml-2 font-semibold">Sedat Korkmaz</span>
                    </div>
                    <Separator />
                    <ul className="grid gap-3">
                      <li className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          2x Burger
                        </span>
                        <span className="text-sm">120 ₺</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          2x Burger
                        </span>
                        <span className="text-sm">120 ₺</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          2x Burger
                        </span>
                        <span className="text-sm">120 ₺</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          2x Burger
                        </span>
                        <span className="text-sm">120 ₺</span>
                      </li>
                    </ul>
                    <Separator />
                    <div className="flex items-center justify-between font-semibold">
                      <span className="text-sm text-muted-foreground">
                        Total Amount:
                      </span>
                      <span className="text-sm">124 ₺</span>
                    </div>
                    <Button>Pay</Button>
                  </Card>
                  <Card className="p-3 grid gap-3 ">
                    <div className="font-semibold flex">
                      Order #123{" "}
                      <Badge
                        variant={"outline"}
                        className="ml-auto font-normal"
                      >
                        deneme
                      </Badge>
                    </div>
                    <div className="text-sm">
                      <span>Customer:</span>
                      <span className="ml-2 font-semibold">Sedat Korkmaz</span>
                    </div>
                    <Separator />
                    <ul className="grid gap-3">
                      <li className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          2x Burger
                        </span>
                        <span className="text-sm">120 ₺</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          2x Burger
                        </span>
                        <span className="text-sm">120 ₺</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          2x Burger
                        </span>
                        <span className="text-sm">120 ₺</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          2x Burger
                        </span>
                        <span className="text-sm">120 ₺</span>
                      </li>
                    </ul>
                    <Separator />
                    <div className="flex items-center justify-between font-semibold">
                      <span className="text-sm text-muted-foreground">
                        Total Amount:
                      </span>
                      <span className="text-sm">124 ₺</span>
                    </div>
                    <Button>Pay</Button>
                  </Card>
                  <Card className="p-3 grid gap-3 ">
                    <div className="font-semibold flex">
                      Order #123{" "}
                      <Badge
                        variant={"outline"}
                        className="ml-auto font-normal"
                      >
                        deneme
                      </Badge>
                    </div>
                    <div className="text-sm">
                      <span>Customer:</span>
                      <span className="ml-2 font-semibold">Sedat Korkmaz</span>
                    </div>
                    <Separator />
                    <ul className="grid gap-3">
                      <li className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          2x Burger
                        </span>
                        <span className="text-sm">120 ₺</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          2x Burger
                        </span>
                        <span className="text-sm">120 ₺</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          2x Burger
                        </span>
                        <span className="text-sm">120 ₺</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          2x Burger
                        </span>
                        <span className="text-sm">120 ₺</span>
                      </li>
                    </ul>
                    <Separator />
                    <div className="flex items-center justify-between font-semibold">
                      <span className="text-sm text-muted-foreground">
                        Total Amount:
                      </span>
                      <span className="text-sm">124 ₺</span>
                    </div>
                    <Button>Pay</Button>
                  </Card>
                  <Card className="p-3 grid gap-3 ">
                    <div className="font-semibold flex">
                      Order #123{" "}
                      <Badge
                        variant={"outline"}
                        className="ml-auto font-normal"
                      >
                        deneme
                      </Badge>
                    </div>
                    <div className="text-sm">
                      <span>Customer:</span>
                      <span className="ml-2 font-semibold">Sedat Korkmaz</span>
                    </div>
                    <Separator />
                    <ul className="grid gap-3">
                      <li className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          2x Burger
                        </span>
                        <span className="text-sm">120 ₺</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          2x Burger
                        </span>
                        <span className="text-sm">120 ₺</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          2x Burger
                        </span>
                        <span className="text-sm">120 ₺</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          2x Burger
                        </span>
                        <span className="text-sm">120 ₺</span>
                      </li>
                    </ul>
                    <Separator />
                    <div className="flex items-center justify-between font-semibold">
                      <span className="text-sm text-muted-foreground">
                        Total Amount:
                      </span>
                      <span className="text-sm">124 ₺</span>
                    </div>
                    <Button>Pay</Button>
                  </Card>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardPage>
  );
};
