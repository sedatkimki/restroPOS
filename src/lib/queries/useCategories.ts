import { CategoryAPI } from "@/api";
import { CategoryDto, ResponseMessage } from "@/api/client";

import { toast } from "sonner";
import useSWR from "swr";
import { isAxiosError } from "..";

const categoriesFetcher = async (): Promise<CategoryDto[]> => {
	const response = await CategoryAPI.getAllCategories();
	return response.data;
};

const createNewCategory = async (
	data: string,
	image: File,
	categories?: CategoryDto[],
): Promise<CategoryDto[]> => {
	const response = await CategoryAPI.addNewCategory(image, data);
	return [...(categories ?? []), response.data];
};

const deleteCategory = async (
	categoryTitle: string,
	categories?: CategoryDto[],
): Promise<CategoryDto[]> => {
	const response = await CategoryAPI.deleteCategory(categoryTitle);
	if (response.data.status) {
		return (
			categories?.filter(
				(category) => category.categoryTitle !== categoryTitle,
			) ?? []
		);
	}
	return categories ?? [];
};

export function useCategories() {
	const {
		data: categories,
		error,
		isLoading,
		mutate,
	} = useSWR<CategoryDto[]>("categories", categoriesFetcher);

	const addNewCategory = async (categoryTitle: string, image: File) => {
		try {
			await mutate(createNewCategory(categoryTitle, image, categories), {
				optimisticData: [
					...(categories ?? []),
					{ categoryTitle, image: { link: URL.createObjectURL(image) } },
				],
				rollbackOnError: true,
				populateCache: true,
				revalidate: false,
			});
			toast.success("Category added successfully.");
		} catch (error) {
			if (isAxiosError<ResponseMessage>(error)) {
				toast.error(error.response?.data.message);
			}
		}
	};

	const deleteCategoryByTitle = async (categoryTitle: string) => {
		try {
			await mutate(deleteCategory(categoryTitle, categories), {
				optimisticData: categories?.filter(
					(category) => category.categoryTitle !== categoryTitle,
				),
				rollbackOnError: true,
				populateCache: true,
				revalidate: false,
			});
			toast.success("Category deleted successfully.");
		} catch (error) {
			if (isAxiosError<ResponseMessage>(error)) {
				toast.error(error.response?.data.message);
			}
		}
	};

	return {
		categories,
		categoriesOptions: categories?.map((category) => {
			return {
				label: category.categoryTitle as string,
				value: category.categoryTitle as string,
			};
		}),
		isLoading,
		error,
		mutate,
		addNewCategory,
		deleteCategoryByTitle,
	};
}
