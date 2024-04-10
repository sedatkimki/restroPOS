import { MobilePage } from "@/components/layout/MobilePage";

import { FeaturedGroupsList } from "../components/home/FeaturedGroupsList";
import { ProfileDropdown } from "../components/home/ProfileDropdown";

export const Home = () => {
  return (
    <MobilePage>
      <MobilePage.Header>
        <MobilePage.TitleContainer>
          <MobilePage.Title>Home</MobilePage.Title>
        </MobilePage.TitleContainer>
        <MobilePage.Action>
          <ProfileDropdown />
        </MobilePage.Action>
      </MobilePage.Header>
      <MobilePage.Content>
        <FeaturedGroupsList />
      </MobilePage.Content>
    </MobilePage>
  );
};
