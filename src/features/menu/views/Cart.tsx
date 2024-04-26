import { OrdersAPI } from "@/api";
import { ResponseMessage } from "@/api/client";
import { useConfirmDialog } from "@/components/dialogs/ConfirmDialog";
import { MobilePage } from "@/components/layout/MobilePage";
import { Button } from "@/components/ui/button";
import { isAxiosError } from "@/lib";
import { useTable } from "@/lib/queries/customer";
import { useCart } from "@/lib/store/useCart";
import { Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { CartItem } from "../components/cart/CartItem";

export const Cart = () => {
  const tableId = localStorage.getItem("tableId");
  const [loading, setLoading] = useState(false);
  const items = useCart((state) => state.items);
  const clearCart = useCart((state) => state.clearCart);
  const { table } = useTable(tableId);
  const openDialog = useConfirmDialog((state) => state.openDialog);
  const totalPrice = useMemo(
    () => items.reduce((acc, item) => acc + item.calculatedPrice, 0),
    [items],
  );
  const navigate = useNavigate();
  const handleCheckout = async () => {
    setLoading(true);
    try {
      await OrdersAPI.createOrder("subdomain1", {
        workspaceTableDto: table,
        orderProducts: items.map((item) => ({
          product: item.product,
          quantity: item.quantity,
          productSelectedModifiers: item.productSelectedModifiers,
          calculatedPrice: item.calculatedPrice,
        })),
      });
      toast.success("Your order created successfuly", {
        position: "top-center",
      });
      clearCart();
      navigate("/menu/orders");
    } catch (error) {
      if (isAxiosError<ResponseMessage>(error)) {
        toast.error(error.response?.data.message, {
          position: "top-center",
        });
      }
    }
    setLoading(false);
  };

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
              );
            }}
          >
            <Trash2 size={24} className="text-red-500" />
          </Button>
        </MobilePage.Action>
      </MobilePage.Header>
      <MobilePage.Content>
        <div className="flex flex-col gap-6 pb-[73px]">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
      </MobilePage.Content>
      <MobilePage.Footer>
        <div className="flex gap-4 justify-between">
          <div className="flex flex-col">
            <span className="text-muted-foreground text-xs">Total</span>
            <span className="text-md font-bold">₺{totalPrice}</span>
          </div>
          <Button
            className="w-[75%]"
            loading={loading}
            disabled={items.length === 0}
            onClick={() => {
              openDialog(
                "Checkout",
                "Are you sure you want to checkout?",
                handleCheckout,
              );
            }}
          >
            Checkout
          </Button>
        </div>
      </MobilePage.Footer>
    </MobilePage>
  );
};
