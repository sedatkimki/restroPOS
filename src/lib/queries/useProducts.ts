import { ProductAPI } from "@/api";
import { ProductDto, ResponseMessage } from "@/api/client";
import { toast } from "sonner";
import useSWR from "swr";

import { isAxiosError } from "../utils";

const productFetcher = async (): Promise<ProductDto[]> => {
  const response = await ProductAPI.getAllProducts();
  return response.data;
};

const deleteProduct = async (
  productName: string,
  products?: ProductDto[],
): Promise<ProductDto[]> => {
  const response = await ProductAPI.deleteProduct(productName);
  if (response.data.status) {
    return (
      products?.filter((product) => product.productName !== productName) ?? []
    );
  }
  return products ?? [];
};

export function useProducts() {
  const {
    data: products,
    error,
    isLoading,
    mutate,
  } = useSWR<ProductDto[]>("products", productFetcher);

  const addNewProduct = async (
    productInfo: string,
    image: File,
  ): Promise<boolean> => {
    try {
      await ProductAPI.addNewProduct(productInfo, image);
      toast.success("Product added successfully.");
      return true;
    } catch (error) {
      if (isAxiosError<ResponseMessage>(error)) {
        toast.error(error.response?.data.message);
      }
      return false;
    }
  };

  const deleteProductByName = async (productName: string) => {
    try {
      await mutate(deleteProduct(productName, products), {
        optimisticData: products?.filter(
          (category) => category.productName !== productName,
        ),
        rollbackOnError: true,
        populateCache: true,
        revalidate: false,
      });
      toast.success("Product deleted successfully.");
    } catch (error) {
      if (isAxiosError<ResponseMessage>(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  return {
    products,
    isLoading,
    error,
    mutate,
    addNewProduct,
    deleteProductByName,
  };
}
