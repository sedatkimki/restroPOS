import { FC } from "react";
import { EmptyCard } from "./EmptyCard";
import { FeaturedSection } from "./FeaturedSection";

export const FeaturedProducts: FC = () => {
	return (
		<div className="gap-6 flex flex-col">
			<FeaturedSection title="Beyti Kebap" />
			<EmptyCard />
		</div>
	);
};
