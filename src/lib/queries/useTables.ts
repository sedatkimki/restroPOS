import { TablesAPI } from "@/api";
import { ResponseMessage, WorkspaceTableDto } from "@/api/client";
import { toast } from "sonner";
import useSWR from "swr";

import { isAxiosError } from "..";

const tablesFetcher = async (): Promise<WorkspaceTableDto[]> => {
  const response = await TablesAPI.getAllTablesOfWorkspace();
  return response.data;
};

const createNewTable = async (
  tableName: string,
  tables?: WorkspaceTableDto[],
): Promise<WorkspaceTableDto[]> => {
  const response = await TablesAPI.addNewTable(tableName);
  return [...(tables ?? []), response.data];
};

const deleteTable = async (
  tableName: string,
  tables?: WorkspaceTableDto[],
): Promise<WorkspaceTableDto[]> => {
  const response = await TablesAPI.deleteTable(tableName);
  if (response.data.status) {
    return tables?.filter((table) => table.tableName !== tableName) ?? [];
  }
  return tables ?? [];
};

export function useTables() {
  const {
    data: tables,
    error,
    isLoading,
    mutate,
  } = useSWR<WorkspaceTableDto[]>("tables", tablesFetcher);

  const addNewTable = async (tableName: string) => {
    try {
      await mutate(createNewTable(tableName, tables), {
        optimisticData: [
          ...(tables ?? []),
          {
            tableName,
          },
        ],
        rollbackOnError: true,
        populateCache: true,
        revalidate: false,
      });
      toast.success("Table added successfully.");
    } catch (error) {
      if (isAxiosError<ResponseMessage>(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  const deleteTableByTitle = async (tableName: string) => {
    try {
      await mutate(deleteTable(tableName, tables), {
        optimisticData: tables?.filter(
          (tables) => tables.tableName !== tableName,
        ),
        rollbackOnError: true,
        populateCache: true,
        revalidate: false,
      });
      toast.success("Table deleted successfully.");
    } catch (error) {
      if (isAxiosError<ResponseMessage>(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  return {
    tables,
    isLoading,
    error,
    mutate,
    addNewTable,
    deleteTableByTitle,
  };
}
