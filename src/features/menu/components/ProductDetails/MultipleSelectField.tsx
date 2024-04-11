import { ProductModifierDto } from "@/api/client";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";

import { ProductFormValues } from "./ProductDetailsForm";

export type MultipleSelectFieldProps = {
  form: UseFormReturn<ProductFormValues>;
  modifierIndex: number;
  modifier: ProductModifierDto;
};

export const MultipleSelectField: FC<MultipleSelectFieldProps> = ({
  form,
  modifierIndex,
  modifier,
}) => {
  return (
    <FormField
      control={form.control}
      name={`productModifiers.${modifierIndex}`}
      render={() => (
        <FormItem>
          <div className="flex justify-between items-center">
            <FormLabel className="text-lg">
              {modifier.productModifierName}
            </FormLabel>
            <Badge variant={modifier.isRequired ? "red" : "orange"}>
              {modifier.isRequired ? "Required" : "Optional"}
            </Badge>
          </div>
          {modifier?.productSubmodifierSet?.map((item) => (
            <FormField
              key={item.id}
              control={form.control}
              name={`productModifiers.${modifierIndex}.selections`}
              render={({ field }) => {
                return (
                  <FormItem
                    key={item.id}
                    className="flex flex-row items-start space-x-3 space-y-0"
                  >
                    <FormControl>
                      <Checkbox
                        checked={
                          field.value?.find(
                            (selection) => selection.value === item.id,
                          )
                            ? true
                            : false
                        }
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([
                                ...(field.value ?? []),
                                {
                                  value: item.id,
                                  label: item.productSubmodifierName,
                                },
                              ])
                            : field.onChange(
                                field.value?.filter(
                                  (selection) => selection.value !== item.id,
                                ),
                              );
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-normal flex justify-between w-full">
                      <span>{item.productSubmodifierName} </span>
                      <span className="text-muted-foreground">
                        {item?.price}TL
                      </span>
                    </FormLabel>
                  </FormItem>
                );
              }}
            />
          ))}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
