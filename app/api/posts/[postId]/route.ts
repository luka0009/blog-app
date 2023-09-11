import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import type { User } from "@clerk/nextjs/api";
import { currentUser } from "@clerk/nextjs";

export async function PATCH(
	req: Request,
	{ params }: { params: { postId: string } }
) {
	try {
		const user: User | null = await currentUser();

		const { title, caption, tags, text, categories, photo } = await req.json();

		if (!params.postId) {
			return new NextResponse("Post ID is required", { status: 400 });
		}

		const postByUser = await prisma.post.findFirst({
			where: {
				id: params.postId,
				userId: user?.id,
			},
		});

		if (!postByUser) {
			return new NextResponse("Unauthorized action for this post", {
				status: 400,
			});
		}

		const updatedPost = await prisma.post.update({
			where: {
				id: params.postId,
			},
			data: {
				title: title || postByUser.title,
				caption: caption || postByUser.caption,
				tags: tags || postByUser.tags,
				photo: photo || postByUser.photo,
				body: {
					type: "doc",
					content: [
						{
							type: "text",
							//@ts-ignore
							text: text || postByUser.text,
						},
					],
				},
				Categories: categories || postByUser.Categories,
			},
		});

		return NextResponse.json(updatedPost);
	} catch (error) {
		console.log("posts/route.ts/PATCH", error);
		return new NextResponse("Internal server error", { status: 500 });
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { postId: string } }
) {
	try {
		const user: User | null = await currentUser();

		if (!params.postId) {
			return new NextResponse("Post ID is required", { status: 400 });
		}

		const postByUser = await prisma.post.findFirst({
			where: {
				id: params.postId,
				userId: user?.id,
			},
		});

		if (!postByUser) {
			return new NextResponse("Unauthorized action for this Post", {
				status: 400,
			});
		}

		const deletedPost = await prisma.post.delete({
			where: {
				id: params.postId,
			},
		});

		return NextResponse.json(deletedPost);
	} catch (error) {
		console.log("posts/route.ts/DELETE", error);
		return new NextResponse("Internal server error", { status: 500 });
	}
}

export async function GET(
	req: Request,
	{ params }: { params: { postId: string } }
) {
	try {
		if (!params.postId) {
			return new NextResponse("Post ID is required", { status: 400 });
		}

		const post = await prisma.post.findFirst({
			where: {
				id: params.postId,
			},
		});

		return NextResponse.json(post);
	} catch (error) {
		console.log("posts/route.ts/GET", error);
		return new NextResponse("Internal server error", { status: 500 });
	}
}
