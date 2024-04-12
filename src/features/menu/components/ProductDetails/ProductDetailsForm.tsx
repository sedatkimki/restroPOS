import { ProductDto } from "@/api/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import Typography from "@/components/ui/typography";
import { useCart } from "@/lib/store/useCart";
import { useProductDrawer } from "@/lib/store/useProductDrawer";
import { zodResolver } from "@hookform/resolvers/zod";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { X } from "lucide-react";
import { FC, PropsWithChildren, useEffect, useMemo } from "react";
import { UseFormReturn, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { v4 as uuid } from "uuid";
import { z } from "zod";

import { ProductAddBasketFormFields } from "./ProductAddBasketFormFields";

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

type Selections = {
  value: number;
  label: string;
};

type ProductModifier = {
  id: number;
  name: string;
  selections?: Selections[];
};

const calculateTotalPrice = (
  product: ProductDto,
  form: UseFormReturn<ProductFormValues>,
) => {
  let totalPrice = product.price || 0;
  const modifiers = product.productModifiers;
  form.getValues().productModifiers?.forEach((modifier: ProductModifier) => {
    modifier.selections?.forEach((selection: Selections) => {
      modifiers?.forEach((productModifier) => {
        if (modifier.id === productModifier.id) {
          productModifier.productSubmodifierSet?.forEach((productSelection) => {
            if (selection.value === productSelection.id) {
              totalPrice += productSelection?.price || 0;
            }
          });
        }
      });
    });
  });
  return totalPrice * form.getValues().quantity;
};

export const ProductDetailsForm: FC<ProductDetailsProps> = ({ product }) => {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      quantity: 1,
      productModifiers: useMemo(() => {
        return product.productModifiers?.map((modifier) => ({
          id: modifier.id || 0,
          name: modifier.productModifierName || "",
          selections: [],
        }));
      }, [product]),
    },
  });

  const productModifiers = useWatch({
    control: form.control,
    name: "productModifiers",
    defaultValue: [],
  });

  const quantity = useWatch({
    control: form.control,
    name: "quantity",
    defaultValue: 1,
  });

  const totalPrice = useMemo(
    () => calculateTotalPrice(product, form),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [product, productModifiers, quantity, form],
  );

  const closeDrawer = useProductDrawer((state) => state.closeDrawer);

  useEffect(() => {
    form.reset({
      quantity: 1,
      productModifiers: product.productModifiers?.map((modifier) => ({
        id: modifier.id || 0,
        name: modifier.productModifierName || "",
        selections: [],
      })),
    });
  }, [form, product]);

  const addToCart = useCart((state) => state.addToCart);

  const onSubmit = (values: ProductFormValues) => {
    let valid = true;
    form.getValues().productModifiers?.forEach((modifier) => {
      product.productModifiers?.forEach((productModifier) => {
        if (modifier.id === productModifier.id) {
          if (
            productModifier.isRequired &&
            (modifier.selections ?? []).length === 0
          ) {
            valid = false;
            toast.error(`${productModifier.productModifierName} is required`, {
              position: "top-center",
            });
          }
        }
      });
    });
    if (valid) {
      const unique_id = uuid();

      addToCart({
        id: unique_id,
        product: product,
        quantity: values.quantity,
        productModifiers: values?.productModifiers,
        calculatedPrice: totalPrice,
      });

      toast.success("Product added to cart", { position: "top-center" });

      closeDrawer();
    }
  };

  return (
    <Form {...form}>
      <form>
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
              <ProductAddBasketFormFields product={product} form={form} />
            </div>
          </div>

          <DrawerFooter className="z-50 flex flex-row justify-between px-6 border border-t-1">
            <div className="flex flex-col">
              <span className="text-muted-foreground text-xs">Total</span>
              <span className="text-md font-bold">₺{totalPrice}</span>
            </div>
            <Button
              disabled={!form.formState.isValid}
              onClick={() => {
                form.handleSubmit(onSubmit)();
              }}
              className="w-[75%]"
            >
              Add to cart
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </form>
    </Form>
  );
};
