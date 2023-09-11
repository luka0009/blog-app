import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import type { User } from "@clerk/nextjs/api";
import { currentUser } from "@clerk/nextjs";

export async function POST(req: Request) {
	try {
		const user: User | null = await currentUser();

		const body = await req.json();
		const { desc, postId, parentId, replyOnUser } = body;

		if (!user) {
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
				userId: user.id,
				UserFirstName: user.firstName!,
				UserLastName: user.lastName!,
				UserImageUrl: user.imageUrl!,
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
