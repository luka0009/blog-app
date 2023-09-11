"use client";
import { currentUser } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/api";
import axios from "axios";
import { comment } from "postcss";

export default function Home() {
	// console.log('Full USer: ', user);
	// console.log('FirsName: ', user?.firstName);
	// console.log('LastName: ', user?.lastName);
	// console.log('Image URL: ', user?.imageUrl);
	// console.log('ID: ', user?.id);
	// console.log('askldjaskldjsda');

	const postData = {
		title: "The Timeless Appeal of Stefan Zweig",
		caption: "Exploring the Legacy of a Literary Genius",
		tags: ["Literature", "Zweig"],
		text: "<div><h2>Stefan Zweig, a name that resonates with literary enthusiasts, remains a celebrated figure in the world of literature even decades after his passing. With his profound insights into the human psyche and masterful storytelling abilities, Zweig left an indelible mark on the literary landscape. Born in Austria in 1881, he crafted a body of work that traversed various genres, captivating readers with his poignant tales of love, longing, and the human condition. Today, we delve into the enduring appeal of Stefan Zweig and explore the legacy he has left behind.</h2><p><br class='ProseMirror-trailingBreak'></p><p>An Observer of the World Beyond his captivating storytelling abilities, Zweig was also an astute observer of the world around him. Living through tumultuous times, including two World Wars, he depicted the upheaval and despair of the era with remarkable sensitivity. Zweig's works often provide historical and sociopolitical commentary, giving readers a glimpse into the social fabric of the time. His memoir, 'The World of Yesterday,' serves as a poignant testament to the disintegration of the world he once knew, capturing the essence of a bygone era and the resilience of the human spirit.</p><p><br class='ProseMirror-trailingBreak'></p><p>A Bridge Between Cultures Stefan Zweig's works transcended borders and resonated with readers worldwide. His ability to depict the shared human experience, irrespective of cultural or geographical differences, is a testament to the universality of his writing. Translated into numerous languages, Zweig's stories continue to touch hearts and bridge gaps between cultures. His ability to connect with readers across generations and nations solidifies his status as a literary icon whose work transcends time and place.</p><p><br class='ProseMirror-trailingBreak'></p><p>Stefan Zweig's literary contributions continue to captivate and inspire readers even in the present day. With his profound understanding of the human condition, his works serve as a timeless reminder of the universality of our emotions and experiences. Zweig's ability to craft stories that resonate deeply with readers, coupled with his astute observations of the world around him, solidifies his place among the literary greats. As we delve into his works, we are reminded of the enduring power of literature to transport us, evoke empathy, and ignite our imagination. Stefan Zweig's legacy remains an invaluable gift to the world of literature, offering us a glimpse into the intricate depths of the human soul.</p></div>",
	};
	const createPost = async () => {
		try {
			const response = await axios.post(
				"http://localhost:3000/api/posts/",
				postData
			);

			console.log("POST request response:", response.data);
		} catch (error: any) {
			console.error("Error sending POST request:", error.message);
		}
	};

	const commentData = {
		postId: "64fec47c819edaf7b5c3f0c1",
		desc: "Test Comment",
		parentId: "",
		replyOnUser: false,
	};

	const createComment = async () => {
		try {
			const response = await axios.post(
				"http://localhost:3000/api/comments/",
				commentData
			);

			console.log("POST request response:", response.data);
		} catch (error: any) {
			console.error("Error sending POST request:", error.message);
		}
	};

	return <div>laskdjaskljd</div>;
}
