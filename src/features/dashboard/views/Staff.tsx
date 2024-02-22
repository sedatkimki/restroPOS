import { Button } from "@/components/ui/button";
import { DashboardPage } from "../components/DasboardPage";
import { StaffTable } from "../components/staff/StaffTable";

export const Staff = () => {
  return (
    <DashboardPage pageName="Staff">
      <DashboardPage.Header>
        <DashboardPage.TitleContainer>
          <DashboardPage.Title>Staff</DashboardPage.Title>
          <DashboardPage.Subtitle>
            Manage your staff members
          </DashboardPage.Subtitle>
        </DashboardPage.TitleContainer>
        <DashboardPage.Action>
          <Button size="sm">Add Employee</Button>
        </DashboardPage.Action>
      </DashboardPage.Header>
      <StaffTable />
    </DashboardPage>
  );
};
