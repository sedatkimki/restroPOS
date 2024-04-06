import { AuthAPI, CustomerAPI } from "@/api";
import { CustomerDto } from "@/api/client";
import useSWR from "swr";

import { clearToken, getToken, setToken } from "../utils";

const customerFetcher = async (): Promise<CustomerDto> => {
  const response = await CustomerAPI.getUser1();

  return response.data;
};

export function useCustomer() {
  const { data, error, isLoading, mutate } = useSWR<CustomerDto>(
    getToken() ? "customer" : null,
    customerFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
    },
  );

  const login = async (tokenCode: string, accountInformation: string) => {
    const response = await AuthAPI.loginForPhoneNumber({
      tokenCode,
      accountInformation,
    });
    setToken(response.data.accessToken, 7);
    mutate();
  };

  const logout = () => {
    clearToken();
    mutate(undefined);
  };

  return {
    customer: data,
    isLoading: isLoading,
    isError: error,
    logout,
    login,
  };
}
