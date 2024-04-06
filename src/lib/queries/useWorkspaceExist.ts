import { AuthAPI } from "@/api";
import useSWR from "swr";

import { getSubdomain } from "../utils";

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
