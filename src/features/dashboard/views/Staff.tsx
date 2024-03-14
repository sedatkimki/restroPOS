import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { DashboardPage } from "../components/DasboardPage";
import { StaffAddForm } from "../components/staff/StaffAddForm";
import { StaffTable } from "../components/staff/StaffTable";

export const Staff = () => {
	const [dialogOpen, setDialogOpen] = useState(false);
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
					<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
						<DialogTrigger>
							<Button size="sm">Add Employee</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Add New Employee</DialogTitle>
								<DialogDescription>
									Add a new employee to your staff.
								</DialogDescription>
							</DialogHeader>
							<div className="py-4">
								<StaffAddForm setDialogOpen={setDialogOpen} />
							</div>
						</DialogContent>
					</Dialog>
				</DashboardPage.Action>
			</DashboardPage.Header>
			<StaffTable />
		</DashboardPage>
	);
};
