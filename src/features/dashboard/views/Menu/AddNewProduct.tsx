import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DashboardPage } from "../../components/DasboardPage";
import { AddNewProductForm } from "../../components/menu/AddNewProductForm";

const AddNewProduct = () => {
	const navigate = useNavigate();
	return (
		<DashboardPage pageName="AddNewProduct">
			<DashboardPage.Header>
				<DashboardPage.TitleContainer>
					<Button
						variant={"ghost"}
						size={"sm"}
						className="mr-4 h-6 px-0 text-muted-foreground"
						onClick={() => {
							navigate(-1);
						}}
					>
						<ArrowLeft className="w-4 h-4" />
						<span className="text-xs font-normal ml-2">Back to menu</span>
					</Button>
					<DashboardPage.SubPageTitle>
						Add new product
					</DashboardPage.SubPageTitle>
				</DashboardPage.TitleContainer>
			</DashboardPage.Header>
			<AddNewProductForm />
		</DashboardPage>
	);
};

export default AddNewProduct;
