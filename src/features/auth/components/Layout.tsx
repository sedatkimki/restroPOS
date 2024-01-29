import Typography from "@/components/ui/typography";
import brandLogo from "@/assets/restroPosLogo.svg";
import dashboardImg from "@/assets/Dashboard-layout.svg";

type LayoutProps = {
	children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
	return (
		<div className="container h-screen flex-col items-center justify-center grid xl:max-w-none xl:grid-cols-2 xl:px-0">
			<div className="relative hidden h-full flex-col bg-muted p-20 xl:flex border-r overflow-hidden">
				<div className="absolute inset-0  bg-orange-100" />
				<div>
					<div className="relative z-20 flex items-center text-lg font-medium">
						<img src={brandLogo} alt="restroPOS" className=" h-[40px]" />
					</div>
					<div className="relative z-20  pt-16">
						<Typography variant="h2">
							The simplest way to manage your restaurant.
						</Typography>
						<blockquote className="space-y-4">
							<p className="text-md text-muted-foreground">
								Simplify, Organize, and Optimize: Unleash the Potential of
								Restaurant Management.
							</p>
						</blockquote>
					</div>
					<img
						src={dashboardImg}
						alt="restroPos-dashboard"
						className="absolute z-20  bottom-[-7vw] rounded-lg w-[48vw] border shadow-md"
					/>
				</div>
			</div>
			<div className="lg:p-8">{children}</div>
		</div>
	);
};
