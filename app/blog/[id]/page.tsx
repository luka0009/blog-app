import Link from "next/link";
import Image from "next/image";
import BreadCrumbs from "@/components/articles/BreadCrumbs";
import images from "@/constants/images";
import SuggestedPosts from "@/components/articles/SuggestedPosts";

const ArticleDetail = () => {
	const breadCrumbsData = [
		{ name: "Home", link: "/" },
		{ name: "Blog", link: "/blog" },
		{ name: "Article title", link: `/blog/1` },
	];

	const postsData = [
		{
			_id: "1",
			image: images.blogpost,
			title: "Lorem ipsum dolor sit amet.",
			createdAt: "2023-01-28T15:35:53.607+0000",
		},
		{
			_id: "2",
			image: images.blogpost,
			title: "Lorem ipsum dolor sit amet.",
			createdAt: "2023-01-28T15:35:53.607+0000",
		},
		{
			_id: "3",
			image: images.blogpost,
			title: "Lorem ipsum dolor sit amet.",
			createdAt: "2023-01-28T15:35:53.607+0000",
		},
		{
			_id: "4",
			image: images.blogpost,
			title: "Lorem ipsum dolor sit amet.",
			createdAt: "2023-01-28T15:35:53.607+0000",
		},
	];

	const tagsData = [
		"Medical",
		"Lifestyle",
		"Learn",
		"Healthy",
		"Food",
		"Diet",
		"Education",
	];

	return (
		<section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
			<article className="flex-1">
				<BreadCrumbs data={breadCrumbsData} />
				<Image
					height={200}
					width={200}
					src={images.blogpost}
					alt="dog image"
					className="rounded-xl w-full"
				/>
				<Link
					href="/blog?category=selectedCategory"
					className="text-primary text-sm font-roboto inline-block mt-4 md:text-base"
				>
					category Name
				</Link>
				<h1 className="text-xl font-medium font-roboto mt-4 text-dark-hard md:text-[26px]">
					Lorem ipsum dolor sit amet consectetur adipisicing.
				</h1>
				<div className="mt-4 text-dark-soft">
					<p className="leading-4">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
						in, inventore rem fuga cumque est magnam eveniet vitae veniam illum
						molestiae reiciendis, doloribus iure quisquam!
					</p>
				</div>
			</article>
			<SuggestedPosts
				className="mt-8 lg:mt-0 lg:max-w-xs"
				header="Latest articles"
				tags={tagsData}
				posts={postsData}
			/>
		</section>
	);
};

export default ArticleDetail;
