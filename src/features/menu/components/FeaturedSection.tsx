import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Typography from "@/components/ui/typography";
import { FC } from "react";

// import { ProductCard } from "./ProductCard";

export const FeaturedSection: FC = () => {
  return (
    <div>
      <Typography variant="h4">Featured Products</Typography>
      <ScrollArea className="pt-2">
        <div className="flex w-max space-x-4 pb-4">
          {/* <ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard /> */}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};
