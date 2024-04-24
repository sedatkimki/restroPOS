import { AnimatedOutlet } from "@/components/AnimatedOutlet";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import Loading from "@/components/layout/Loading";
import PageTransition from "@/components/layout/PageTransition";
import { OrderDrawer } from "@/features/waiter/components/order-details/OrderDrawer";
import { useUser } from "@/lib/queries";
import { NavigationLink, UserRoles } from "@/lib/types";
import { Package2, UserRound } from "lucide-react";
import { Navigate } from "react-router-dom";

const links: NavigationLink[] = [
  {
    name: "Orders",
    path: "/waiter/orders",
    icon: <Package2 className="h-6 w-6" />,
  },
  {
    name: "Profile",
    path: "/waiter/profile",
    icon: <UserRound className="h-6 w-6" />,
  },
];

export const Waiter = () => {
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
      return <Navigate to="/waiter" />;
    case UserRoles.KITCHEN:
      return <Navigate to="/kitchen" />;
    case UserRoles.CASH_DESK:
      return <Navigate to="/cashier" />;
    default:
      break;
  }

  return (
    <div className="max-w-lg mx-auto">
      <PageTransition>
        <AnimatedOutlet />
      </PageTransition>
      <BottomNavigation links={links} />
      <OrderDrawer />
    </div>
  );
};
