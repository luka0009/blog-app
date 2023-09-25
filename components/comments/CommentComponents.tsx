"use client";
import { FiMessageSquare, FiEdit2, FiTrash } from "react-icons/fi";
import { Comment, Reply } from "@prisma/client";
import Image from "next/image";
import images from "@/constants/images";
import { useAuth } from "@clerk/nextjs";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import axios from "axios";

type Props = {
	comment: Comment | Reply;
	affectedComment?: { type: string; id: string } | null;
	setAffectedComment?: Dispatch<
		SetStateAction<{
			type: string;
			id: string;
		} | null>
	>;
	parentId?: string;
	addComment: any;
	replies?: Reply[]
};

const CommentComponent = ({
	comment,
	affectedComment,
	setAffectedComment,
	parentId,
	addComment,
	replies
}: Props) => {
	const { userId } = useAuth();
	const isUserLoggedIn = Boolean(userId);
	const commentBelongsToUser = userId === comment.userId;

	const isReplying =
		affectedComment &&
		affectedComment.type === "replying" &&
		affectedComment.id === comment.id;

	const isEditing =
		affectedComment &&
		affectedComment.type === "editing" &&
		affectedComment.id === comment.id;

	const repliedCommentId = parentId ? parentId : comment.id;
	const replyOnUserId = comment.userId;

	const createReply = async (desc: string, commentId: any) => {
		try {
			const response = await axios.post("http://localhost:3000/api/replies/", {
				desc,
				commentId,
			});

			console.log("POST request response:", response.data);
		} catch (error: any) {
			console.error("Error sending POST request:", error.message);
		}
	};

	return (
		<div className='"flex flex-nowrap items-start gap-x-3 bg-[#F2F4F5] p-3 rounded-lg'>
			<Image
				width={30}
				height={30}
				src={comment.UserImageUrl || images.defaultProfilePic}
				alt="profile"
				className="w-9 h-9 md:w-10 md:h-10 object-cover rounded-full"
			/>
			<div className="flex-1 flex flex-col">
				<h5 className="font-bold text-dark-hard text-xs lg:text-sm">
					{comment.UserFirstName} {comment.UserLastName}
				</h5>
				<span className="text-xs text-dark-light">
					{new Date(comment.createdAt).toLocaleDateString("en-US", {
						day: "numeric",
						month: "short",
						year: "numeric",
						hour: "2-digit",
					})}
				</span>
				{!isEditing && (
					<p className="font-opensans mt-[10px] text-dark-light">
						{comment.desc}
					</p>
				)}
				{isEditing && (
					<CommentForm
						btnLabel="Update"
						initialText={comment.desc}
						formCancelHandler={() => setAffectedComment?.(null)}
						formSubmitHanlder={() => {}}
						//@ts-ignore
						postId={comment.postId}
					/>
				)}
				<div className="flex items-center gap-x-3 text-dark-light font-roboto text-sm mt-3 mb-3">
					{isUserLoggedIn && (
						<button
							onClick={() =>
								setAffectedComment &&
								setAffectedComment({ type: "replying", id: comment.id })
							}
							className="flex items-center space-x-2"
						>
							<FiMessageSquare className="w-4 h-auto" />
							<span>Reply</span>
						</button>
					)}
					{commentBelongsToUser && (
						<>
							<button
								onClick={() =>
									setAffectedComment &&
									setAffectedComment({ type: "editing", id: comment.id })
								}
								className="flex items-center space-x-2"
							>
								<FiEdit2 className="w-4 h-auto" />
								<span>Edit</span>
							</button>
							<button className="flex items-center space-x-2">
								<FiTrash className="w-4 h-auto" />
								<span>Delete</span>
							</button>
						</>
					)}
				</div>
				{isReplying && (
					<CommentForm
						btnLabel="Reply"
						initialText=""
						formCancelHandler={() =>
							setAffectedComment && setAffectedComment(null)
						}
						formSubmitHanlder={(value) => createReply(value, repliedCommentId)}
						//@ts-ignore
						postId={comment.postId}
					/>
				)}
				{replies && replies.length > 0 && (
					<div>
						{replies.filter(reply => reply.commentId === comment.id).map((reply: Reply) => {
							return (
								<CommentComponent
									key={reply.id}
									comment={reply}
									affectedComment={affectedComment}
									setAffectedComment={setAffectedComment}
									addComment={addComment}
									parentId={comment.id}
								/>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
};

export default CommentComponent;
