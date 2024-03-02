import { CustomerAPI } from "@/api";
import { clearAuthCookie, getAuthCookie } from "../utils";

import { CustomerDto } from "@/api/client";
import useSWR from "swr";

const customerFetcher = async (): Promise<CustomerDto> => {
	const response = await CustomerAPI.getUser1();

	return response.data;
};

export function useCustomer() {
	const cookie = getAuthCookie();
	const { data, error, isLoading, mutate } = useSWR<CustomerDto>(
		cookie ? "customer" : null,
		customerFetcher,
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
			shouldRetryOnError: false,
		},
	);

	if (error) {
		clearAuthCookie();
	}

	const logout = () => {
		clearAuthCookie();
		mutate(undefined);
	};

	return {
		user: data,
		isLoading: isLoading,
		isError: error,
		logout,
	};
}
