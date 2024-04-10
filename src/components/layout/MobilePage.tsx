import { Separator } from "@/components/ui/separator";

type ChildrenProp = {
  children?: React.ReactNode;
};

const MobilePage = ({ children }: ChildrenProp) => {
  return <div className="mx-auto w-full max-w-lg ">{children}</div>;
};

const Header = ({ children }: ChildrenProp) => {
  return (
    <>
      <div className="flex flex-row justify-between px-6 py-4 ">{children}</div>
      <Separator />
    </>
  );
};

const TitleContainer = ({ children }: ChildrenProp) => {
  return <div className="w-full">{children}</div>;
};

const Title = ({ children }: ChildrenProp) => {
  return <h1 className="text-2xl font-bold tracking-tight">{children}</h1>;
};

const Action = ({ children }: ChildrenProp) => {
  return <div className="flex justify-center items-center">{children}</div>;
};

const Content = ({ children }: ChildrenProp) => {
  return <div className="px-6 py-4 pb-20">{children}</div>;
};

MobilePage.Header = Header;
MobilePage.TitleContainer = TitleContainer;
MobilePage.Title = Title;
MobilePage.Action = Action;
MobilePage.Content = Content;

export { MobilePage };
