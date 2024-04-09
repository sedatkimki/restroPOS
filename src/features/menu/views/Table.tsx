import { MobilePage } from "@/components/layout/MobilePage";
import { Loader2 } from "lucide-react";
import { Navigate, useParams } from "react-router-dom";

export const Table = () => {
  const params = useParams<{ tableId: string }>();

  if (params.tableId) {
    localStorage.setItem("tableId", params.tableId);
    return <Navigate to="/menu/home" />;
  }
  return (
    <MobilePage>
      <div className="flex justify-center items-center h-screen">
        <div className="text-center flex items-center justify-center flex-col">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p>You'll be redirected to the menu shortly.</p>
        </div>
      </div>
    </MobilePage>
  );
};
