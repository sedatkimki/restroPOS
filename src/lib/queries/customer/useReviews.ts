import { OrdersAPI } from "@/api";
import { OrderDto, ReviewResponse } from "@/api/client";
import { getSubdomain } from "@/lib";
import useSWR from "swr";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const reviewsFetcher = async (): Promise<OrderDto[]> => {
  const businessDomain = getSubdomain(window.location.href);
  const response =
    await OrdersAPI.getAllReviewsOfBusinessDomain(businessDomain);
  return response.data;
};

export function useReviews() {
  const {
    data: reviews,
    error,
    isLoading,
  } = useSWR<ReviewResponse[]>("customerReviews", reviewsFetcher, {
    revalidateOnReconnect: false,
  });

  return {
    reviews,
    isLoading,
    error,
  };
}
