import { UserAPI } from "@/api";
import { clearAuthCookie, getAuthCookie, getSubdomain } from "../utils";

import { UserDto } from "@/api/client";
import useSWR from "swr";

const userFetcher = async (): Promise<UserDto> => {
	const subdomain = getSubdomain(window.location.href);
	const response = await UserAPI.getUser(subdomain);
	return response.data;
};

export function useUser() {
	const cookie = getAuthCookie();
	const subdomain = getSubdomain(window.location.href);
	const { data, error, isLoading, mutate } = useSWR<UserDto>(
		cookie ? `workspace-user/${subdomain}` : null,
		userFetcher,
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
