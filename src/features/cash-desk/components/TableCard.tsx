import { Table } from "@/lib";
import { useTables } from "@/lib/store/useTables";
import { cn } from "@/lib/utils";

export const TableCard = ({ table }: { table: Table }) => {
  const selected = useTables((state) => state.selected);
  const setSelected = useTables((state) => state.setSelected);
  return (
    <button
      className={cn(
        "flex flex-col items-start gap-2 rounded-lg border p-3 text-lefttransition-all hover:bg-accent  min-h-48 max-h-48 ",
        selected === (table?.workspaceTable?.tableId ?? "") && "bg-muted",
      )}
      onClick={() =>
        setSelected(
          selected === (table?.workspaceTable?.tableId ?? "")
            ? ""
            : table?.workspaceTable?.tableId ?? "",
        )
      }
    >
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="font-semibold">
              {table.workspaceTable.tableName}
            </div>
          </div>
          <div
            className={cn(
              "ml-auto text-xs flex items-center gap-2",
              selected === (table?.workspaceTable?.tableId ?? "")
                ? "text-foreground"
                : "text-muted-foreground",
            )}
          >
            {table.orders.length > 0 ? (
              <>
                <span className="flex h-2 w-2 rounded-full bg-orange-500" />
                busy
              </>
            ) : (
              <>
                <span className="flex h-2 w-2 rounded-full bg-green-500" />
                empty
              </>
            )}
          </div>
        </div>
      </div>
      <div className="line-clamp-5 text-xs text-muted-foreground w-full h-full">
        <dl className="flex flex-col justify-between h-full">
          <div className="grid gap-2">
            {table.orders.slice(0, 4).map((order) => (
              <div key={order.id} className="flex items-center justify-between">
                <dt className="text-muted-foreground">Order: #{order.id}</dt>
                <dd>{order.totalOrderPrice} ₺</dd>
              </div>
            ))}
            {table.orders.length > 4 && (
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">---</dt>
                <dd>...click to see all</dd>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between font-semibold">
            <dt className="text-muted-foreground">Total Amount: </dt>
            <dd>
              {table.orders.reduce(
                (acc, order) => acc + (order.totalOrderPrice ?? 0),
                0,
              )}{" "}
              ₺
            </dd>
          </div>
        </dl>
      </div>
    </button>
  );
};
