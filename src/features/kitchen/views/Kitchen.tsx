import Loading from "@/components/layout/Loading";
import { useUser } from "@/lib/queries";
import { UserRoles } from "@/lib/types";
import { Navigate, Outlet } from "react-router-dom";

export const Kitchen = () => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <Loading />;
  }
  if (!user) {
    return <Navigate to="/login" />;
  }

  switch (user?.role) {
    case UserRoles.CUSTOMER:
      return <Navigate to="/menu" />;
    case UserRoles.ADMIN:
      return <Navigate to="/" />;
    case UserRoles.WAITER:
      return <Navigate to="/waiter" />;
    case UserRoles.CASH_DESK:
      return <Navigate to="/cash-desk" />;
    default:
      break;
  }

  return <Outlet />;
};
