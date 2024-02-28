import { AuthAPI } from "@/api";
import { getSubdomain } from "../utils";

import useSWR from "swr";

const workspaceExistFetcher = async (): Promise<boolean> => {
	const subdomain = getSubdomain(window.location.href);
	const response = await AuthAPI.workspaceExist(subdomain);
	return response.data;
};

export function useWorkspaceExist() {
	const subdomain = getSubdomain(window.location.href);
	const { data, error, isLoading } = useSWR<boolean>(
		`business-domain/${subdomain}`,
		workspaceExistFetcher,
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
			shouldRetryOnError: false,
		},
	);

	return {
		workspaceExist: data,
		isLoading: isLoading,
		isError: error,
	};
}
