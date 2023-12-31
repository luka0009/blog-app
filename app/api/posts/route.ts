import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import type { User } from "@clerk/nextjs/api";
import { currentUser, } from "@clerk/nextjs";

export async function POST(req: Request) {
	try {
		const user: User | null = await currentUser();
        
		const { title, caption, tags, text } = await req.json();

		if (!user) {
			return new NextResponse("Unauthorized", { status: 403 });
		}

		if (!title) {
			return new NextResponse("title is required", { status: 400 });
		}

		if (!text) {
			return new NextResponse("post content is required", { status: 400 });
		}

		const post = await prisma.post.create({
			data: {
				title: title || "sample title",
				caption: caption || "sample caption",
				tags: tags,
				slug: uuidv4(),
				body: {
					type: "doc",
					content: [
						{
							type: "text",
							text: text,
						},
					],
				},
				photo: "",
				userId: user.id,
				UserFirstName: user.firstName!,
				UserLastName: user.lastName!,
				UserImageUrl: user.imageUrl!,
			},
		});
		return NextResponse.json(post);
	} catch (error) {
		console.log("posts/route.ts/POST", error);
		return new NextResponse("Internal server error", { status: 500 });
	}
}

export async function GET(req: Request) {
	try {
		const posts = await prisma.post.findMany({});

		return NextResponse.json(posts);
	} catch (error) {
		console.log("posts/route.ts/GET", error);
		return new NextResponse("Internal server error", { status: 500 });
	}
}
