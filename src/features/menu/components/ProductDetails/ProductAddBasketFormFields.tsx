import { ProductDto } from "@/api/client";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { NumberInput } from "@/components/ui/number-input";
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";

import { MultipleSelectField } from "./MultipleSelectField";
import { ProductFormValues } from "./ProductDetailsForm";
import { SingleSelectField } from "./SingleSelectField";

interface ProductAddBasketFormProps {
  product: ProductDto;
  form: UseFormReturn<ProductFormValues>;
}

export const ProductAddBasketFormFields: FC<ProductAddBasketFormProps> = ({
  product,
  form,
}) => {
  return (
    <div className="flex gap-4 flex-col">
      {product.productModifiers?.map((modifier, index) => {
        if (modifier.choice === "MULTIPLE") {
          return (
            <MultipleSelectField
              key={modifier.id}
              form={form}
              modifier={modifier}
              modifierIndex={index}
            />
          );
        } else {
          return (
            <SingleSelectField
              key={modifier.id}
              form={form}
              modifier={modifier}
              modifierIndex={index}
            />
          );
        }
      })}
      <div className="w-full flex justify-center items-center">
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <NumberInput
                  min={1}
                  max={10}
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
