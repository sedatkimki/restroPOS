import { FeaturedGroupsDto } from "@/api/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useFeaturedGroups } from "@/lib/queries/useFeaturedGroups";
import { Edit, Trash } from "lucide-react";
import { FC } from "react";

import { FeaturedSectionFrom } from "./FeaturedSectionForm";
import { ProductCard } from "./ProductCard";

type FeaturedSectionProps = {
  section: FeaturedGroupsDto;
};

export const FeaturedSection: FC<FeaturedSectionProps> = ({ section }) => {
  const { deleteGroupByName } = useFeaturedGroups();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {section.groupName}
          <div className="items-center flex gap-2">
            <Dialog>
              <DialogTrigger>
                <Button variant={"outline"}>
                  Edit section
                  <Edit className="h-4 w-4 ml-2" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit featured section</DialogTitle>
                  <DialogDescription>
                    Edit the section title and featured products.
                  </DialogDescription>
                </DialogHeader>
                <FeaturedSectionFrom type="update" />
              </DialogContent>
            </Dialog>
            <Button
              size="icon"
              variant={"destructive"}
              onClick={() => {
                deleteGroupByName(section.groupName ?? "");
              }}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <Separator className="mb-6" />
      <CardContent>
        <ScrollArea>
          <div className="flex w-max space-x-4 pb-4">
            {section?.products?.map((product) => (
              <ProductCard product={product} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
