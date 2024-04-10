import { FeaturedGroupsAPI } from "@/api";
import { FeaturedGroupsDto } from "@/api/client";
import useSWR from "swr";

const featuredProductsFetcher = async (): Promise<FeaturedGroupsDto[]> => {
  const response = await FeaturedGroupsAPI.getAllFeaturedGroupsForCustomer();
  return response.data;
};

export function useCustomerFeaturedGroups() {
  const {
    data: featuredGroups,
    error,
    isLoading,
  } = useSWR<FeaturedGroupsDto[]>(
    "customer/featured-products",
    featuredProductsFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  return {
    featuredGroups,
    isLoading,
    error,
  };
}
