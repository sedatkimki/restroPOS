import { Separator } from "@/components/ui/separator";

type ChildrenProp = {
	children?: React.ReactNode;
};

const DashboardPage = ({ children }: ChildrenProp) => {
	return (
		<div className="p-8 mx-auto w-full max-w-[1600px] lg:px-10 xl:px-12 2xl:px-24">
			{children}
		</div>
	);
};

const Header = ({ children }: ChildrenProp) => {
	return (
		<>
			<div className="flex flex-row justify-between ">{children}</div>
			<Separator className="my-6" />
		</>
	);
};

const TitleContainer = ({ children }: ChildrenProp) => {
	return <div className="space-y-0.5">{children}</div>;
};

const Title = ({ children }: ChildrenProp) => {
	return <h1 className="text-3xl font-bold tracking-tight">{children}</h1>;
};

const Subtitle = ({ children }: ChildrenProp) => {
	return <p className="text-md text-muted-foreground">{children}</p>;
};

const Action = ({ children }: ChildrenProp) => {
	return <div className="flex justify-center items-center">{children}</div>;
};

DashboardPage.Header = Header;
DashboardPage.TitleContainer = TitleContainer;
DashboardPage.Title = Title;
DashboardPage.Subtitle = Subtitle;
DashboardPage.Action = Action;

export { DashboardPage };
