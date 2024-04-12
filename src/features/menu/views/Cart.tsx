import { useConfirmDialog } from "@/components/dialogs/ConfirmDialog";
import { MobilePage } from "@/components/layout/MobilePage";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/store/useCart";
import { Trash2 } from "lucide-react";

import { CartItem } from "../components/cart/CartItem";

export const Cart = () => {
  const items = useCart((state) => state.items);
  const clearCart = useCart((state) => state.clearCart);
  const openDialog = useConfirmDialog((state) => state.openDialog);
  return (
    <MobilePage>
      <MobilePage.Header>
        <MobilePage.TitleContainer>
          <MobilePage.Title>My Cart ({items.length})</MobilePage.Title>
        </MobilePage.TitleContainer>
        <MobilePage.Action>
          <Button
            size={"icon"}
            variant={"ghost"}
            className="w-6 h-6"
            onClick={() => {
              openDialog(
                "Clear Cart",
                "Are you sure you want to clear your cart?",
                () => {
                  clearCart();
                },
                () => {
                  // do nothing
                },
              );
            }}
          >
            <Trash2 size={24} className=" text-red-500" />
          </Button>
        </MobilePage.Action>
      </MobilePage.Header>
      <MobilePage.Content>
        <div className="flex flex-col gap-6">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
      </MobilePage.Content>
    </MobilePage>
  );
};
