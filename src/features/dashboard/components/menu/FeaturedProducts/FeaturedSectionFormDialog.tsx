import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FC, useState } from "react";

import { FeaturedSectionFrom } from "./FeaturedSectionForm";

export const FeaturedSectionFormDialog: FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger className="flex">
        <Button
          size="sm"
          className="mt-4"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          Add Featured Section
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New featured section</DialogTitle>
          <DialogDescription>
            Select products to feature on your menu.
          </DialogDescription>
        </DialogHeader>
        <FeaturedSectionFrom type="create" setModalOpen={setModalOpen} />
      </DialogContent>
    </Dialog>
  );
};
