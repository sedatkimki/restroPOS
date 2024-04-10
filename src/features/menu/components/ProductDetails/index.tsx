import { ProductDto } from "@/api/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import Typography from "@/components/ui/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { X } from "lucide-react";
import { FC, PropsWithChildren } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { ProductAddBasketForm } from "./ProductAddBasketForm";

interface ProductDetailsProps extends PropsWithChildren {
  product: ProductDto;
}

export const ProductFormSchema = z.object({
  productModifiers: z
    .array(
      z.object({
        id: z.number().int(),
        name: z.string(),
        selections: z
          .array(
            z.object({
              value: z.number().int(),
              label: z.string(),
            }),
          )
          .optional(),
      }),
    )
    .optional(),
  quantity: z.number().int().min(1).max(10),
});

export type ProductFormValues = z.infer<typeof ProductFormSchema>;

export const ProductDetails: FC<ProductDetailsProps> = ({
  children,
  product,
}) => {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      quantity: 1,
      productModifiers: product.productModifiers?.map((modifier) => ({
        id: modifier.id || 0,
        name: modifier.productModifierName || "",
        selections: [],
      })),
    },
  });

  const onSubmit = (values: ProductFormValues) => {
    form.getValues().productModifiers?.forEach((modifier) => {
      product.productModifiers?.forEach((productModifier) => {
        if (modifier.id === productModifier.id) {
          if (
            productModifier.isRequired &&
            (modifier.selections ?? []).length === 0
          ) {
            toast.error(`${productModifier.productModifierName} is required`, {
              position: "top-center",
            });
            return;
          }
        }
      });
    });
    console.log(values);
  };

  return (
    <Form {...form}>
      <form>
        <Drawer
          onClose={() => {
            form.reset({
              quantity: 1,
              productModifiers: product.productModifiers?.map((modifier) => ({
                id: modifier.id || 0,
                name: modifier.productModifierName || "",
                selections: [],
              })),
            });
          }}
        >
          <DrawerTrigger asChild className="cursor-pointer">
            {children}
          </DrawerTrigger>
          <DrawerContent className="outline-none max-h-[96%]">
            <DrawerHeader className="text-left flex justify-between items-center px-6">
              <DrawerTitle className="text-lg">Add Product</DrawerTitle>
              <DrawerClose>
                <Button size={"icon"} variant={"ghost"} className="h-8 w-8">
                  <X className="h-6 w-6" />
                </Button>
              </DrawerClose>
            </DrawerHeader>
            <div className=" overflow-auto">
              <img
                src={product.image?.link}
                alt="product-image"
                className="w-full h-56 object-cover"
              />
              <div className="mx-auto w-full max-w-lg px-6 py-4">
                <div className="flex gap-2 flex-col">
                  <Typography variant={"h3"}>{product.productName}</Typography>
                  <p className="text-sm text-muted-foreground">
                    {product.productDescription}
                  </p>
                  <div className="flex justify-between items-center">
                    <Badge variant="orange">{product.categoryTitle}</Badge>
                    <Badge
                      variant={"outline"}
                      className="rounded-md text-orange-500 items-center gap-1 font-medium"
                    >
                      <StarFilledIcon className="h-3 w-3" />
                      <span className="text-xs">0,0</span>
                      <span className="text-muted-foreground text-xs">(0)</span>
                    </Badge>
                  </div>
                </div>
                <Separator className="my-4" />
                <ProductAddBasketForm product={product} form={form} />
              </div>
            </div>

            <DrawerFooter>
              <Button
                disabled={!form.formState.isValid}
                onClick={() => {
                  form.handleSubmit(onSubmit)();
                }}
              >
                Submit
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </form>
    </Form>
  );
};
