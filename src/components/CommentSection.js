import React, { useState } from "react";
import Comment from "./Comment";

function CommentSection(props) {
  const [comments, setComments] = useState(props.comments);
  const { updateCommentPosition, updateComment } = props.handleCommentChanges;

  return (
    <div
      id="comment-section-wrapper"
      className=" h-max-[560px] flex flex-col-reverse overflow-scroll"
    >
      {comments.map((comment, index) => (
        <Comment
          key={comment.id}
          comment={comment}
          position={index}
          updateCommentPosition={updateCommentPosition}
        />
      ))}
    </div>
  );
}

export default CommentSection;
