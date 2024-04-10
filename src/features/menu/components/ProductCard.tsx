import { ProductDto } from "@/api/client";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { FC } from "react";

import { ProductDetails } from "./ProductDetails";

// TODO:update with dto

type ProductCardProps = {
  fullWidth?: boolean;
  product: ProductDto;
};

export const ProductCard: FC<ProductCardProps> = ({
  fullWidth = false,
  product,
}) => {
  return (
    <ProductDetails product={product}>
      <Card className={`${fullWidth ? "w-full" : "w-[270px]"}`}>
        <img
          src={product.image?.link}
          alt="product-image"
          className="w-full h-36 object-cover rounded-md rounded-b-none"
        />
        <div className="m-2 flex flex-col gap-2">
          <div className="flex-1 flex justify-between  items-center">
            <h3 className="font-semibold text-md">{product.productName}</h3>
            <Badge
              variant={"outline"}
              className="rounded-md text-orange-500 items-center gap-1 font-medium"
            >
              <StarFilledIcon className="h-3 w-3" />
              <span className="text-xs">0,0</span>
              <span className="text-muted-foreground text-xs">(0)</span>
            </Badge>
          </div>
          <div className="flex-1 flex justify-between items-center">
            <Badge variant="orange">{product.categoryTitle}</Badge>
            <p className="font-bold text-sm">{product.price} ₺</p>
          </div>
        </div>
      </Card>
    </ProductDetails>
  );
};
