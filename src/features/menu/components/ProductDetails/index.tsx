import { Drawer } from "@/components/ui/drawer";
import { useProductDrawer } from "@/lib/store/useProductDrawer";
import { FC } from "react";

import { ProductDetailsForm } from "./ProductDetailsForm";

export const ProductDetails: FC = () => {
  const isDrawerOpen = useProductDrawer((state) => state.isDrawerOpen);
  const onOpenChange = useProductDrawer((state) => state.onOpenChange);
  const product = useProductDrawer((state) => state.product);
  return (
    <Drawer open={isDrawerOpen} onOpenChange={onOpenChange}>
      <ProductDetailsForm product={product} />
    </Drawer>
  );
};
