import { BookMarked } from "lucide-react";
import { FC } from "react";

import { FeaturedSectionFormDialog } from "./FeaturedSectionFormDialog";

export const EmptyCard: FC = () => {
  return (
    <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border bg-muted">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <BookMarked className="text-muted-foreground w-10 h-10 mb-4" />
        <h3 className="text-xl font-semibold">
          You don't have any featured sections yet
        </h3>
        <p className="text-muted-foreground mt-2 text-sm">
          Add your best selling products to feature them on your menu.
        </p>
        <FeaturedSectionFormDialog />
      </div>
    </div>
  );
};
