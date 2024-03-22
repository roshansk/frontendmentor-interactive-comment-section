import React, { useState } from "react";
import ButtonWithIcon from "./ui/ButtonWithIcon";
import { timeAgo } from "model/util/time";
import CommentBox from "./CommentBox";

function Comment(props) {
  const { updateCommentPosition, updateComment, currentUser, comment } = props;
  const { replies = [] } = comment;
  const [editing, setEditing] = useState(false);

  let newCreatedAt = timeAgo(comment.createdAt);

  const [createdAt, setCreatedAt] = useState(newCreatedAt);

  //update createdAt
  setInterval(() => {
    setCreatedAt(timeAgo(comment.createdAt));
  }, 1000 * 30);

  const upVote = () => {
    comment.score++;
    updateCommentPosition(comment);
  };

  const downVote = () => {
    comment.score--;
    updateCommentPosition(comment);
  };

  const addReply = (reply) => {
    reply.replyingTo = comment.user.username;
    comment.replies.push(reply);
    updateComment(comment);
    handleEditing();
  };

  const handleEditing = () => {
    setEditing(!editing);
  };

  const CommentBlock = (
    <div className="comment my-3 ml-auto rounded-md shadow-md bg-white text-gray-600 p-4 grid grid-cols-2">
      <div className="profile-wrapper flex flex-row items-center gap-x-3 mb-4 col-span-2">
        <img className="w-[45px] h-[45px]" src={comment.user.image.png}></img>
        <p className="text-black font-bold">{comment.user.username}</p>
        <p>{createdAt}</p>
      </div>
      <p className="comment-text mx-1 col-span-2 mb-4">
        {comment.replyingTo ? (
          <span className="blue-accent-text font-bold mr-2">
            @{comment.replyingTo}
          </span>
        ) : null}
        {comment.content}
      </p>
      <div className="btn-score w-[90px] mx-2 rounded-md flex-auto flex flex-row items-center justify-around bg-gray-100 col-span-1">
        <button className="p-1" onClick={upVote}>
          <img className="" src="/images/icon-plus.svg" />
        </button>
        <span className="score w-[30px] inline-block blue-accent-text text-center font-bold">
          {comment.score}
        </span>
        <button className="p-1" onClick={downVote}>
          <img className="w-100" src="/images/icon-minus.svg" />
        </button>
      </div>
      <div className="actions flex-auto flex flex-row justify-end col-span-1 gap-x-1">
        <ButtonWithIcon
          label="Delete"
          icon="/images/icon-delete.svg"
          btnClass="text-red-500 font-bold"
          isVisible={currentUser.username === comment.user.username}
        />
        <ButtonWithIcon
          label="Edit"
          icon="/images/icon-edit.svg"
          btnClass="blue-accent-text font-bold"
          isVisible={currentUser.username === comment.user.username}
        />
        <ButtonWithIcon
          label="Reply"
          icon="/images/icon-reply.svg"
          btnClass="blue-accent-text font-bold"
          action={handleEditing}
          isVisible={currentUser.username !== comment.user.username}
        />
      </div>
    </div>
  );

  return (
    <>
      {editing ? (
        <div className="">
          <CommentBox
            currentUser={currentUser}
            addComment={addReply}
            isReply={true}
          />
        </div>
      ) : (
        CommentBlock
      )}
      {replies.length ? (
        <div className="reply-wrapper w-[95%] ml-auto">
          {replies.map((reply, index) => (
            <Comment
              key={reply.id}
              comment={reply}
              position={index}
              updateCommentPosition={updateCommentPosition}
              updateComment={updateComment}
              currentUser={currentUser}
            ></Comment>
          ))}
        </div>
      ) : null}
    </>
  );
}

export default Comment;
