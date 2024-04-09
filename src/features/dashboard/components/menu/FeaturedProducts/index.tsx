import { useFeaturedGroups } from "@/lib/queries/useFeaturedGroups";
import { Loader2 } from "lucide-react";
import { FC } from "react";

import { EmptyCard } from "./EmptyCard";
import { FeaturedSection } from "./FeaturedSection";
import { FeaturedSectionFormDialog } from "./FeaturedSectionFormDialog";

export const FeaturedProducts: FC = () => {
  const { featuredGroups, isLoading } = useFeaturedGroups();
  return (
    <div className="gap-6 flex flex-col">
      {isLoading && (
        <div className="flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      )}
      {featuredGroups?.map((section) => <FeaturedSection section={section} />)}
      {featuredGroups && featuredGroups.length === 0 ? (
        <EmptyCard />
      ) : (
        <FeaturedSectionFormDialog />
      )}
    </div>
  );
};
