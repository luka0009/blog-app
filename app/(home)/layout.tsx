import Footer from "@/components/footer/Footer";
import CTA from "@/components/footer/CTA";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col items-center justify-center h-full">
			{children}
			<br />
			<svg
				className="w-full h-auto max-h-40 translate-y-[1px]"
				preserveAspectRatio="none"
				viewBox="0 0 2160 263"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					id="Wave"
					fillRule="evenodd"
					clipRule="evenodd"
					d="M2160 262.5H0V0C360 80 720 120 1080 120C1440 120 1800 80 2160 0V262.5Z"
					fill="#0D2436"
				/>
			</svg>
			<Footer />
		</div>
	);
}
