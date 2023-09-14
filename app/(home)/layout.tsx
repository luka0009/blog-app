import Footer from "@/components/footer/Footer";
import CTA from "@/components/footer/CTA";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col items-center justify-center h-full">
			<div className="">{children}</div>
			<Footer />
		</div>
	);
}
