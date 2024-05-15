import { OrdersAPI } from "@/api";
import { OrderDto, ResponseMessage } from "@/api/client";
import { OrderReviewFormType } from "@/features/menu/components/orders/order-details/OrderReviewDrawer";
import { getSubdomain } from "@/lib";
import { isAxiosError } from "@/lib";
import { toast } from "sonner";
import useSWR from "swr";

import { useCustomer } from "../useCustomer";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ordersFetcher = async ({
  customerInfo,
}: {
  customerInfo: string;
}): Promise<OrderDto[]> => {
  const businessDomain = getSubdomain(window.location.href);
  const response = await OrdersAPI.getCustomerOrders(
    customerInfo,
    businessDomain,
  );
  return response.data;
};

export const sendReview = async (
  order: OrderDto,
  review: OrderReviewFormType,
  orders?: OrderDto[],
): Promise<OrderDto[]> => {
  const response = await OrdersAPI.reviewOrder({
    orderDto: {
      ...order,
      orderProducts: order.orderProducts?.map((product) => ({
        ...product,
        orderProductReviewStar: review.products.find(
          (reviewProduct) =>
            reviewProduct.productName === product.product?.productName,
        )?.rating,
      })),
      orderReviewComment: review.review,
      orderReviewStar: review.rating,
    },
  });

  return (
    orders?.map((order) =>
      order.id === response.data.id ? response.data : order,
    ) ?? []
  );
};

export function usePastOrders() {
  const { customer } = useCustomer();
  const {
    data: orders,
    mutate,
    error,
    isLoading,
  } = useSWR<OrderDto[]>(
    customer
      ? { url: "past-orders", customerInfo: customer.phoneNumber }
      : null,
    ordersFetcher,
    {
      revalidateOnReconnect: false,
    },
  );

  const addReview = async (order: OrderDto, review: OrderReviewFormType) => {
    try {
      await mutate(sendReview(order, review, orders), {
        optimisticData: [...(orders ?? []), order],
        rollbackOnError: true,
        populateCache: true,
        revalidate: false,
      });
      toast.success("Thank you for your review!", {
        position: "top-center",
      });
    } catch (error) {
      if (isAxiosError<ResponseMessage>(error)) {
        toast.error(error.response?.data.message, {
          position: "top-center",
        });
      }
    }
  };

  return {
    orders,
    isLoading,
    error,
    addReview,
  };
}
