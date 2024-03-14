import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useStaffs } from "@/lib/queries/useStaffs";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { StaffEditForm } from "../StaffEditForm";

export function Actions({ email }: { email: string }) {
	const { removeStaff } = useStaffs();
	const [dialogOpen, setDialogOpen] = useState(false);
	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
					>
						<MoreHorizontal className="h-4 w-4" />
						<span className="sr-only">Open menu</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-[160px]">
					<DropdownMenuItem
						onClick={() => {
							setDialogOpen(true);
						}}
					>
						Edit
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						onClick={() => {
							removeStaff(email);
						}}
					>
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Edit Staff</DialogTitle>
						<DialogDescription>Edit staff member details</DialogDescription>
					</DialogHeader>
					<div className="py-4">
						<StaffEditForm setDialogOpen={setDialogOpen} email={email} />
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
}
