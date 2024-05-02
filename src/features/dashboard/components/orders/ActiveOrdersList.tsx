import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ORDER_COLORS,
  ORDER_LABELS,
} from "@/features/waiter/components/order-details";
import { FirestoreOrderDto, OrderStatus } from "@/lib";
import moment from "moment";
import { FC } from "react";

const Row = ({ order }: { order: FirestoreOrderDto }) => {
  return (
    <TableRow>
      <TableCell>{order.id}</TableCell>
      <TableCell>
        {order.customerDto?.firstName + " " + order.customerDto?.lastName}
      </TableCell>
      <TableCell>{order.workspaceTableDto?.tableName}</TableCell>
      <TableCell>
        <Badge
          variant={"outline"}
          className={`ml-auto border-transparent font-medium ${ORDER_COLORS[order.orderStatus || OrderStatus.RECEIVED]?.[1]} ${ORDER_COLORS[order.orderStatus || OrderStatus.RECEIVED]?.[0]}`}
        >
          {ORDER_LABELS[order.orderStatus || OrderStatus.RECEIVED]}
        </Badge>
      </TableCell>
      <TableCell>
        {moment(order.orderCreationTime?.toDate()).fromNow()}
      </TableCell>
      <TableCell className="text-right">{order?.totalOrderPrice} ₺</TableCell>
    </TableRow>
  );
};

type ActiveOrdersListProps = {
  orders: FirestoreOrderDto[];
};

export const ActiveOrdersList: FC<ActiveOrdersListProps> = ({ orders }) => {
  return (
    <Table>
      <ScrollArea className="h-96">
        <TableHeader>
          <TableRow>
            <TableHead>Order Id</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Table Name</TableHead>
            <TableHead>Order Status</TableHead>
            <TableHead>Order Time</TableHead>
            <TableHead className="text-right">Total Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.map((order) => <Row key={order.id} order={order} />)}
        </TableBody>
      </ScrollArea>
    </Table>
  );
};
