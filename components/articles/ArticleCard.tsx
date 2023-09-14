import { BsCheckLg } from "react-icons/bs";
import Link from "next/link";
import stables from "@/constants/stables";
import images from "@/constants/images";
import { Post } from "@prisma/client";
import Image from "next/image";

interface CardProps {
	className?: string;
	post: Post;
}

const ArticleCard = ({ className, post }: CardProps) => {
	return (
		<div
			className={`overflow-hidden shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] ${className} border-b-2 border-sky-600 max-w-[350px]`}
		>
			<Link href={`/blog/${post.slug}`}>
				<Image
					src={post.photo || images.blogpost}
					alt={"title"}
					className="w-full object-cover object-center h-auto
           md:h-52 lg:h-48 xl:h-60 rounded-md"
           width={100}
           height={100}
				/>
			</Link>
			<div className="p-5">
				<Link href={`/blog/${post.slug}`}>
					<h2 className="font-roboto font-bold text-xl text-dark-soft md:text-2xl lg:text-[28px]">
						{post.title}
					</h2>
					<p className="text-dark-light mt-3 text-sm md:text-lg">
						{post.caption}
					</p>
				</Link>
				<div className="flex justify-between flex-nowrap items-center mt-6">
					<div className="flex items-center gap-x-2 md:gap-x-2.5">
						<Image
							src={post.UserImageUrl}
							alt="post profile"
							className="w-9 h-9 md:w-10 md:h-10 rounded-full"
              width={10}
              height={10}
						/>
						<div className="flex flex-col">
							<h4 className="font-bold italic text-dark-soft text-sm md:text-base">
								{post.UserFirstName}
							</h4>
							<div className="flex items-center gap-x-2">
								<span
									className={`bg-[#36B37E]w-fit bg-opacity-20 p-1.5 rounded-full`}
								>
									<BsCheckLg className="w-1.5 h-1.5 text-[#36B37E]" />
								</span>
								<span className="italic text-dark-light text-xs md:text-sm">
									verified writer
								</span>
							</div>
						</div>
					</div>
					<span className="font-bold text-dark-light italic text-sm md:text-base">
						{new Date(post.createdAt).getDate()}{" "}
						{new Date(post.createdAt).toLocaleString("default", {
							month: "long",
						})}
					</span>
				</div>
			</div>
		</div>
	);
};

export default ArticleCard;
