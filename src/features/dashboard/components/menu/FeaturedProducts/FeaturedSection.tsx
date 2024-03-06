import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Edit } from "lucide-react";
import { FC } from "react";
import { FeaturedSectionFrom } from "./FeaturedSectionForm";
import { ProductCard } from "./ProductCard";

// TODO: update with dto

type FeaturedSectionProps = {
	title: string;
};

export const FeaturedSection: FC<FeaturedSectionProps> = ({ title }) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center justify-between">
					{title}
					<Dialog>
						<DialogTrigger>
							<Button size="sm">
								Edit section
								<Edit className="h-4 w-4 ml-2" />
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Edit featured section</DialogTitle>
								<DialogDescription>
									Edit the section title and featured products.
								</DialogDescription>
							</DialogHeader>
							<FeaturedSectionFrom type="update" />
						</DialogContent>
					</Dialog>
				</CardTitle>
			</CardHeader>
			<Separator className="mb-6" />
			<CardContent>
				<ScrollArea>
					<div className="flex w-max space-x-4 pb-4">
						<ProductCard />
						<ProductCard />
						<ProductCard />
						<ProductCard />
						<ProductCard />
					</div>
					<ScrollBar orientation="horizontal" />
				</ScrollArea>
			</CardContent>
		</Card>
	);
};
