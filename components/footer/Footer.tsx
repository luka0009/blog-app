import {
	AiFillHeart,
	AiFillInstagram,
	AiFillYoutube,
	AiOutlineTwitter,
} from "react-icons/ai";
import { BsTelegram } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import images from "../../constants/images";
import Image from "next/image";

const Footer = () => {
	return (
		<>
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
			<section className="bg-dark-hard w-full lg:mb-[-900px]">
				<footer className="container mx-auto grid grid-cols-2 px-5 py-10 gap-y-10 gap-x-5 md:pt-20 md:grid-cols-12 lg:grid-cols-10 lg:gap-x-10">
					<div className="hidden md:flex flex-col items-center space-y-4 md:col-span-12 lg:col-span-10">
						<div className="bg-primary text-white p-3 rounded-full">
							<AiFillHeart className="w-7 h-auto" />
						</div>
						<p className="font-bold italic text-dark-light">
							Copyright © 2023. Crafted with love.
						</p>
					</div>
				</footer>
			</section>
		</>
	);
};

export default Footer;
