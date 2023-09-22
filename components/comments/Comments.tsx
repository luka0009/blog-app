"use client";
import CommentForm from "./CommentForm";
import { useEffect, useState } from "react";
import { Comment } from "@prisma/client";
import axios from "axios";
import CommentComponent from "./CommentComponents";

type Props = {
	className: string;
	postId: any;
};

const Comments = ({ className, postId }: Props) => {
	const [comments, setComments] = useState([] as Comment[]);

	const getComment = async () => {
		try {
			const response = await axios.get(`http://localhost:3000/api/comments`);

			console.log("GET request response:", response.data);
			setComments(response.data);
		} catch (error: any) {
			console.error("Error sending GET request:", error.message);
		}
	};
	useEffect(() => {
		getComment();
	}, []);

	const createComment = async (
		desc: string,
		postId: any,
		parentId = null,
		replyOnUser = false
	) => {
		try {
			const response = await axios.post("http://localhost:3000/api/comments/", {
				desc,
				postId,
				parentId,
				replyOnUser,
			});

			console.log("POST request response:", response.data);
		} catch (error: any) {
			console.error("Error sending POST request:", error.message);
		}
	};

	return (
		<div className={`${className}`}>
			<CommentForm
				btnLabel="Post"
				initialText=""
				formSubmitHanlder={createComment}
				formCancelHandler={() => {}}
				postId={postId}
			/>
			<div className="space-y-4 mt-8">
				{comments?.map((comment) => {
					return (
						//@ts-ignore
						<CommentComponent
							key={comment.id}
							comment={comment}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default Comments;
