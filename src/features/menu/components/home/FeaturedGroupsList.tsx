import Loading from "@/components/layout/Loading";
import { useCustomerFeaturedGroups } from "@/lib/queries/customer";
import { FC } from "react";

import { FeaturedSection } from "./FeaturedSection";

export const FeaturedGroupsList: FC = () => {
  const { featuredGroups, isLoading } = useCustomerFeaturedGroups();
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {featuredGroups?.map((group) => (
        <FeaturedSection featuredGroup={group} key={group.groupName} />
      ))}
    </>
  );
};
