import { OrderDto } from "@/api/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CommentRatings } from "@/components/ui/rating";
import { Textarea } from "@/components/ui/textarea";
import { usePastOrders } from "@/lib/queries/customer/usePastOrders";
import { useOrderReviewDrawer } from "@/lib/store/useOrderReviewDrawer";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";

const ProductReviewSchema = z.object({
  productName: z.string(),
  rating: z.number().min(1).max(5),
});

const OrderReviewFormSchema = z.object({
  rating: z.number().min(1).max(5),
  review: z.string().min(10).max(500),
  products: z.array(ProductReviewSchema),
});
export type OrderReviewFormType = z.infer<typeof OrderReviewFormSchema>;

export const OrderReviewDrawer = () => {
  const isDrawerOpen = useOrderReviewDrawer((state) => state.isDrawerOpen);
  const onOpenChange = useOrderReviewDrawer((state) => state.onOpenChange);
  const closeDrawer = useOrderReviewDrawer((state) => state.closeDrawer);
  const { addReview } = usePastOrders();
  const order = useOrderReviewDrawer((state) => state.order);
  const form = useForm<OrderReviewFormType>({
    resolver: zodResolver(OrderReviewFormSchema),
    defaultValues: {
      rating: 5,
      review: "",
      products:
        order.orderProducts?.map((product) => ({
          productName: product.product?.productName || "",
          rating: 5,
        })) || [],
    },
  });

  useEffect(() => {
    form.reset({
      rating: 5,
      review: "",
      products:
        order.orderProducts?.map((product) => ({
          productName: product.product?.productName || "",
          rating: 5,
        })) || [],
    });
  }, [order, form]);

  const onSubmit = async (data: OrderReviewFormType) => {
    await addReview(order as OrderDto, data);
    closeDrawer();
  };

  return (
    <Drawer open={isDrawerOpen} onOpenChange={onOpenChange}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DrawerContent className="outline-none min-h-[96%] max-h-[96%]">
            <DrawerHeader className="text-left flex justify-between items-center px-6  border-border border-b">
              <DrawerTitle className="text-lg">Order Details</DrawerTitle>
              <DrawerClose>
                <Button size={"icon"} variant={"ghost"} className="h-8 w-8">
                  <X className="h-6 w-6" />
                </Button>
              </DrawerClose>
            </DrawerHeader>
            <div className="overflow-auto">
              <div className="mx-auto w-full max-w-lg px-6 py-4 gap-4 grid">
                <Card className="p-3 grid gap-3">
                  <div className="font-semibold">Rate your products</div>
                  <div className="grid gap-4">
                    {order.orderProducts?.map((product, index) => (
                      <div className="grid gap-1">
                        <div className="text-sm">
                          {product.product?.productName}
                        </div>
                        <CommentRatings
                          rating={form.watch(`products.${index}.rating`)}
                          variant="orange"
                          size={32}
                          onRatingChange={(value) => {
                            form.setValue(`products.${index}.rating`, value);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </Card>
                <Card className="p-3 grid gap-3">
                  <div className="font-semibold">Rate us</div>
                  <div className="grid gap-4">
                    <div className="grid gap-1">
                      <div className="text-sm">Overall experience</div>
                      <CommentRatings
                        rating={form.watch("rating")}
                        variant="orange"
                        size={32}
                        onRatingChange={(value) => {
                          form.setValue("rating", value);
                        }}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="review"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>How was your experience?</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="A delicious Turkish dish made with lamb and yogurt."
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                          <FormDescription>
                            Please use 500 characters at most
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                  </div>
                </Card>
              </div>
            </div>

            <DrawerFooter className="z-50 flex flex-row justify-between px-6 border border-t-1">
              <Button
                type="submit"
                loading={form.formState.isSubmitting}
                className="w-full"
                onClick={() => {
                  form.handleSubmit(onSubmit)();
                }}
              >
                Send Review
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </form>
      </Form>
    </Drawer>
  );
};
