import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { FC } from "react";

// TODO:update with dto

type ProductCardProps = {
  fullWidth?: boolean;
  product: {
    id: string;
    name: string;
    category: string;
    price: number;
    image: string;
  };
};

export const ProductCard: FC<ProductCardProps> = ({
  fullWidth = false,
  product,
}) => {
  return (
    <Card className={`${fullWidth ? "w-full" : "w-[270px]"}`}>
      <img
        src="https://yemek.com/_next/image/?url=https%3A%2F%2Fcdn.yemek.com%2Fmnresize%2F1250%2F833%2Fuploads%2F2023%2F11%2Fbeyti-yemekcom.jpg&w=1920&q=75"
        alt="product-image"
        className="w-full h-36 object-cover rounded-md rounded-b-none"
      />
      <div className="m-2 flex flex-col gap-2">
        <div className="flex-1 flex justify-between  items-center">
          <h3 className="font-semibold text-md">{product.name}</h3>
          <Badge
            variant={"outline"}
            className="rounded-md text-orange-500 items-center gap-1 font-medium"
          >
            <StarFilledIcon className="h-3 w-3" />
            <span className="text-xs">4,8</span>
            <span className="text-muted-foreground text-xs">(120+)</span>
          </Badge>
        </div>
        <div className="flex-1 flex justify-between items-center">
          <Badge variant="orange">{product.category}</Badge>
          <p className="font-bold text-sm">{product.price} ₺</p>
        </div>
      </div>
    </Card>
  );
};
