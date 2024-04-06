import { FC } from "react";

export const DataTableEmptyState: FC = () => {
  return (
    <div className="flex h-[200px] shrink-0 items-center justify-center rounded-md border bg-muted w-full flex-1">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <h3 className="text-xl font-semibold">Your table is empty</h3>
        <p className="text-muted-foreground mt-2 text-sm">
          There are no records to display.
        </p>
      </div>
    </div>
  );
};
