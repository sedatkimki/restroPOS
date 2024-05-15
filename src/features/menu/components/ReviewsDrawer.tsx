import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Drawer } from "@/components/ui/drawer";
import {
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { CommentRatings } from "@/components/ui/rating";
import { useReviews } from "@/lib/queries/customer/useReviews";
import { useReviewsDrawer } from "@/lib/store/useReviewsDrawer";
import { X } from "lucide-react";
import moment from "moment";
import { FC } from "react";

export const ReviewsDrawer: FC = () => {
  const isDrawerOpen = useReviewsDrawer((state) => state.isDrawerOpen);
  const onOpenChange = useReviewsDrawer((state) => state.onOpenChange);
  const { reviews } = useReviews();

  return (
    <Drawer open={isDrawerOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="outline-none min-h-[96%] max-h-[96%]">
        <DrawerHeader className="text-left flex justify-between items-center px-6  border-border border-b">
          <DrawerTitle className="text-lg">Reviews</DrawerTitle>
          <DrawerClose>
            <Button size={"icon"} variant={"ghost"} className="h-8 w-8">
              <X className="h-6 w-6" />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <div className=" overflow-auto">
          <div className="mx-auto w-full max-w-lg px-6 py-4 gap-4 grid">
            {reviews?.map((review) => (
              <Card className="p-3 grid gap-3">
                <div className="flex gap-2">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={review.customerDto?.imageDto?.link} />
                    <AvatarFallback>
                      {review.customerDto?.firstName?.charAt(0)}
                      {review.customerDto?.lastName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid">
                    <span className="text-sm">
                      {review.customerDto?.firstName +
                        " " +
                        review.customerDto?.lastName}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {moment(review.commentTime).fromNow()}
                    </span>
                  </div>
                </div>
                <div>
                  <CommentRatings
                    rating={review.orderReviewStar || 0}
                    size={16}
                    variant="orange"
                    viewMode
                  />
                </div>
                <div className="text-sm">{review.orderReviewComment}</div>
              </Card>
            ))}
            {reviews?.length === 0 && (
              <div className="text-center">No reviews yet</div>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
