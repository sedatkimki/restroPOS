import PageTransition from "@/components/layout/PageTransition";
import { Separator } from "@/components/ui/separator";
type ChildrenProp = {
	children?: React.ReactNode;
};

interface DashboardPageProps extends ChildrenProp {
	pageName?: string;
}

const DashboardPage = ({ children, pageName }: DashboardPageProps) => {
	return (
		<PageTransition customKey={pageName}>
			<div className="p-8 mx-auto w-full max-w-[1600px] lg:px-10 xl:px-12 2xl:px-24">
				{children}
			</div>
		</PageTransition>
	);
};

const Header = ({ children }: ChildrenProp) => {
	return (
		<>
			<div className="flex flex-row items-center">{children}</div>
			<Separator className="my-6" />
		</>
	);
};

const TitleContainer = ({ children }: ChildrenProp) => {
	return <div className="items-center">{children}</div>;
};

const Title = ({ children }: ChildrenProp) => {
	return <h1 className="text-3xl font-bold tracking-tight">{children}</h1>;
};

const SubPageTitle = ({ children }: ChildrenProp) => {
	return <h2 className="text-2xl font-semibold p-0 m-0">{children}</h2>;
};

const Subtitle = ({ children }: ChildrenProp) => {
	return <p className="text-md text-muted-foreground mt-0.5">{children}</p>;
};

const Action = ({ children }: ChildrenProp) => {
	return (
		<div className="flex justify-center items-center ml-auto">{children}</div>
	);
};

DashboardPage.Header = Header;
DashboardPage.TitleContainer = TitleContainer;
DashboardPage.Title = Title;
DashboardPage.SubPageTitle = SubPageTitle;
DashboardPage.Subtitle = Subtitle;
DashboardPage.Action = Action;

export { DashboardPage };
