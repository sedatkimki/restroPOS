import { ProductModifierDto } from "@/api/client";
import { Badge } from "@/components/ui/badge";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";

import { ProductFormValues } from ".";

export type SingleSelectFieldProps = {
  form: UseFormReturn<ProductFormValues>;
  modifierIndex: number;
  modifier: ProductModifierDto;
};

export const SingleSelectField: FC<SingleSelectFieldProps> = ({
  form,
  modifierIndex,
  modifier,
}) => {
  return (
    <FormField
      control={form.control}
      name={`productModifiers.${modifierIndex}.selections`}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <div className="flex justify-between items-center">
            <FormLabel className="text-lg">
              {modifier.productModifierName}
            </FormLabel>
            <Badge variant={modifier.isRequired ? "red" : "orange"}>
              {modifier.isRequired ? "Required" : "Optional"}
            </Badge>
          </div>

          <FormControl>
            <RadioGroup
              onValueChange={(value) => {
                const selected = modifier?.productSubmodifierSet?.find(
                  (item) => item.id?.toString() === value,
                );

                field.onChange([
                  {
                    value: selected?.id,
                    label: selected?.productSubmodifierName,
                  },
                ]);
              }}
              defaultValue={field.value?.[0]?.value?.toString() || ""}
              className="flex flex-col space-y-1"
            >
              {modifier?.productSubmodifierSet?.map((item) => (
                <FormItem
                  key={item.id}
                  className="flex items-center space-x-3 space-y-0"
                >
                  <FormControl>
                    <RadioGroupItem value={item.id?.toString() || ""} />
                  </FormControl>
                  <FormLabel className="font-normal flex justify-between w-full">
                    <span>{item.productSubmodifierName} </span>
                    <span className="text-muted-foreground">
                      {item?.price}TL
                    </span>
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
