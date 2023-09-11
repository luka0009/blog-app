import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import type { User } from "@clerk/nextjs/api";
import { currentUser } from "@clerk/nextjs";

export async function PATCH(
	req: Request,
	{ params }: { params: { commentId: string } }
) {
	try {
		const user: User | null = await currentUser();

		const body = await req.json();
		const { desc } = body;

		if (!params.commentId) {
			return new NextResponse("comment ID is required", { status: 400 });
		}

		const commentByUser = await prisma.comment.findFirst({
			where: {
				id: params.commentId,
				userId: user?.id,
			},
		});

		if (!commentByUser) {
			return new NextResponse("Unauthorized action for this comment", {
				status: 400,
			});
		}

		if (!desc) {
			return new NextResponse("Comment content is required", { status: 400 });
		}
		const updatedComment = await prisma.comment.update({
			where: {
				id: params.commentId,
			},
			data: {
				desc,
			},
		});

		return NextResponse.json(updatedComment);
	} catch (error) {
		console.log("comment/route.ts/PATCH", error);
		return new NextResponse("Internal server error", { status: 500 });
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { commentId: string } }
) {
	try {
		const user: User | null = await currentUser();

		if (!params.commentId) {
			return new NextResponse("comment ID is required", { status: 400 });
		}

		const commentByUser = await prisma.comment.findFirst({
			where: {
				id: params.commentId,
				userId: user?.id,
			},
		});

		if (!commentByUser) {
			return new NextResponse("Unauthorized action for this comment", {
				status: 400,
			});
		}

		const deletedComment = await prisma.comment.delete({
			where: {
				id: params.commentId,
			},
		});

		return NextResponse.json(deletedComment);
	} catch (error) {
		console.log("comment/route.ts/PATCH", error);
		return new NextResponse("Internal server error", { status: 500 });
	}
}
