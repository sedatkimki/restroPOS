import { FC } from "react";

export const EmptyList: FC = () => {
  return (
    <div className="flex h-[200px] shrink-0 items-center justify-center rounded-md border bg-muted">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <h3 className="text-xl font-semibold">
          You don't have any active orders
        </h3>
      </div>
    </div>
  );
};
