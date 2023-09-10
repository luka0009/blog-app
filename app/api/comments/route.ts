import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		// const { userId } = auth();
		let userId = "12345";
		const body = await req.json();
		const { desc, postId, parentId, replyOnUser } = body;

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 403 });
		}

		if (!desc) {
			return new NextResponse("Comment content is required", { status: 400 });
		}

		const post = await prisma.post.findFirst({
			where: {
				id: postId,
			},
		});

		if (!post) {
			return new NextResponse("Post not found", { status: 400 });
		}

		const newComment = await prisma.comment.create({
			data: {
				desc: desc,
				userId,
				postId,
				replyOnUser,
				parentId,
			},
		});

		return NextResponse.json(newComment);
	} catch (error) {
		console.log("comment/route.ts/POST", error);
		return new NextResponse("Internal server error", { status: 500 });
	}
}