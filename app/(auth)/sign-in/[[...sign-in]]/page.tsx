import { SignIn } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";

export default function Page() {
	return (
		<SignIn
			appearance={{
				baseTheme: neobrutalism,
				elements: {
					formButtonPrimary: "bg-blue-600",
					internal: 'bg-blue-600',
					footerActionLink: 'text-blue-800',
					card: "",
				},
			}}
		/>
	);
}
