import { TablesAPI } from "@/api";
import { WorkspaceTableDto } from "@/api/client";
import useSWR from "swr";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const tableFetcher = async ({
  tableId,
}: {
  tableId: string;
}): Promise<WorkspaceTableDto> => {
  const response = await TablesAPI.getTableById(tableId);
  return response.data;
};

export function useTable(tableId: string | null) {
  const {
    data: table,
    error,
    isLoading,
  } = useSWR<WorkspaceTableDto>(
    tableId ? { url: "getTableById", tableId } : null,
    tableFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
    },
  );

  return {
    table,
    isLoading,
    error,
  };
}
