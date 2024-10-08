import { ProductDto } from "@/api/client";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { FC } from "react";

// TODO:update with dto

type ProductCarProps = {
  product: ProductDto;
};

export const ProductCard: FC<ProductCarProps> = ({ product }) => {
  return (
    <Card className="w-[270px]">
      <img
        src={product.image?.link}
        alt="product-image"
        className="w-full h-48 object-cover rounded-md rounded-b-none"
      />
      <div className="m-2 flex flex-col gap-2">
        <div className="flex-1 flex justify-between  items-center">
          <h3 className="font-semibold text-md">{product.productName}</h3>
          <Badge
            variant={"outline"}
            className="rounded-md text-orange-500 items-center gap-1 font-medium"
          >
            <StarFilledIcon className="h-3 w-3" />
            <span className="text-xs">{product.meanOfProductStar}</span>
            <span className="text-muted-foreground text-xs">
              ({product.totalReviewCount})
            </span>
          </Badge>
        </div>
        <div className="flex-1 flex justify-between items-center">
          <Badge variant="orange">{product.categoryTitle}</Badge>
          <p className="font-bold text-sm">{product.price} ₺</p>
        </div>
      </div>
    </Card>
  );
};
