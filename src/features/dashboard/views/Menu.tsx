import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardPage } from "../components/DasboardPage";
import { FeaturedProducts } from "../components/menu/FeaturedProducts";

const tabs = [
	{
		id: 1,
		name: "Featured Products",
		content: <FeaturedProducts />,
	},
	{
		id: 2,
		name: "All Products",
		content: "Change your password here.",
	},
	{
		id: 3,
		name: "Categories",
		content: "Categories here.",
	},
];

export const Menu = () => {
	return (
		<DashboardPage pageName="Menu">
			<DashboardPage.Header>
				<DashboardPage.TitleContainer>
					<DashboardPage.Title>Menu</DashboardPage.Title>
					<DashboardPage.Subtitle>
						Manage your menu items
					</DashboardPage.Subtitle>
				</DashboardPage.TitleContainer>
			</DashboardPage.Header>
			<Tabs defaultValue={tabs[0].name}>
				<TabsList className="mb-6">
					{tabs.map((tab) => (
						<TabsTrigger key={tab.name} value={tab.name}>
							{tab.name}
						</TabsTrigger>
					))}
				</TabsList>
				{tabs.map((tab) => (
					<TabsContent key={tab.name} value={tab.name}>
						{tab.content}
					</TabsContent>
				))}
			</Tabs>
		</DashboardPage>
	);
};
