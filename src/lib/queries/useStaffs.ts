import { StaffAPI } from "@/api";
import {
	ResponseMessage,
	SystemUserDto,
	SystemUserDtoResponse,
} from "@/api/client";

import { toast } from "sonner";
import useSWR from "swr";
import { isAxiosError } from "../utils";

const staffFetcher = async (): Promise<SystemUserDtoResponse[]> => {
	const response = await StaffAPI.getAllStaffsExceptAdmin();
	return response.data;
};

const createNewStaff = async (
	data: SystemUserDto,
	staffs?: SystemUserDtoResponse[],
): Promise<SystemUserDtoResponse[]> => {
	const response = await StaffAPI.addNewStaff(data);
	return [...(staffs ?? []), response.data];
};

const deleteStaff = async (
	email: string,
	staffs?: SystemUserDtoResponse[],
): Promise<SystemUserDtoResponse[]> => {
	const response = await StaffAPI.deleteStaff(email);
	if (response.data.status) {
		return staffs?.filter((staff) => staff.email !== email) ?? [];
	}
	return staffs ?? [];
};

const updateStaff = async (
	data: SystemUserDto,
	email: string,
	staffs?: SystemUserDtoResponse[],
): Promise<SystemUserDtoResponse[]> => {
	const response = await StaffAPI.updateStaff(email, data);
	return (
		staffs?.map((staff) => (staff.email === email ? response.data : staff)) ??
		[]
	);
};

export function useStaffs() {
	const {
		data: staffs,
		error,
		isLoading,
		mutate,
	} = useSWR<SystemUserDtoResponse[]>("staffs", staffFetcher);

	const addNewStaff = async (newStaff: SystemUserDto) => {
		try {
			await mutate(createNewStaff(newStaff, staffs), {
				optimisticData: [...(staffs ?? []), newStaff],
				rollbackOnError: true,
				populateCache: true,
				revalidate: false,
			});
			toast.success("Staff added successfully.");
		} catch (error) {
			if (isAxiosError<ResponseMessage>(error)) {
				toast.error(error.response?.data.message);
			}
		}
	};

	const removeStaff = async (email: string) => {
		try {
			await mutate(deleteStaff(email, staffs), {
				optimisticData: staffs?.filter((staff) => staff.email !== email),
				rollbackOnError: true,
				populateCache: true,
				revalidate: false,
			});
			toast.success("Staff deleted successfully.");
		} catch (error) {
			if (isAxiosError<ResponseMessage>(error)) {
				toast.error(error.response?.data.message);
			}
		}
	};

	const updateStaffByEmail = async (staff: SystemUserDto, email: string) => {
		try {
			const optimisticData = staffs?.map((s) =>
				s.email === staff.email ? { ...s, staff } : s,
			);
			await mutate(updateStaff(staff, email, staffs), {
				optimisticData,
				rollbackOnError: true,
				populateCache: true,
				revalidate: false,
			});
			toast.success("Staff updated successfully.");
		} catch (error) {
			if (isAxiosError<ResponseMessage>(error)) {
				toast.error(error.response?.data.message);
			}
		}
	};

	const getStaffByEmail = (email: string) => {
		return staffs?.find((staff) => staff.email === email);
	};

	return {
		staffs,
		isLoading,
		error,
		mutate,
		addNewStaff,
		removeStaff,
		getStaffByEmail,
		updateStaffByEmail,
	};
}
