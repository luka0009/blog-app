"use client";
import { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/navigation";
import images from "@/constants/images";
import Image from "next/image";
import { UserButton, useUser } from "@clerk/nextjs";

type NavItemInfo = {
	name: string;
	type: string;
	href?: string;
	items?: { title: string; href: string }[];
	auth?: boolean;
};

const navItemsInfo: NavItemInfo[] = [
	{ name: "Home", type: "link", href: "/", auth: false },
	{
		name: "Pages",
		type: "dropdown",
		items: [
			{ title: "About us", href: "/about" },
			{ title: "Contact us", href: "/contact" },
		],
		auth: true,
	},
	{ name: "Articles", type: "link", href: "/articles", auth: true },
	{ name: "Pricing", type: "link", href: "/pricing", auth: true },
	{ name: "FAQ", type: "link", href: "/faq", auth: true },
];

interface NavProps {
	item: NavItemInfo;
}

const NavItem = ({ item }: NavProps) => {
	const [dropdown, setDropdown] = useState(false);
	const { isSignedIn } = useUser();

	const toggleDropdownHandler = () => {
		setDropdown((curState) => {
			return !curState;
		});
	};

	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

	return (
		<li className="relative group">
			{item.type === "link" ? (
				<>
					{!item.auth || isSignedIn ? (
						<Link href={item.href || "/"} className="px-4 py-2">
							{item.name}
						</Link>
					) : (
						<span className="cursor-pointer text-blue-500 absolute transition-all duration-500 font-bold right-0 top-0 group-hover:right-[90%] opacity-0 group-hover:opacity-100">
							/
						</span>
					)}
				</>
			) : (
				<div className="flex flex-col items-center">
					<button
						className="px-4 py-2 flex gap-x-1 items-center"
						onClick={toggleDropdownHandler}
					>
						<span>{item.name}</span>
						{dropdown ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
					</button>
					<div
						className={`${
							dropdown ? "block" : "hidden"
						} lg:hidden transition-all duration-500 pt-4 lg:pt-2 lg:absolute lg:bottom-0 lg:right-0 lg:transform lg:translate-y-full lg:group-hover:block w-max`}
					>
						{item.items && (
							<ul className="bg-dark-soft lg:bg-transparent text-center flex flex-col shadow-lg rounded-lg overflow-hidden lg:-mt-1">
								{item.items.map((page, index) => (
									<Link
										key={index}
										href={page.href}
										className="hover:bg-dark-hard hover:text-white px-4 py-2 text-white lg:text-dark-soft"
									>
										{page.title}
									</Link>
								))}
							</ul>
						)}
					</div>
				</div>
			)}
		</li>
	);
};

const Header = () => {
	const [isVisible, setIsVisible] = useState(false);
	const { isLoaded, isSignedIn, user } = useUser();

	console.log("IS SIGNED IN", isSignedIn);
	console.log("USER: ", user);

	const router = useRouter();

	const navVisibility = () => {
		setIsVisible((visible) => !visible);
	};

	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

	return (
		<section className="absolute top-0 left-0 right-0 z-50 bg-white">
			<header className="container mx-auto px-5 flex py-4 items-center justify-between w-screen">
				<Link href="/">
					<Image
						className="w-16 scale-[2.2] lg:ml-3"
						src={images.logo}
						alt="logo"
					/>
				</Link>
				<div className="lg:hidden z-50">
					{isVisible ? (
						<AiOutlineClose className="w-6 h-6" onClick={navVisibility} />
					) : (
						<AiOutlineMenu className="w-6 h-6" onClick={navVisibility} />
					)}
				</div>
				<div
					className={`${
						isVisible ? "right-0" : "-right-full"
					} transition-all duration-300 mt-[56px] lg:mt-0 bg-dark-hard lg:bg-transparent z-[49] flex flex-col w-full lg:w-auto justify-center lg:justify-end lg:flex-row fixed top-3 bottom-0 lg:static gap-x-9 items-center`}
				>
					<ul className="text-white items-center gap-y-5 lg:text-dark-soft flex flex-col lg:flex-row gap-x-2 font-semibold">
						{navItemsInfo.map((item) => (
							<NavItem key={item.name} item={item} />
						))}
					</ul>
					<UserButton
						afterSignOutUrl="/sign-in"
						appearance={{
							elements: {
								rootBox: "mt-5 lg:mt-0",
							},
						}}
					/>

					{!isSignedIn && (
						<button
							onClick={() => router.push("/sign-in")}
							className="bg-primary px-10 py-2 text-white rounded-lg"
						>
							Sign in
						</button>
					)}
				</div>
			</header>
		</section>
	);
};

export default Header;
