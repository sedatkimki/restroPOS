import { CategoryDto } from "@/api/client";
import { Card } from "@/components/ui/card";
import { FC } from "react";

// TODO:update with dto

type CategoryCardProps = {
  category: CategoryDto;
};

export const CategoryCard: FC<CategoryCardProps> = ({ category }) => {
  return (
    <Card>
      <img
        src={category.image?.link}
        alt="category-image"
        className="w-full h-36 object-cover rounded-md rounded-b-none"
      />
      <div className="m-2 flex flex-col gap-2 text-center">
        <h3 className="font-semibold text-md">{category.categoryTitle}</h3>
      </div>
    </Card>
  );
};
