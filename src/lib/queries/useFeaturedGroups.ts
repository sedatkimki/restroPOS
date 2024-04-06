import { FeaturedGroupsAPI } from "@/api";
import { FeaturedGroupsDto, ResponseMessage } from "@/api/client";

import { toast } from "sonner";
import useSWR from "swr";
import { isAxiosError } from "../utils";

const featuredProductsFetcher = async (): Promise<FeaturedGroupsDto[]> => {
	const response = await FeaturedGroupsAPI.getAllFeaturedGroups();
	return response.data;
};

const deleteProductGroup = async (
	groupName: string,
	featuredGroups?: FeaturedGroupsDto[],
): Promise<FeaturedGroupsDto[]> => {
	const response = await FeaturedGroupsAPI.deleteFeaturedGroup({ groupName });
	if (response.data.status) {
		return (
			featuredGroups?.filter((group) => group.groupName !== groupName) ?? []
		);
	}
	return featuredGroups ?? [];
};

export function useFeaturedGroups() {
	const {
		data: featuredGroups,
		error,
		isLoading,
		mutate,
	} = useSWR<FeaturedGroupsDto[]>("featured-products", featuredProductsFetcher);

	const deleteGroupByName = async (groupName: string) => {
		try {
			await mutate(deleteProductGroup(groupName, featuredGroups), {
				optimisticData: featuredGroups?.filter(
					(group) => group.groupName !== groupName,
				),
				rollbackOnError: true,
				populateCache: true,
				revalidate: false,
			});
			toast.success("Featured section deleted successfully.");
		} catch (error) {
			if (isAxiosError<ResponseMessage>(error)) {
				toast.error(error.response?.data.message);
			}
		}
	};

	return {
		featuredGroups,
		isLoading,
		error,
		mutate,
		deleteGroupByName,
	};
}
