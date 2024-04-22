import { AnimatedOutlet } from "@/components/AnimatedOutlet";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import Loading from "@/components/layout/Loading";
import PageTransition from "@/components/layout/PageTransition";
import { useCustomer } from "@/lib/queries";
import { useTable } from "@/lib/queries/customer";
import { NavigationLink } from "@/lib/types";
import { Home, Package2, Search, ShoppingCart } from "lucide-react";
import { Navigate } from "react-router-dom";

import { ProductDetails } from "../components/ProductDetails";
import { OrderDrawer } from "../components/orders/order-details/OrderDrawer";

const links: NavigationLink[] = [
  {
    name: "Home",
    path: "/menu/home",
    icon: <Home className="h-6 w-6" />,
  },
  {
    name: "Search",
    path: "/menu/search",
    icon: <Search className="h-6 w-6" />,
  },
  {
    name: "Orders",
    path: "/menu/orders",
    icon: <Package2 className="h-6 w-6" />,
  },
  {
    name: "Cart",
    path: "/menu/cart",
    icon: <ShoppingCart className="h-6 w-6" />,
  },
];

export const Menu = () => {
  const { customer, isLoading } = useCustomer();
  const tableId = localStorage.getItem("tableId");
  const { table, isLoading: tableLoading } = useTable(tableId);

  if (isLoading || tableLoading) {
    return <Loading />;
  }
  if (!customer) {
    return <Navigate to="/customer-login" />;
  }
  if (!table) {
    return (
      <div>
        <h1 className="text-center text-2xl font-bold mt-4">Table not found</h1>
        <p className="text-center text-lg mt-4">
          Please scan the QR code again
        </p>
      </div>
    );
  }
  return (
    <div className="max-w-lg mx-auto">
      <PageTransition>
        <AnimatedOutlet />
      </PageTransition>
      <BottomNavigation links={links} />
      <ProductDetails />
      <OrderDrawer />
    </div>
  );
};
