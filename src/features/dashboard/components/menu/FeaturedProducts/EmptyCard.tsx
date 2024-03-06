import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { BookMarked } from "lucide-react";
import { FC } from "react";
import { FeaturedSectionFrom } from "./FeaturedSectionForm";

export const EmptyCard: FC = () => {
	return (
		<div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border bg-muted">
			<div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
				<BookMarked className="text-muted-foreground w-10 h-10 mb-4" />
				<h3 className="text-xl font-semibold">
					You don't have any featured sections yet
				</h3>
				<p className="text-muted-foreground mt-2 text-sm">
					Add your best selling products to feature them on your menu.
				</p>
				<Dialog>
					<DialogTrigger>
						<Button size="sm" className="mt-4">
							Add Featured Section
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>New featured section</DialogTitle>
							<DialogDescription>
								Select products to feature on your menu.
							</DialogDescription>
						</DialogHeader>
						<FeaturedSectionFrom type="create" />
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
};
