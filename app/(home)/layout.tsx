import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import CTA from "@/components/footer/CTA";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col gap-3 items-center justify-center h-full">
			<Header />
			{children}
			<Footer />
		</div>
	);
}
