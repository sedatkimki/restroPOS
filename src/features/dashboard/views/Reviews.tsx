import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DatePicker } from "@/components/ui/date-picker";
import { CommentRatings } from "@/components/ui/rating";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/lib/queries";
import { useReviews } from "@/lib/queries/customer/useReviews";
import { subDays } from "date-fns";
import moment from "moment";
import React from "react";
import { DateRange } from "react-day-picker";

import { DashboardPage } from "../components/DasboardPage";

export const Reviews = () => {
  const { reviews } = useReviews();
  const { user } = useUser();

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: subDays(new Date(), 60),
    to: new Date(),
  });

  return (
    <DashboardPage pageName="Reviews">
      <DashboardPage.Header>
        <DashboardPage.TitleContainer>
          <DashboardPage.Title>Reviews</DashboardPage.Title>
          <DashboardPage.Subtitle>
            See what customers are saying
          </DashboardPage.Subtitle>
        </DashboardPage.TitleContainer>
      </DashboardPage.Header>
      <div className="flex  gap-12">
        <div className="grid gap-4 sticky top-0 h-min">
          <div className="grid gap-3 p-4 w-80">
            <span className="text-sm">Total Reviews</span>
            <span className="text-4xl font-semibold">
              {user?.workspaceDto?.totalReviewCount}
            </span>
            <span className="text-xs text-muted-foreground">
              Total reviews of all time.
            </span>
          </div>
          <Separator />
          <div className="grid gap-3 p-4">
            <span className="text-sm">Average Rating</span>
            <span className="text-4xl font-semibold flex gap-2">
              <span>{user?.workspaceDto?.meanOfWorkspaceStar || 0}</span>
              <CommentRatings
                rating={user?.workspaceDto?.meanOfWorkspaceStar || 0}
                size={24}
                variant="orange"
                viewMode
              />
            </span>
            <span className="text-xs text-muted-foreground">
              Average rating of all time.
            </span>
          </div>
          <Separator />
          <DatePicker date={date} setDate={setDate} />
        </div>
        <div className="grid gap-4">
          {reviews
            ?.filter((review) => {
              const reviewDate = moment(review.commentTime);
              const startDate = moment(date?.from);
              const endDate = moment(date?.to);
              return (
                reviewDate.isSameOrAfter(startDate) &&
                reviewDate.isSameOrBefore(endDate)
              );
            })
            ?.map((review, index) => (
              <>
                <div className="p-4 flex gap-6">
                  <div className="flex gap-3 items-center w-[20%] h-min">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={review.customerDto?.imageDto?.link} />
                      <AvatarFallback>
                        {review.customerDto?.firstName?.charAt(0)}
                        {review.customerDto?.lastName?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="font-semibold">
                      {review.customerDto?.firstName +
                        " " +
                        review.customerDto?.lastName}
                    </div>
                  </div>
                  <div className="flex flex-col flex-2 w-[80%] gap-4">
                    <div className="flex gap-3 items-center">
                      <CommentRatings
                        rating={review.orderReviewStar || 0}
                        size={16}
                        variant="orange"
                        viewMode
                      />
                      <span className="text-xs text-muted-foreground items-center">
                        {moment(review.commentTime).format("MMM DD, YYYY")}
                      </span>
                    </div>

                    <div className="text-sm">{review.orderReviewComment}</div>
                  </div>
                </div>
                {index !== reviews.length - 1 && <Separator />}
              </>
            ))}
          {reviews?.length === 0 && (
            <div className="text-center">No reviews yet</div>
          )}
        </div>
      </div>
    </DashboardPage>
  );
};
