import { ProductAPI } from "@/api";
import { ProductDto } from "@/api/client";
import useSWR from "swr";

const productFetcher = async (): Promise<ProductDto[]> => {
  const response = await ProductAPI.getAllProductsForCustomer();
  return response.data;
};

export function useCustomerProducts() {
  const {
    data: products,
    error,
    isLoading,
    mutate,
  } = useSWR<ProductDto[]>("products", productFetcher);

  return {
    products,
    isLoading,
    error,
    mutate,
  };
}
