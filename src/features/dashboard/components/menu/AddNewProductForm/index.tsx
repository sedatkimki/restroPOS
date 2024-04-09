import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ACCEPTED_IMAGE_MIME_TYPES, MAX_FILE_SIZE } from "@/lib/constants";
import { useProducts } from "@/lib/queries/useProducts";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { ProducDetailsCard } from "./ProductDetailsCard";
import { ProductImageCard } from "./ProductImageCard";
import { ProductModifiersCard } from "./ProductModifiersCard";

// TODO price integer
const AddProductFormScheme = z.object({
  productName: z.string().min(2).max(50),
  productDescription: z.string().min(2).max(200),
  productCategory: z.string({
    required_error: "Please select a category",
  }),
  productPrice: z.coerce.number().min(0.01, "Price must be greater than 0"),
  productModifiers: z
    .array(
      z.object({
        productModifierName: z.string().min(2).max(20),
        choice: z.enum(["SINGLE", "MULTIPLE"]),
        productSubmodifierSet: z
          .array(
            z.object({
              productSubmodifierName: z.string().min(2).max(20),
              price: z.coerce.number(),
            }),
          )
          .min(1),
        isRequired: z.boolean(),
      }),
    )
    .optional(),
  productImage: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, "Max image size is 5MB.")
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported.",
    )
    .optional(),
});

export type AddProductFormValues = z.infer<typeof AddProductFormScheme>;

export const AddNewProductForm: FC = () => {
  const [addMoreDialog, setAddMoreDialog] = useState(false);
  const navigate = useNavigate();
  const { addNewProduct } = useProducts();
  const form = useForm<AddProductFormValues>({
    resolver: zodResolver(AddProductFormScheme),
    defaultValues: {},
  });

  const onSubmit = async (data: AddProductFormValues) => {
    const productInfo = JSON.stringify({
      productName: data.productName,
      productDescription: data.productDescription,
      categoryTitle: data.productCategory,
      price: data.productPrice,
      productModifiers: data.productModifiers,
    });
    const success = await addNewProduct(
      productInfo,
      data.productImage?.[0] as File,
    );
    if (success) {
      setAddMoreDialog(true);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-row gap-4 pb-16">
          <div className="flex-1 gap-4 flex flex-col">
            <ProductImageCard form={form} />
            <ProductModifiersCard form={form} />
          </div>
          <div className="flex-1">
            <ProducDetailsCard form={form} />
            <div className="flex flex-row justify-between mt-4 ">
              <Button
                variant={"outline"}
                type="submit"
                onClick={() => {
                  navigate(-1);
                }}
              >
                Cancel
              </Button>
              <Button type="submit" loading={form.formState.isSubmitting}>
                Add Product
              </Button>
            </div>
          </div>
        </div>
      </form>
      <AlertDialog open={addMoreDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Product added successfully.</AlertDialogTitle>
            <AlertDialogDescription>
              Do you want to add more? You can always add more products later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                navigate(-1);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                form.reset({
                  productName: "",
                  productDescription: "",
                  productCategory: "",
                  productPrice: 0,
                  productModifiers: [],
                  productImage: undefined,
                });
                setAddMoreDialog(false);
              }}
            >
              Add More
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Form>
  );
};
