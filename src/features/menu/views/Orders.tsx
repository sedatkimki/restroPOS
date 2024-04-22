import { OrdersAPI } from "@/api";
import { MobilePage } from "@/components/layout/MobilePage";
import { Button } from "@/components/ui/button";
import { useActiveOrders } from "@/lib/queries/customer/useActiveOrders";
import { useCart } from "@/lib/store/useCart";

const DenemeComponent = () => {
  const { orders } = useActiveOrders();
  const items = useCart((state) => state.items);

  return (
    <div>
      <h1>{orders}</h1>
      <Button
        onClick={() => {
          OrdersAPI.createOrder({
            orderProducts: items,
          }).then((res) => {
            console.log(res);
          });
        }}
      >
        deneme
      </Button>
    </div>
  );
};
export const Orders = () => {
  return (
    <MobilePage>
      <MobilePage.Header>
        <MobilePage.TitleContainer>
          <MobilePage.Title>Orders</MobilePage.Title>
        </MobilePage.TitleContainer>
      </MobilePage.Header>

      <DenemeComponent />
    </MobilePage>
  );
};
