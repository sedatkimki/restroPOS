import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

type ChildrenProp = {
	children?: React.ReactNode;
};

function FieldCard({ children }: ChildrenProp) {
	return <Card>{children}</Card>;
}

function Title({ children }: ChildrenProp) {
	return (
		<CardHeader>
			<CardTitle className="text-xl">{children}</CardTitle>
		</CardHeader>
	);
}

function Content({ children }: ChildrenProp) {
	return (
		<CardContent>
			<CardDescription>{children}</CardDescription>
		</CardContent>
	);
}

function Footer({ children }: ChildrenProp) {
	return (
		<CardFooter className="border-t p-6 bg-muted justify-between">
			{children}
		</CardFooter>
	);
}

function FooterDescription({ children }: ChildrenProp) {
	return <p className="text-sm text-muted-foreground">{children}</p>;
}

function FooterAction({ children }: ChildrenProp) {
	return <div className="flex justify-center items-center">{children}</div>;
}

FieldCard.Title = Title;
FieldCard.Content = Content;
FieldCard.Footer = Footer;
FieldCard.FooterDescription = FooterDescription;
FieldCard.FooterAction = FooterAction;

export { FieldCard };
