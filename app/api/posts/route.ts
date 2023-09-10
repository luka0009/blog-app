import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
	try {
		let userId = "12345";
		const { title, caption, tags, text } = await req.json();

		if (!userId) {
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
				userId,
			},
		});
		return NextResponse.json(post);
	} catch (error) {
		console.log("posts/route.ts/POST", error);
		return new NextResponse("Internal server error", { status: 500 });
	}
};

export async function GET(req: Request) {
	try {
        const posts = await prisma.post.findMany({});
		
		return NextResponse.json(posts);
	} catch (error) {
		console.log("posts/route.ts/GET", error);
		return new NextResponse("Internal server error", { status: 500 });
	}
}
