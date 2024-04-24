import { useConfirmDialog } from "@/components/dialogs/ConfirmDialog";
import { NumberInput } from "@/components/ui/number-input";
import { CartItem as CartItemType, useCart } from "@/lib/store/useCart";
import { FC } from "react";

type CartItemProps = {
  item: CartItemType;
};

export const CartItem: FC<CartItemProps> = ({ item }) => {
  const changeQuantity = useCart((state) => state.changeQuantity);
  const removeFromCart = useCart((state) => state.removeFromCart);
  const openDialog = useConfirmDialog((state) => state.openDialog);
  return (
    <div className="flex gap-3">
      <span className="min-h-20 min-w-20">
        <img
          src={item.product.image?.link}
          alt="product-image"
          className="h-20 w-20 rounded-md object-cover"
        />
      </span>

      <div className="flex flex-col w-full">
        <span className="text-lg font-medium line-clamp-1">
          {item.product.productName}
        </span>
        <span className="text-xs text-muted-foreground line-clamp-2 pt-1">
          {item?.productSelectedModifiers?.map((modifiers) => {
            return modifiers?.selections?.map((selection) => {
              return `${selection.label}, `;
            });
          })}
        </span>
        <div className="mt-auto flex justify-between">
          <p className="font-semibold text-md">{item.calculatedPrice} ₺</p>
          <NumberInput
            value={item.quantity}
            onChange={(value) => {
              if (value === 0) {
                openDialog(
                  "Remove Item",
                  "Are you sure you want to remove this item?",
                  () => {
                    removeFromCart(item);
                  },
                  () => {
                    // do nothing
                  },
                );

                return;
              }
              changeQuantity(item, value);
            }}
            max={10}
          />
        </div>
      </div>
    </div>
  );
};
