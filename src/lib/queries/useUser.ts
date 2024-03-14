import { AuthAPI, UserAPI } from "@/api";
import { SystemUserDto } from "@/api/client";
import useSWR from "swr";
import { clearToken, getSubdomain, getToken, setToken } from "../utils";

const userFetcher = async (): Promise<SystemUserDto> => {
	const subdomain = getSubdomain(window.location.href);
	const response = await UserAPI.getUser(subdomain);
	return response.data;
};

export function useUser() {
	const subdomain = getSubdomain(window.location.href);
	const { data, error, isLoading, mutate } = useSWR<SystemUserDto>(
		getToken() ? `workspace-user/${subdomain}` : null,
		userFetcher,
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
			shouldRetryOnError: false,
		},
	);

	const login = async (email: string, password: string) => {
		const response = await AuthAPI.loginForEmail({
			email,
			password,
		});
		setToken(response.data.accessToken, 7);
		mutate();
	};

	const logout = () => {
		clearToken();
		mutate(undefined);
	};

	return {
		user: data,
		isLoading: isLoading,
		isError: error,
		logout,
		login,
	};
}
