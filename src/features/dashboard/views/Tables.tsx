import { DashboardPage } from "../components/DasboardPage";
import { AddTableForm } from "../components/tables/AddTableForm";
import { TablesList } from "../components/tables/TablesList";

export const Tables = () => {
  return (
    <DashboardPage pageName="Tables">
      <DashboardPage.Header>
        <DashboardPage.TitleContainer>
          <DashboardPage.Title>Tables</DashboardPage.Title>
          <DashboardPage.Subtitle>Manage your tables</DashboardPage.Subtitle>
        </DashboardPage.TitleContainer>
      </DashboardPage.Header>
      <div className="flex flex-col gap-4">
        <AddTableForm />
        <TablesList />
      </div>
    </DashboardPage>
  );
};
