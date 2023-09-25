import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import type { User } from "@clerk/nextjs/api";
import { currentUser } from "@clerk/nextjs";

export async function POST(req: Request) {
	try {
		const user: User | null = await currentUser();

		const body = await req.json();
		const { desc, commentId } = body;

		if (!user) {
			return new NextResponse("Unauthorized", { status: 403 });
		}

		if (!desc) {
			return new NextResponse("Reply content is required", { status: 400 });
		}

		const comment = await prisma.comment.findFirst({
			where: {
				id: commentId,
			},
		});

		if (!comment) {
			return new NextResponse("Comment not found", { status: 400 });
		}

		const newReply = await prisma.reply.create({
			data: {
				desc: desc,
				commentId,
				userId: user.id,
				UserFirstName: user.firstName!,
				UserLastName: user.lastName!,
				UserImageUrl: user.imageUrl!,
			},
		});

		return NextResponse.json(newReply);
	} catch (error) {
		console.log("replies/route.ts/POST", error);
		return new NextResponse("Internal server error", { status: 500 });
	}
}

export async function GET(req: Request) {
	try {
		const replies = await prisma.reply.findMany({});

		return NextResponse.json(replies);
	} catch (error) {
		console.log("replies/route.ts/GET", error);
		return new NextResponse("Internal server error", { status: 500 });
	}
}
