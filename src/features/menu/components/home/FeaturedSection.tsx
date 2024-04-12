import { FeaturedGroupsDto } from "@/api/client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Typography from "@/components/ui/typography";
import { FC } from "react";

import { ProductCard } from "../ProductCard";

type FeaturedSectionProps = {
  featuredGroup: FeaturedGroupsDto;
};

export const FeaturedSection: FC<FeaturedSectionProps> = ({
  featuredGroup,
}) => {
  return (
    <div>
      <Typography variant="h4">{featuredGroup.groupName}</Typography>
      <ScrollArea className="pt-2">
        <div className="flex w-max space-x-4 pb-4">
          {featuredGroup?.products?.map((product) => (
            <ProductCard product={product} key={product.productName} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};
