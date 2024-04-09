import { ProductDto } from "@/api/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
} from "@/components/ui/command";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFeaturedGroups } from "@/lib/queries/useFeaturedGroups";
import { useProducts } from "@/lib/queries/useProducts";
import { zodResolver } from "@hookform/resolvers/zod";
import _ from "lodash";
import { Check, Loader2 } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";

// TODO: REFACTOR THISSSS

const FeaturedSectionFromSchema = z.object({
  title: z.string().min(2).max(30),
  products: z
    .array(
      z.object({
        productName: z.string(),
        image: z.string().nullable(),
      }),
    )
    .min(2, "Select at least 2 products.")
    .max(10, "Select at most 10 products."),
});

type FeaturedSectionFormProps = {
  type: "create" | "update";
  setModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const FeaturedSectionFrom: React.FC<FeaturedSectionFormProps> = ({
  type,
  setModalOpen,
}) => {
  const { products, isLoading } = useProducts();
  const { addFeaturedGroup } = useFeaturedGroups();
  const form = useForm<z.infer<typeof FeaturedSectionFromSchema>>({
    resolver: zodResolver(FeaturedSectionFromSchema),
    defaultValues: {
      title: "",
      products: [],
    },
  });

  const onSubmit = async (data: z.infer<typeof FeaturedSectionFromSchema>) => {
    if (type === "create") {
      await addFeaturedGroup({
        groupName: data.title,
        products: data.products.map(
          (product) =>
            ({
              productName: product.productName,
            }) as ProductDto,
        ),
      });
      setModalOpen?.(false);
    } else {
      // update
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Section title</FormLabel>
              <FormControl>
                <Input placeholder="Most preferred" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="products"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Products</FormLabel>
              <FormControl>
                <Command className="rounded-md border">
                  <CommandInput placeholder="Search products..." />
                  <CommandList>
                    {isLoading && (
                      <CommandLoading>
                        <div className="flex justify-center items-center">
                          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                        </div>
                      </CommandLoading>
                    )}
                    <CommandEmpty>No products found.</CommandEmpty>
                    <CommandGroup className="p-2">
                      {products?.map((product) => (
                        <CommandItem
                          key={product.productName}
                          className="flex items-center px-2"
                          onSelect={() => {
                            const selectedProducts: {
                              productName: string;
                              image: string | null;
                            }[] = field.value;
                            if (
                              _.some(selectedProducts, {
                                productName: product.productName,
                                image: product.image?.link,
                              })
                            ) {
                              return field.onChange(
                                selectedProducts
                                  .filter(
                                    (p) =>
                                      p.productName !== product.productName,
                                  )
                                  .map((p) => ({
                                    productName: p.productName,
                                    image: p.image,
                                  })),
                              );
                            }

                            return field.onChange(
                              selectedProducts.concat({
                                productName: product.productName,
                                image: product.image?.link,
                              } as {
                                productName: string;
                                image: string | null;
                              }),
                            );
                          }}
                        >
                          <Avatar>
                            <AvatarImage
                              src={product.image?.link}
                              alt="Image"
                            />
                            <AvatarFallback>
                              {product.productName?.split(" ")[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="ml-2">
                            <p className="text-sm font-medium leading-none">
                              {product.productName}
                            </p>
                          </div>
                          {_.some(field.value, {
                            productName: product.productName,
                            image: product.image?.link,
                          }) ? (
                            <Check className="ml-auto flex h-5 w-5 text-primary" />
                          ) : null}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter className="flex items-center  sm:justify-between">
          {form.watch("products").length > 0 ? (
            <div className="flex -space-x-2 overflow-hidden">
              {form.watch("products").map((product) => (
                <Avatar
                  key={product.productName}
                  className="inline-block border-2 border-background"
                >
                  <AvatarImage src={product.image || undefined} />
                  <AvatarFallback>
                    {product.productName?.split(" ")[0]}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Select products to feature on your new section.
            </p>
          )}
          <Button
            disabled={form.watch("products").length < 2}
            type="submit"
            loading={form.formState.isSubmitting}
          >
            Continue
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
