import React, { useState } from "react";
import ButtonWithIcon from "./ui/ButtonWithIcon";
import { timeAgo } from "model/util/time";
import CommentBox from "./CommentBox";
import { ReactComponent as IconPlus } from "../assets/images/icon-plus.svg";
import { ReactComponent as IconMinus } from "../assets/images/icon-minus.svg";

function Comment(props) {
  const {
    updateCommentPosition,
    updateComment,
    currentUser,
    comment,
    handleDelete,
  } = props;
  const { replies = [] } = comment;
  const [editing, setEditing] = useState(false);
  const [replying, setReplying] = useState(false);

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
    setReplying(true);
    reply.replyingTo = comment.user.username;
    comment.replies = comment.replies || [];
    comment.replies.push(reply);
    updateComment(comment);
    setReplying(!replying);
  };

  const handleEditComment = (newCommentValue) => {
    if (editing === false) return; //if null then it's not editing
    comment.content = newCommentValue;
    updateComment(comment);
    setEditing(false);
  };

  const onEdit = () => {
    setEditing(!editing);
  };

  const onReply = () => {
    setReplying(!replying);
  };

  const onDelete = () => {
    handleDelete(comment);
  };

  const CommentBlock = (
    <div className="comment my-3 w-full ml-auto rounded-md ring ring-1 ring-gray-100 bg-white text-gray-500 p-4 grid grid-cols-2 md:grid-cols-8 md:justify-items-start md:content-center">
      <div className="profile-wrapper flex flex-row items-center gap-x-3 mb-4 col-span-2 md:order-2 md:col-span-5 md:row-span-1 md:mb-auto">
        <img
          className="max-w-[40px] max-h-[40px]"
          alt="user profile"
          src={comment.user.image.png}
        ></img>
        <p className="text-black font-bold">{comment.user.username}</p>
        <p>{createdAt}</p>
      </div>
      <p className="comment-text mx-1 col-span-2 mb-4 md:order-4 md:col-span-7 md:mt-2">
        {comment.replyingTo ? (
          <span className="blue-accent-text font-bold mr-2">
            @{comment.replyingTo}
          </span>
        ) : null}
        {comment.content}
      </p>
      <div className="btn-score w-[90px] mx-2 rounded-md flex-auto flex flex-row items-center justify-around bg-gray-100 col-span-1 md:flex-col md:order-1 md:mx-auto md:row-span-2 md:w-[45px] md:h-[100px] md:mb-auto">
        <button className="w-full h-full btn-upvote md:w-auto" onClick={upVote}>
          <IconPlus className="mx-auto" />
        </button>
        <span className="score w-[30px] inline-block blue-accent-text text-center font-bold">
          {comment.score}
        </span>
        <button
          className="w-full h-full btn-downvote md:w-auto"
          onClick={downVote}
        >
          <IconMinus className="mx-auto" />
        </button>
      </div>
      <div className="actions flex-auto flex flex-row justify-end col-span-1 gap-x-1 md:order-3 md:col-span-2 md:row-span-1 md:mb-auto md:ml-auto">
        <ButtonWithIcon
          label="Delete"
          icon="/images/icon-delete.svg"
          btnClass="btn-action text-red-500 font-bold hover:opacity-[0.65]"
          action={onDelete}
          isVisible={currentUser.username === comment.user.username}
        />
        <ButtonWithIcon
          label="Edit"
          icon="/images/icon-edit.svg"
          btnClass="btn-action blue-accent-text font-bold hover:opacity-[0.65]"
          action={onEdit}
          isVisible={currentUser.username === comment.user.username}
        />
        <ButtonWithIcon
          label="Reply"
          icon="/images/icon-reply.svg"
          btnClass="btn-action blue-accent-text font-bold hover:opacity-[0.65]"
          action={onReply}
          isVisible={currentUser.username !== comment.user.username}
        />
      </div>
    </div>
  );

  return (
    <>
      {!editing ? CommentBlock : null}

      {editing || replying ? (
        <CommentBox
          currentUser={currentUser}
          submitHandler={editing ? handleEditComment : addReply}
          currentComment={comment.content}
          isReply={replying ? true : false}
        />
      ) : null}

      {replies.length ? (
        <div className="pseduo-wrapper w-[92%] ml-auto">
          <div className="reply-wrapper">
            {replies.map((reply, index) => (
              <Comment
                key={reply.id}
                comment={reply}
                position={index}
                updateCommentPosition={updateCommentPosition}
                updateComment={updateComment}
                currentUser={currentUser}
                handleDelete={handleDelete}
              ></Comment>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Comment;
