import { CategoryAPI } from "@/api";
import { CategoryDto } from "@/api/client";
import useSWR from "swr";

const categoriesFetcher = async (): Promise<CategoryDto[]> => {
  const response = await CategoryAPI.getAllCategoriesForCustomer();
  return response.data;
};

export function useCustomerCategories() {
  const {
    data: categories,
    error,
    isLoading,
  } = useSWR<CategoryDto[]>("customer/categories", categoriesFetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    categories,
    isLoading,
    error,
  };
}
