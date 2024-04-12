import brandLogo from "@/assets/restroPosLogo.svg";
import { Loader2 } from "lucide-react";

const Loading = ({ withLogo = true }: { withLogo?: boolean }) => {
  return (
    <div className="h-screen flex justify-center items-center flex-col gap-4">
      {withLogo && <img src={brandLogo} alt="" className="h-12" />}

      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  );
};

export default Loading;
