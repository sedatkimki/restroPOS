import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTables } from "@/lib/queries/useTables";
import { Download, ImageOff, Loader2, Trash } from "lucide-react";
import { FC } from "react";

import { EmptyList } from "./EmptyList";

export const TablesList: FC = () => {
  const { tables, deleteTableByTitle, isLoading } = useTables();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-row items-center gap-4">
          Tables
          {isLoading && (
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {tables?.length ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Qr Code</TableHead>
                <TableHead>Table Name</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tables?.map((table) => (
                <TableRow>
                  <TableCell>
                    {table.imageDto?.link ? (
                      <img
                        src={table.imageDto?.link}
                        className="h-16 w-16 rounded-md border object-cover shadow-sm flex-1"
                        alt=""
                      />
                    ) : (
                      <div className="flex h-16 w-16 flex-wrap content-center justify-center rounded-md  border shadow-sm">
                        <ImageOff className="h-6 w-6  text-neutral-300" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{table.tableName}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="icon"
                      className="mr-2"
                      onClick={() => {}}
                      asChild
                    >
                      <a href={table.imageDto?.link} target="_blank">
                        <Download className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => {
                        deleteTableByTitle(table.tableName ?? "");
                      }}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <EmptyList />
        )}
      </CardContent>
    </Card>
  );
};
